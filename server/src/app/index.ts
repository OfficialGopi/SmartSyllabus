import express from "express";
import rateLimit from "express-rate-limit";

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

// Rate limiting for AI endpoints
const aiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: "Too many AI requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

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
app.use("/api/v1/roadmap", aiRateLimiter, roadmapRouter); // Apply rate limiting to AI endpoints
app.use("/api/v1/progress", progressRouter);
app.use("/api/v1/transaction", transactionRouter);

//ERROR MIDDLEWARE
import { errorMiddleware } from "./middlewares/error.middleware";
app.use(errorMiddleware);

export { app };
