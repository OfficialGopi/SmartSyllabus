import { AsyncHandler } from "../utils/async-handler.util";
import { ApiResponse } from "../utils/response-handler.util";
import { generateRoadmap, getRoadmap } from "../services/roadmap.service";

export const generateRoadmapHandler = AsyncHandler(async (req, res) => {
  const user = req.user!;
  const { chatId } = req.params as { chatId: string };
  const { query } = req.body as { query: string };
  const roadmap = await generateRoadmap(user._id.toString(), chatId, query);
  return res.status(201).json(new ApiResponse(201, roadmap, "Generated"));
});

export const getRoadmapHandler = AsyncHandler(async (req, res) => {
  const { roadmapId } = req.params as { roadmapId: string };
  const roadmap = await getRoadmap(roadmapId);
  return res.status(200).json(new ApiResponse(200, roadmap, "Success"));
});
