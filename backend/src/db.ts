import mongoose from "mongoose";
import { LOGGER } from "./app/util/Logger";

export default async () => {
  try {
    await mongoose.connect(
      `mongodb://${process.env.MONGO_URI}/${process.env.MONGO_COLLECTION}`,
      { autoIndex: true }
    );
  } catch (ex) {
    LOGGER.error(
      `Failed to connect to Database. Connection failed with error:`
    );
    process.exit(1);
  }
};
