import { AsyncHandler } from "../utils/async-handler.util";
import { ApiResponse } from "../utils/response-handler.util";
import {
  generateRoadmap,
  getRoadmap,
  getAllRoadmaps,
} from "../services/roadmap.service";
import { IUser } from "../types/schemas.type";

export const generateRoadmapHandler = AsyncHandler(async (req, res) => {
  const user = req.user! as IUser;
  const { chatId } = req.params as { chatId: string };
  const { query } = req.body as { query: string };
  const roadmap = await generateRoadmap(user._id.toString(), chatId, query);
  return res.status(201).json(new ApiResponse(201, roadmap, "Generated"));
});

export const getAllRoadmapsHandler = AsyncHandler(async (req, res) => {
  const user = req.user! as IUser;
  const roadmaps = await getAllRoadmaps(user._id.toString());
  return res.status(200).json(new ApiResponse(200, roadmaps, "Success"));
});

export const getRoadmapHandler = AsyncHandler(async (req, res) => {
  const { roadmapId } = req.params as { roadmapId: string };
  const roadmap = await getRoadmap(roadmapId);
  return res.status(200).json(new ApiResponse(200, roadmap, "Success"));
});
