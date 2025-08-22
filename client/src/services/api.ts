import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import toast from "react-hot-toast";

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:3000/api/v1",
  withCredentials: true,
  timeout: 30000,
});

// Request interceptor to add auth headers
api.interceptors.request.use(
  (config) => {
    // Add any auth headers if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          toast.error("Please login to continue");
          // Redirect to login or clear auth state
          break;
        case 403:
          toast.error("Access denied");
          break;
        case 404:
          toast.error("Resource not found");
          break;
        case 429:
          toast.error("Too many requests. Please try again later.");
          break;
        case 500:
          toast.error("Server error. Please try again later.");
          break;
        default:
          toast.error(data?.message || "Something went wrong");
      }
    } else if (error.request) {
      toast.error("Network error. Please check your connection.");
    } else {
      toast.error("Something went wrong");
    }

    return Promise.reject(error);
  },
);

// API endpoints
export const authAPI = {
  googleLogin: () =>
    (window.location.href = `${import.meta.env.VITE_SERVER_URL || "http://localhost:3000"}/api/v1/user/google`),
  logout: () => api.delete("/user/logout"),
  getMe: () => api.get("/user/me"),
};

export const chatAPI = {
  create: (data: {
    title: string;
    syllabusType: "text" | "pdf";
    syllabusText?: string;
    syllabusPdfLink?: string;
  }) => api.post("/chat", data),
  getAll: () => api.get("/chat"),
  addMessage: (
    chatId: string,
    data: { role: "user" | "assistant"; content: string },
  ) => api.post(`/chat/${chatId}/messages`, data),
};

export const syllabusAPI = {
  upload: (chatId: string, data: { chunks: string[] }) =>
    api.post(`/syllabus/${chatId}`, data),
  getByChat: (chatId: string) => api.get(`/syllabus/${chatId}`),
};

export const roadmapAPI = {
  generate: (chatId: string, data: { query: string }) =>
    api.post(`/roadmap/${chatId}`, data),
  getById: (roadmapId: string) => api.get(`/roadmap/${roadmapId}`),
  getAll: () => api.get("/roadmap"),
};

export const progressAPI = {
  markComplete: (roadmapId: string, day: number) =>
    api.post(`/progress/${roadmapId}/${day}`),
  getByRoadmap: (roadmapId: string) => api.get(`/progress/${roadmapId}`),
  getAll: () => api.get("/progress"),
};

export const transactionAPI = {
  create: (data: {
    amount: number;
    creditsAdded: number;
    paymentProvider: string;
  }) => api.post("/transaction", data),
  getAll: () => api.get("/transaction"),
};

export default api;
