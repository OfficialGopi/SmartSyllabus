import express from "express";
import { checkLogin } from "../middlewares/auth.middleware";
import {
  generateRoadmapHandler,
  getRoadmapHandler,
  getAllRoadmapsHandler,
} from "../controllers/roadmap.controller";

const router = express.Router();

router.post("/:chatId", checkLogin, generateRoadmapHandler);
router.get("/", checkLogin, getAllRoadmapsHandler);
router.get("/:roadmapId", checkLogin, getRoadmapHandler);

export { router };
