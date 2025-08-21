import express from "express";
import { checkLogin } from "../middlewares/auth.middleware";
import { getMe, login, logout } from "../controllers/user.controller";
import { passport } from "../lib/passport.lib";
import { env } from "../../env";
const router = express.Router();

router.get("/me", checkLogin, getMe);

//GOOGLE LOGIN INITIATE
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  }),
);
//GOOGLE LOGIN FALLBACK
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${env.CLIENT_URL}/login`,
    session: false,
  }),
  login,
);

router.delete("/logout", checkLogin, logout);

export { router };
