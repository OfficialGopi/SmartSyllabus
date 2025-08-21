import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CORS
import cors from "cors";
import { corsOptions } from "./constants/cors.constant";
app.use(cors(corsOptions));

//COOKIES
import cookieParser from "cookie-parser";
app.use(cookieParser());

//PASSPORT
import { passport } from "./lib/passport.lib";
app.use(passport.initialize());

//ROUTES

//ERROR MIDDLEWARE
import { errorMiddleware } from "./middlewares/error.middleware";
app.use(errorMiddleware);

export { app };
