import express from "express";
import { checkLogin } from "../middlewares/auth.middleware";
import {
  getProgress,
  markDayComplete,
} from "../controllers/progress.controller";

const router = express.Router();

router.post("/:roadmapId/:day", checkLogin, markDayComplete);
router.get("/:roadmapId", checkLogin, getProgress);

export { router };
