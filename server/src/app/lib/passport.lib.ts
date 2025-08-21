import { Request } from "express";
import passport from "passport";
import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth20";
import { UserModel } from "../models/user.model";
import { sanitizeUser } from "../services/user.service";
import { AUTH_PROVIDERS } from "../constants/auth-providers.constant";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      scope: ["profile", "email"],
      passReqToCallback: true,
    },
    async (
      req: Request,
      accessToken: string,
      refreshToken: string,
      profile,
      done: VerifyCallback,
    ) => {
      try {
        const email = profile?.emails?.[0]?.value;
        const displayName = profile.displayName || "";
        const photo = profile.photos?.[0]?.value;
        if (!email) {
          throw new Error("Email not provided by Google");
        }

        const user = await UserModel.findOne({ email });
        if (user) {
          return done(null, sanitizeUser(user));
        }
        const newUser = await UserModel.create({
          email,
          name: displayName,
          avatar: photo,
          provider: AUTH_PROVIDERS.GOOGLE,
        });
        return done(null, sanitizeUser(newUser));
      } catch (error) {
        done(
          error instanceof Error ? error : new Error("Authentication failed"),
        );
      }
    },
  ),
);

export { passport };
