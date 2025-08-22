import { useEffect, useState } from "react";
import {
  useStore,
  type Chat,
  type Roadmap,
  type Progress,
} from "@/store/useStore";
import { chatAPI, roadmapAPI, progressAPI, authAPI } from "@/services/api";
import {
  Plus,
  BookOpen,
  Map,
  TrendingUp,
  CreditCard,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";

const Dashboard = () => {
  const {
    user,
    chats,
    roadmaps,
    progress,
    currentChat,
    currentRoadmap,
    setChats,
    setRoadmaps,
    setProgress,
    setCurrentChat,
    setCurrentRoadmap,
    updateUserCredits,
    reset,
  } = useStore();

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "chats" | "roadmaps" | "progress" | "profile"
  >("chats");
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [showNewRoadmapModal, setShowNewRoadmapModal] = useState(false);

  // New chat form state
  const [newChatData, setNewChatData] = useState({
    title: "",
    syllabusType: "text" as "text" | "pdf",
    syllabusText: "",
    syllabusPdfLink: "",
  });

  // New roadmap form state
  const [newRoadmapData, setNewRoadmapData] = useState({
    query: "",
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      const [chatsRes, roadmapsRes, progressRes] = await Promise.all([
        chatAPI.getAll(),
        roadmapAPI.getAll(),
        progressAPI.getAll(),
      ]);

      setChats(chatsRes.data.data || []);
      setRoadmaps(roadmapsRes.data.data || []);
      setProgress(progressRes.data.data || []);
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateChat = async () => {
    try {
      setIsLoading(true);
      const response = await chatAPI.create(newChatData);
      const newChat: Chat = response.data.data;
      setChats([newChat, ...chats]);
      setCurrentChat(newChat);
      setShowNewChatModal(false);
      setNewChatData({
        title: "",
        syllabusType: "text",
        syllabusText: "",
        syllabusPdfLink: "",
      });
      // Show success message
      alert("Chat created successfully!");
    } catch (error) {
      console.error("Error creating chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateRoadmap = async () => {
    if (!currentChat) {
      alert("Please select a chat first");
      return;
    }

    try {
      setIsLoading(true);
      const response = await roadmapAPI.generate(
        currentChat._id,
        newRoadmapData,
      );
      const newRoadmap: Roadmap = response.data.data;
      setRoadmaps([newRoadmap, ...roadmaps]);
      setCurrentRoadmap(newRoadmap);
      setShowNewRoadmapModal(false);
      setNewRoadmapData({ query: "" });

      // Update user credits
      if (user) {
        updateUserCredits(user.credits - 1);
      }

      // Show success message
      alert("Roadmap generated successfully!");
    } catch (error) {
      console.error("Error generating roadmap:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      reset();
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleMarkProgress = async (roadmapId: string, day: number) => {
    try {
      const response = await progressAPI.markComplete(roadmapId, day);
      const newProgress: Progress = response.data.data;
      setProgress([...progress, newProgress]);
      alert(`Day ${day} marked as complete!`);
    } catch (error) {
      console.error("Error marking progress:", error);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  SmartSyllabus
                </h1>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CreditCard className="h-4 w-4" />
                  <span>{user?.credits || 0} credits</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-900">{user?.name}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              {[
                { id: "chats", label: "Chats", icon: BookOpen },
                { id: "roadmaps", label: "Roadmaps", icon: Map },
                { id: "progress", label: "Progress", icon: TrendingUp },
                { id: "profile", label: "Profile", icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Chats Tab */}
          {activeTab === "chats" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Study Chats
                </h2>
                <Button onClick={() => setShowNewChatModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Chat
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {chats.map((chat: Chat) => (
                  <div
                    key={chat._id}
                    onClick={() => setCurrentChat(chat)}
                    className={`bg-white p-6 rounded-lg shadow-sm border-2 cursor-pointer transition-all hover:shadow-md ${
                      currentChat?._id === chat._id
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {chat.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Type: {chat.syllabusType === "text" ? "Text" : "PDF"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Created: {new Date(chat.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Roadmaps Tab */}
          {activeTab === "roadmaps" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Study Roadmaps
                </h2>
                <Button
                  onClick={() => setShowNewRoadmapModal(true)}
                  disabled={!currentChat}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Generate Roadmap
                </Button>
              </div>

              {!currentChat && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800">
                    Please select a chat first to generate a roadmap.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roadmaps.map((roadmap: Roadmap) => (
                  <div
                    key={roadmap._id}
                    onClick={() => setCurrentRoadmap(roadmap)}
                    className={`bg-white p-6 rounded-lg shadow-sm border-2 cursor-pointer transition-all hover:shadow-md ${
                      currentRoadmap?._id === roadmap._id
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Query: {roadmap.query.substring(0, 50)}...
                    </h3>
                    <p className="text-xs text-gray-500">
                      Created:{" "}
                      {new Date(roadmap.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === "progress" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Study Progress
              </h2>

              {currentRoadmap ? (
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Progress for: {currentRoadmap.query.substring(0, 50)}...
                  </h3>

                  <div className="space-y-4">
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                      const dayProgress = progress.find(
                        (p: Progress) =>
                          p.roadmapId === currentRoadmap._id && p.day === day,
                      );

                      return (
                        <div key={day} className="flex items-center space-x-4">
                          <span className="text-sm font-medium text-gray-700 w-12">
                            Day {day}
                          </span>
                          <Button
                            size="sm"
                            variant={
                              dayProgress?.completed ? "primary" : "outline"
                            }
                            onClick={() =>
                              handleMarkProgress(currentRoadmap._id, day)
                            }
                            disabled={dayProgress?.completed}
                          >
                            {dayProgress?.completed
                              ? "Completed"
                              : "Mark Complete"}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                  <p className="text-gray-600">
                    Select a roadmap to view and track your progress.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Profile & Settings
              </h2>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <p className="mt-1 text-sm text-gray-900">{user?.name}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Credits
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {user?.credits || 0}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Member Since
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {user ? new Date().toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* New Chat Modal */}
        {showNewChatModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Create New Chat</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newChatData.title}
                    onChange={(e) =>
                      setNewChatData({ ...newChatData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter chat title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Syllabus Type
                  </label>
                  <select
                    value={newChatData.syllabusType}
                    onChange={(e) =>
                      setNewChatData({
                        ...newChatData,
                        syllabusType: e.target.value as "text" | "pdf",
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="text">Text</option>
                    <option value="pdf">PDF</option>
                  </select>
                </div>

                {newChatData.syllabusType === "text" ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Syllabus Text
                    </label>
                    <textarea
                      value={newChatData.syllabusText}
                      onChange={(e) =>
                        setNewChatData({
                          ...newChatData,
                          syllabusText: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      placeholder="Enter syllabus text"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PDF Link
                    </label>
                    <input
                      type="url"
                      value={newChatData.syllabusPdfLink}
                      onChange={(e) =>
                        setNewChatData({
                          ...newChatData,
                          syllabusPdfLink: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter PDF URL"
                    />
                  </div>
                )}
              </div>

              <div className="flex space-x-3 mt-6">
                <Button
                  onClick={handleCreateChat}
                  disabled={!newChatData.title || isLoading}
                  className="flex-1"
                >
                  {isLoading ? "Creating..." : "Create Chat"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowNewChatModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* New Roadmap Modal */}
        {showNewRoadmapModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Generate Roadmap</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Query
                  </label>
                  <textarea
                    value={newRoadmapData.query}
                    onChange={(e) =>
                      setNewRoadmapData({
                        ...newRoadmapData,
                        query: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Describe what you want to study or achieve"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    This will cost 1 credit. You currently have{" "}
                    {user?.credits || 0} credits.
                  </p>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <Button
                  onClick={handleGenerateRoadmap}
                  disabled={
                    !newRoadmapData.query ||
                    isLoading ||
                    (user?.credits || 0) < 1
                  }
                  className="flex-1"
                >
                  {isLoading ? "Generating..." : "Generate Roadmap"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowNewRoadmapModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Dashboard;
