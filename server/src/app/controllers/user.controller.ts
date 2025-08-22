import { env } from "../../env";
import { cookieOptions, tokenFieldNames } from "../constants/cookies.constant";
import { UserModel } from "../models/user.model";
import {
  generateTokenAndSaveToDB,
  sanitizeUser,
} from "../services/user.service";
import { IUser } from "../types/schemas.type";
import { AsyncHandler } from "../utils/async-handler.util";
import { ApiError, ApiResponse } from "../utils/response-handler.util";

const getMe = AsyncHandler(async (req, res) => {
  if (!req.user) {
    res.clearCookie(tokenFieldNames.accessToken);
    throw new ApiError(401, "You are not logged in");
  }
  return res.status(200).json(new ApiResponse(200, req.user!, "Success"));
});

const login = AsyncHandler(async (req, res) => {
  const user = sanitizeUser(req.user as IUser);
  if (!req.user) {
    res.clearCookie(tokenFieldNames.accessToken);
    res.redirect(`${env.CLIENT_URL}/login`);
  }

  const tokens = await generateTokenAndSaveToDB(user._id.toString()!);

  if (!tokens) {
    res.clearCookie(tokenFieldNames.accessToken);
    res.clearCookie(tokenFieldNames.refreshToken);
    throw new ApiError(401, "You are not logged in");
  }

  res
    .cookie(tokenFieldNames.accessToken, tokens.accessToken, cookieOptions)
    .cookie(tokenFieldNames.refreshToken, tokens.refreshToken, cookieOptions);

  res.redirect(`${env.CLIENT_URL}/login`);
});

const logout = AsyncHandler(async (req, res) => {
  const user = req.user as IUser;
  if (!user) {
    res.clearCookie(tokenFieldNames.accessToken);
    res.clearCookie(tokenFieldNames.refreshToken);
    throw new ApiError(401, "You are not logged in");
  }

  await UserModel.updateOne(
    {
      _id: user._id,
    },
    {
      $set: {
        refreshToken: "",
      },
    },
  );

  res.clearCookie(tokenFieldNames.accessToken);
  res.clearCookie(tokenFieldNames.refreshToken);

  return res.status(201).json(new ApiResponse(201, null, "Success"));
});

export { getMe, login, logout };
