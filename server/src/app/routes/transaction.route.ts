import express from "express";
import { checkLogin } from "../middlewares/auth.middleware";
import {
  addTransaction,
  getTransactions,
} from "../controllers/transaction.controller";

const router = express.Router();

router.post("/", checkLogin, addTransaction);
router.get("/", checkLogin, getTransactions);

export { router };
