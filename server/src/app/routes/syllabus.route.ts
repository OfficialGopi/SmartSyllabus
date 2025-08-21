import express from "express";
import { checkLogin } from "../middlewares/auth.middleware";
import {
  getSyllabusForChat,
  uploadSyllabus,
} from "../controllers/syllabus.controller";

const router = express.Router();

router.post("/:chatId", checkLogin, uploadSyllabus);
router.get("/:chatId", checkLogin, getSyllabusForChat);

export { router };
