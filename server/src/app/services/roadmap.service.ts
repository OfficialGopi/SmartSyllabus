import mongoose from "mongoose";

import { ensureCreditsAndDeduct } from "./credit.service";
import { retrieveContext, generateRoadmapFromAI } from "./ai.service";
import { RoadmapModel } from "../models/roadmap.model";

export async function generateRoadmap(
  userId: string,
  conversationId: string,
  query: string,
) {
  // Deduct credits first; throws if insufficient
  await ensureCreditsAndDeduct(userId);

  const { context, usedIds } = await retrieveContext(
    query,
    new mongoose.Types.ObjectId(userId),
    new mongoose.Types.ObjectId(conversationId),
  );
  const roadmapText = await generateRoadmapFromAI(query, context);

  const roadmap = await RoadmapModel.create({
    userId: new mongoose.Types.ObjectId(userId),
    conversation: new mongoose.Types.ObjectId(conversationId),
    query,
    syllabusUsed: usedIds,
    roadmapText,
    dailyPlan: [],
  });
  return roadmap;
}

export async function getAllRoadmaps(userId: string) {
  return RoadmapModel.find({ userId: new mongoose.Types.ObjectId(userId) })
    .sort({ createdAt: -1 })
    .populate("conversation", "title");
}

export async function getRoadmap(roadmapId: string) {
  return RoadmapModel.findById(roadmapId);
}
