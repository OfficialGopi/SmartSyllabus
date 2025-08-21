import { env } from "../../env";
import { UserModel } from "../models/user.model";
import { IUser } from "../types/schemas.type";
import jwt from "jsonwebtoken";

const sanitizeUser = (user: IUser) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    provider: user.provider,
    credits: user.credits,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

const generateTokenAndSaveToDB = async (
  userId: string,
): Promise<{
  accessToken: string;
  refreshToken: string;
} | null> => {
  const accessToken = jwt.sign(
    {
      userId,
    },
    env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: env.ACCESS_TOKEN_EXPIRY,
    } as jwt.SignOptions,
  );
  const refreshToken = jwt.sign(
    {
      userId,
    },
    env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: env.REFRESH_TOKEN_EXPIRY,
    } as jwt.SignOptions,
  );

  try {
    await UserModel.updateOne(
      {
        _id: userId,
      },
      {
        refreshToken: refreshToken,
      },
    );
  } catch (error) {
    return null;
  }
  return {
    accessToken,
    refreshToken,
  };
};

const extractUserIdFromToken = (
  token: string,
): {
  success: boolean;
  userId?: string;
  error?: string;
} => {
  const decodedToken = jwt.verify(token, env.ACCESS_TOKEN_SECRET!) as {
    userId: string;
  } & jwt.JwtPayload;

  if (!decodedToken) {
    return {
      success: false,
      error: "Session Expired",
    };
  }

  if (decodedToken.exp! < Date.now() / 1000) {
    return {
      success: false,
      error: "Session Expired",
    };
  }

  if (!decodedToken.userId) {
    return {
      success: false,
      error: "Session Expired",
    };
  }

  const user = UserModel.findById(decodedToken.userId);
  if (!user) {
    return {
      success: false,
      error: "User not found",
    };
  }

  return {
    success: true,
    userId: decodedToken.userId,
  };
};

export { sanitizeUser, generateTokenAndSaveToDB, extractUserIdFromToken };
