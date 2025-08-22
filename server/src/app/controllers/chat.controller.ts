import { AsyncHandler } from "../utils/async-handler.util";
import { ApiResponse, ApiError } from "../utils/response-handler.util";
import { ConversationModel } from "../models/conversation.model";
import { IUser } from "../types/schemas.type";

export const createChat = AsyncHandler(async (req, res) => {
  const user = req.user! as IUser;
  const { title, syllabusType, syllabusText, syllabusPdfLink } = req.body as {
    title: string;
    syllabusType: "TEXT" | "PDF";
    syllabusText?: string;
    syllabusPdfLink?: string;
  };

  if (!title || !syllabusType) throw new ApiError(400, "Missing fields");

  const chat = await ConversationModel.create({
    userId: user._id,
    title,
    syllabusType,
    syllabusText,
    syllabusPdfLink,
    messages: [],
  });
  return res.status(201).json(new ApiResponse(201, chat, "Created"));
});

export const getChats = AsyncHandler(async (req, res) => {
  const user = req.user! as IUser;
  const chats = await ConversationModel.find({ userId: user._id })
    .sort({ createdAt: -1 })
    .lean();
  return res.status(200).json(new ApiResponse(200, chats, "Success"));
});

export const addMessage = AsyncHandler(async (req, res) => {
  const user = req.user! as IUser;
  const { chatId } = req.params as { chatId: string };
  const { role, content } = req.body as { role: string; content: string };
  const chat = await ConversationModel.findOne({
    _id: chatId,
    userId: user._id,
  });
  if (!chat) throw new ApiError(404, "Chat not found");

  chat.messages = chat.messages || [];
  chat.messages.push({ role, content, timestamp: new Date() } as any);
  await chat.save();
  return res.status(200).json(new ApiResponse(200, chat, "Updated"));
});
