import express from "express";
import { checkLogin } from "../middlewares/auth.middleware";
import {
  addMessage,
  createChat,
  getChats,
} from "../controllers/chat.controller";

const router = express.Router();

router.post("/", checkLogin, createChat);
router.get("/", checkLogin, getChats);
router.post("/:chatId/messages", checkLogin, addMessage);

export { router };
