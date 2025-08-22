import mongoose from "mongoose";
import { AsyncHandler } from "../utils/async-handler.util";
import { ApiResponse } from "../utils/response-handler.util";
import { ProgressModel } from "../models/progress.model";
import { IUser } from "../types/schemas.type";

export const markDayComplete = AsyncHandler(async (req, res) => {
  const user = req.user! as IUser;
  const { roadmapId, day } = req.params as { roadmapId: string; day: string };
  const progress = await ProgressModel.findOneAndUpdate(
    {
      userId: user._id,
      roadmap: new mongoose.Types.ObjectId(roadmapId),
      day: Number(day),
    },
    { $set: { completed: true } },
    { upsert: true, new: true },
  );
  return res.status(200).json(new ApiResponse(200, progress, "Updated"));
});

export const getAllProgress = AsyncHandler(async (req, res) => {
  const user = req.user! as IUser;
  const progress = await ProgressModel.find({
    userId: user._id,
  })
    .sort({ createdAt: -1 })
    .populate("roadmap", "query")
    .lean();
  return res.status(200).json(new ApiResponse(200, progress, "Success"));
});

export const getProgress = AsyncHandler(async (req, res) => {
  const user = req.user! as IUser;
  const { roadmapId } = req.params as { roadmapId: string };
  const progress = await ProgressModel.find({
    userId: user._id,
    roadmap: new mongoose.Types.ObjectId(roadmapId),
  })
    .sort({ day: 1 })
    .lean();
  return res.status(200).json(new ApiResponse(200, progress, "Success"));
});
