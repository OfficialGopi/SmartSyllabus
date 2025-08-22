import express from "express";
import { checkLogin } from "../middlewares/auth.middleware";
import {
  getSyllabusForChat,
  uploadSyllabus,
  uploadSyllabusPdf,
} from "../controllers/syllabus.controller";
import { upload } from "../middlewares/multer.middleware";

const router = express.Router();

router.post("/:chatId", checkLogin, uploadSyllabus);
router.post(
  "/:chatId/pdf",
  checkLogin,
  upload.single("pdf"),
  uploadSyllabusPdf,
);
router.get("/:chatId", checkLogin, getSyllabusForChat);

export { router };
