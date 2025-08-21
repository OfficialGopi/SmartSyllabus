import http from "http";
import { env } from "./env";
import connectDb from "./db/connectDb";
import logger from "./logger";
import { app } from "./app";

connectDb(env.DATABASE_URI)
  .then(() => {
    const server = http.createServer(app);
    server.listen(env.PORT, () => {
      logger.info(`Server is running on PORT:${env.PORT}`);
    });
  })
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });
