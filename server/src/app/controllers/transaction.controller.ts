import { AsyncHandler } from "../utils/async-handler.util";
import { ApiResponse, ApiError } from "../utils/response-handler.util";
import { TransactionModel } from "../models/transaction.model";
import { addCredits } from "../services/credit.service";

export const addTransaction = AsyncHandler(async (req, res) => {
  const user = req.user!;
  const { amount, creditsAdded, paymentProvider } = req.body as {
    amount: number;
    creditsAdded: number;
    paymentProvider: string;
  };
  if (!amount || !creditsAdded) throw new ApiError(400, "Missing fields");

  const tx = await TransactionModel.create({
    userId: user._id,
    amount,
    creditsAdded,
    paymentProvider,
  });
  await addCredits(user._id.toString(), creditsAdded);
  return res.status(201).json(new ApiResponse(201, tx, "Success"));
});

export const getTransactions = AsyncHandler(async (req, res) => {
  const user = req.user!;
  const txs = await TransactionModel.find({ userId: user._id })
    .sort({ createdAt: -1 })
    .lean();
  return res.status(200).json(new ApiResponse(200, txs, "Success"));
});
