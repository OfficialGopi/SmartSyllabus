import { Document, Types } from "mongoose";
import type { TYPE_AUTH_PROVIDERS } from "../constants/auth-providers.constant";
import { TYPE_PAYMENT_PROVIDER } from "../constants/payment-providers.constant";

interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  avatar: string;
  provider: TYPE_AUTH_PROVIDERS;
  credits: number;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ITransaction extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  amount: number;
  creditsAdded: number;
  paymentProvider: TYPE_PAYMENT_PROVIDER;
  createdAt: Date;
  updatedAt: Date;
}

interface ISyllabusChunk extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  conversation: Types.ObjectId;
  chunk: string;
  embedding: number[];
  createdAt: Date;
  updatedAt: Date;
}

interface IConversation extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  syllabusType: string;
  syllabusText?: string;
  syllabusPdfLink?: string;
  createdAt: Date;
  updatedAt: Date;
}
export type { IUser, ITransaction, ISyllabusChunk, IConversation };
