import mongoose from "mongoose";
import { IUser } from "../types/schemas.type";
import { AUTH_PROVIDERS_ENUM } from "../constants/auth-providers.constant";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },

    provider: {
      type: String,
      enum: AUTH_PROVIDERS_ENUM,
    },
    credits: {
      type: Number,
      default: 10,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model<IUser>("users", userSchema);
