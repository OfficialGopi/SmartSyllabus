import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  _id: string;
  email: string;
  name: string;
  picture?: string;
  credits: number;
}

export interface Chat {
  _id: string;
  title: string;
  syllabusType: "text" | "pdf";
  syllabusText?: string;
  syllabusPdfLink?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Roadmap {
  _id: string;
  chatId: string;
  query: string;
  content: string;
  createdAt: string;
}

export interface Progress {
  _id: string;
  roadmapId: string;
  day: number;
  completed: boolean;
  completedAt?: string;
}

export interface Transaction {
  _id: string;
  amount: number;
  creditsAdded: number;
  paymentProvider: string;
  createdAt: string;
}

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Data state
  chats: Chat[];
  roadmaps: Roadmap[];
  progress: Progress[];
  transactions: Transaction[];

  // UI state
  currentChat: Chat | null;
  currentRoadmap: Roadmap | null;

  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (status: boolean) => void;
  setLoading: (loading: boolean) => void;

  setChats: (chats: Chat[]) => void;
  addChat: (chat: Chat) => void;
  updateChat: (chatId: string, updates: Partial<Chat>) => void;
  removeChat: (chatId: string) => void;

  setRoadmaps: (roadmaps: Roadmap[]) => void;
  addRoadmap: (roadmap: Roadmap) => void;
  updateRoadmap: (roadmapId: string, updates: Partial<Roadmap>) => void;

  setProgress: (progress: Progress[]) => void;
  addProgress: (progress: Progress) => void;
  updateProgress: (progressId: string, updates: Partial<Progress>) => void;

  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;

  setCurrentChat: (chat: Chat | null) => void;
  setCurrentRoadmap: (roadmap: Roadmap | null) => void;

  updateUserCredits: (newCredits: number) => void;

  // Reset state
  reset: () => void;
}

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  chats: [],
  roadmaps: [],
  progress: [],
  transactions: [],
  currentChat: null,
  currentRoadmap: null,
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setAuthenticated: (status) => set({ isAuthenticated: status }),
      setLoading: (loading) => set({ isLoading: loading }),

      setChats: (chats) => set({ chats }),
      addChat: (chat) => set((state) => ({ chats: [chat, ...state.chats] })),
      updateChat: (chatId, updates) =>
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat._id === chatId ? { ...chat, ...updates } : chat,
          ),
        })),
      removeChat: (chatId) =>
        set((state) => ({
          chats: state.chats.filter((chat) => chat._id !== chatId),
        })),

      setRoadmaps: (roadmaps) => set({ roadmaps }),
      addRoadmap: (roadmap) =>
        set((state) => ({ roadmaps: [roadmap, ...state.roadmaps] })),
      updateRoadmap: (roadmapId, updates) =>
        set((state) => ({
          roadmaps: state.roadmaps.map((roadmap) =>
            roadmap._id === roadmapId ? { ...roadmap, ...updates } : roadmap,
          ),
        })),

      setProgress: (progress) => set({ progress }),
      addProgress: (progress) =>
        set((state) => ({ progress: [...state.progress, progress] })),
      updateProgress: (progressId, updates) =>
        set((state) => ({
          progress: state.progress.map((p) =>
            p._id === progressId ? { ...p, ...updates } : p,
          ),
        })),

      setTransactions: (transactions) => set({ transactions }),
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        })),

      setCurrentChat: (chat) => set({ currentChat: chat }),
      setCurrentRoadmap: (roadmap) => set({ currentRoadmap: roadmap }),

      updateUserCredits: (newCredits) =>
        set((state) => ({
          user: state.user ? { ...state.user, credits: newCredits } : null,
        })),

      reset: () => set(initialState),
    }),
    {
      name: "smartsyllabus-store",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        chats: state.chats,
        roadmaps: state.roadmaps,
        progress: state.progress,
        transactions: state.transactions,
      }),
    },
  ),
);
