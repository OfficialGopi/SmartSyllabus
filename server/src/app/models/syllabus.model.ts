import mongoose from "mongoose";
import { ISyllabusChunk } from "../types/schemas.type";

const syllabusChunksSchema = new mongoose.Schema<ISyllabusChunk>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "conversations",
    },
    chunk: {
      type: String,
      required: true,
    },
    embedding: {
      type: [Number],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const SyllabusChunksModel = mongoose.model<ISyllabusChunk>(
  "syllabuschunks",
  syllabusChunksSchema,
);
