import { UserModel } from "../models/user.model";
import { ApiError } from "../utils/response-handler.util";
import { CREDITS_PER_ROADMAP } from "../constants/credits.constant";

export async function ensureCreditsAndDeduct(userId: string) {
  const user = await UserModel.findById(userId);
  if (!user) throw new ApiError(404, "User not found");
  if (user.credits <= 0) throw new ApiError(402, "Insufficient credits");
  user.credits = Math.max(0, user.credits - CREDITS_PER_ROADMAP);
  await user.save();
  return user.credits;
}

export async function addCredits(userId: string, credits: number) {
  const user = await UserModel.findById(userId);
  if (!user) throw new ApiError(404, "User not found");
  user.credits += credits;
  await user.save();
  return user.credits;
}
