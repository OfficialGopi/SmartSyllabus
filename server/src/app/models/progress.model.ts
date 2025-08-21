import mongoose from "mongoose";
import { IProgress } from "../types/schemas.type";

const progressSchema = new mongoose.Schema<IProgress>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    roadmap: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "roadmaps",
      required: true,
    },
    day: { type: Number, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const ProgressModel = mongoose.model<IProgress>(
  "progress",
  progressSchema,
);
