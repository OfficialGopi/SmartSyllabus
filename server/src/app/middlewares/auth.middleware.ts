import { tokenFieldNames } from "../constants/cookies.constant";
import { UserModel } from "../models/user.model";
import { extractUserIdFromToken, sanitizeUser } from "../services/user.service";
import { AsyncHandler } from "../utils/async-handler.util";
import { ApiError } from "../utils/response-handler.util";

const checkLogin = AsyncHandler(async (req, res, next) => {
  const accessToken = req.cookies[tokenFieldNames.accessToken];
  if (!accessToken) {
    throw new ApiError(401, "You are not logged in");
  }

  const extracted = extractUserIdFromToken(accessToken);
  if (!extracted || !extracted.success) {
    res.clearCookie(tokenFieldNames.accessToken);
    throw new ApiError(401, extracted.error && extracted.error);
  }

  const user = await UserModel.findById(extracted.userId);
  if (!user) {
    throw new ApiError(401, "You are not logged in");
  }

  req.user = sanitizeUser(user);
  next();
});

export { checkLogin };
