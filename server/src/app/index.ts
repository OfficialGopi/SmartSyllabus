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
import { passport } from "./libs/passport.lib";
app.use(passport.initialize());

//ROUTES
import { router as userRouter } from "./routes/user.route";
import { router as chatRouter } from "./routes/chat.route";
import { router as syllabusRouter } from "./routes/syllabus.route";
import { router as roadmapRouter } from "./routes/roadmap.route";
import { router as progressRouter } from "./routes/progress.route";
import { router as transactionRouter } from "./routes/transaction.route";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/syllabus", syllabusRouter);
app.use("/api/v1/roadmap", roadmapRouter);
app.use("/api/v1/progress", progressRouter);
app.use("/api/v1/transaction", transactionRouter);

//ERROR MIDDLEWARE
import { errorMiddleware } from "./middlewares/error.middleware";
app.use(errorMiddleware);

export { app };
