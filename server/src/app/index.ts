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

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/syllabus", syllabusRouter);
app.use("/api/roadmap", roadmapRouter);
app.use("/api/progress", progressRouter);
app.use("/api/transaction", transactionRouter);

//ERROR MIDDLEWARE
import { errorMiddleware } from "./middlewares/error.middleware";
app.use(errorMiddleware);

export { app };
