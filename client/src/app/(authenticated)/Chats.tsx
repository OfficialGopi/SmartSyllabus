import { useEffect, useState } from "react";
import { chatAPI, syllabusAPI } from "@/services/api";
import { useStore, type Chat } from "@/store/useStore";

const Chats = () => {
  const { chats, setChats, setCurrentChat, currentChat } = useStore();
  const [title, setTitle] = useState("");
  const [syllabusText, setSyllabusText] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await chatAPI.getAll();
      setChats(res.data.data || []);
    })();
  }, [setChats]);

  const createChat = async () => {
    try {
      setCreating(true);
      const payload: any = {
        title,
        syllabusType: pdfFile ? "pdf" : "text",
      };
      if (!pdfFile) payload.syllabusText = syllabusText;
      const res = await chatAPI.create(payload);
      const newChat: Chat = res.data.data;
      setChats([newChat, ...chats]);
      setCurrentChat(newChat);
      if (pdfFile) {
        const form = new FormData();
        form.append("pdf", pdfFile);
        await fetch(
          `${import.meta.env.VITE_SERVER_URL || "http://localhost:3000"}/api/v1/syllabus/${newChat._id}/pdf`,
          {
            method: "POST",
            credentials: "include",
            body: form,
          },
        );
      } else if (syllabusText.trim()) {
        await syllabusAPI.upload(newChat._id, { chunks: [syllabusText] });
      }
      setTitle("");
      setSyllabusText("");
      setPdfFile(null);
      alert("Chat created");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1 space-y-3">
        <h2 className="text-lg font-semibold">Your Chats</h2>
        <div className="border rounded-md divide-y">
          {chats.map((c) => (
            <button
              key={c._id}
              onClick={() => setCurrentChat(c)}
              className={`w-full text-left p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 ${
                currentChat?._id === c._id
                  ? "bg-neutral-100 dark:bg-neutral-800"
                  : ""
              }`}
            >
              <div className="font-medium">{c.title}</div>
              <div className="text-xs text-neutral-500">
                {c.syllabusType.toUpperCase()}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="md:col-span-2 space-y-4">
        <h2 className="text-lg font-semibold">Create Chat</h2>
        <div className="grid gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="border rounded-md px-3 py-2 bg-transparent"
          />
          <div className="grid gap-2">
            <label className="text-sm">Syllabus Text</label>
            <textarea
              value={syllabusText}
              onChange={(e) => setSyllabusText(e.target.value)}
              placeholder="Paste syllabus text (optional if uploading PDF)"
              className="border rounded-md px-3 py-2 h-28 bg-transparent"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm">Or Upload PDF</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
            />
          </div>
          <button
            onClick={createChat}
            disabled={!title || creating}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white disabled:opacity-50"
          >
            {creating ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chats;
