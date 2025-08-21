import mongoose from "mongoose";
import logger from "../logger";

const connectDb = async (databaseUri: string) => {
  try {
    await mongoose.connect(databaseUri);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectDb;
