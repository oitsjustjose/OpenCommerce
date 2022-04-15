import { config as LoadDotenv } from "dotenv";
import winston from "winston";
import app from "./app";
import { LOGGER } from "./app/util/Logger";
import ConnectDb from "./db";

if (process.env.NODE_ENV !== "production") {
  LoadDotenv();
  LOGGER.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

ConnectDb();

const port = process.env.PORT || 3000;
app.listen(port, () =>
  LOGGER.info(`Server started. Listening on port ${port}`)
);
