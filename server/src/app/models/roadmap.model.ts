import mongoose from "mongoose";
import { IRoadmap } from "../types/schemas.type";

const roadmapSchema = new mongoose.Schema<IRoadmap>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "conversations",
      required: true,
    },
    query: { type: String, required: true },
    syllabusUsed: [
      { type: mongoose.Schema.Types.ObjectId, ref: "syllabuschunks" },
    ],
    roadmapText: { type: String, required: true },
    dailyPlan: [
      {
        day: { type: Number, required: true },
        goal: { type: String, required: true },
        resources: [
          {
            type: { type: String },
            title: { type: String },
            url: { type: String },
          },
        ],
        completed: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true },
);

export const RoadmapModel = mongoose.model<IRoadmap>("roadmaps", roadmapSchema);
