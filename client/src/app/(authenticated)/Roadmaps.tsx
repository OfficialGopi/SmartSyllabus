import { useEffect, useState } from "react";
import { roadmapAPI } from "@/services/api";
import { useStore, type Roadmap } from "@/store/useStore";

const Roadmaps = () => {
  const { roadmaps, setRoadmaps, currentRoadmap, setCurrentRoadmap } =
    useStore();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await roadmapAPI.getAll();
        setRoadmaps(res.data.data || []);
      } finally {
        setLoading(false);
      }
    })();
  }, [setRoadmaps]);

  const openRoadmap = async (r: Roadmap) => {
    setCurrentRoadmap(r);
    try {
      const res = await roadmapAPI.getById(r._id);
      const data = res.data.data;
      setContent(data.roadmapText || data.content || "");
    } catch {
      setContent("");
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Roadmaps</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="border rounded-md divide-y">
            {roadmaps.map((r) => (
              <button
                key={r._id}
                onClick={() => openRoadmap(r)}
                className={`w-full text-left p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 ${
                  currentRoadmap?._id === r._id
                    ? "bg-neutral-100 dark:bg-neutral-800"
                    : ""
                }`}
              >
                <div className="font-medium">
                  {r.query?.slice(0, 60) || "Roadmap"}
                </div>
                <div className="text-xs text-neutral-500">
                  {new Date(r.createdAt).toLocaleString()}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="md:col-span-2 space-y-4">
        <h3 className="text-lg font-semibold">Details</h3>
        {currentRoadmap ? (
          <div className="prose prose-invert max-w-none border rounded-md p-4 overflow-auto">
            {content ? (
              <pre className="whitespace-pre-wrap text-sm">{content}</pre>
            ) : (
              <div className="text-sm text-neutral-500">
                Select a roadmap to view content.
              </div>
            )}
          </div>
        ) : (
          <div className="text-sm text-neutral-500">No roadmap selected.</div>
        )}
      </div>
    </div>
  );
};

export default Roadmaps;
