import mongoose from "mongoose";
import { AsyncHandler } from "../utils/async-handler.util";
import { ApiResponse, ApiError } from "../utils/response-handler.util";
import { SyllabusChunksModel } from "../models/syllabus.model";
import { createEmbedding } from "../services/ai.service";
import { IUser } from "../types/schemas.type";

export const uploadSyllabus = AsyncHandler(async (req, res) => {
  const user = req.user! as IUser;
  const { chatId } = req.params as { chatId: string };
  const { chunks } = req.body as { chunks: string[] };
  if (!Array.isArray(chunks) || chunks.length === 0)
    throw new ApiError(400, "No chunks provided");

  const created: any[] = [];
  for (const chunk of chunks) {
    const embedding = await createEmbedding(chunk);
    const doc = await SyllabusChunksModel.create({
      userId: user._id,
      conversation: new mongoose.Types.ObjectId(chatId),
      chunk,
      embedding,
    });
    created.push(doc);
  }
  return res.status(201).json(new ApiResponse(201, created, "Uploaded"));
});

export const getSyllabusForChat = AsyncHandler(async (req, res) => {
  const user = req.user! as IUser;
  const { chatId } = req.params as { chatId: string };
  const docs = await SyllabusChunksModel.find({
    userId: user._id,
    conversation: new mongoose.Types.ObjectId(chatId),
  })
    .sort({ createdAt: 1 })
    .lean();
  return res.status(200).json(new ApiResponse(200, docs, "Success"));
});
