import express from "express";
import { checkLogin } from "../middlewares/auth.middleware";
import {
  generateRoadmapHandler,
  getRoadmapHandler,
} from "../controllers/roadmap.controller";

const router = express.Router();

router.post("/:chatId", checkLogin, generateRoadmapHandler);
router.get("/:roadmapId", checkLogin, getRoadmapHandler);

export { router };
