import mongoose from "mongoose";
import { IConversation } from "../types/schemas.type";

const conversationSchema = new mongoose.Schema<IConversation>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    syllabusType: {
      type: String,
      required: true,
      enum: ["TEXT", "PDF"],
    },
    syllabusText: {
      type: String,
    },
    syllabusPdfLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const ConversationModel = mongoose.model<IConversation>(
  "conversations",
  conversationSchema,
);
