import mongoose from "mongoose";
import { PAYMENT_PROVIDER_ENUM } from "../constants/payment-providers.constant";
import { ITransaction } from "../types/schemas.type";

const transactionSchema = new mongoose.Schema<ITransaction>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    amount: Number,
    creditsAdded: Number,
    paymentProvider: {
      type: String,
      enum: PAYMENT_PROVIDER_ENUM,
    },
  },
  {
    timestamps: true,
  },
);

export const TransactionModel = mongoose.model<ITransaction>(
  "transactions",
  transactionSchema,
);
