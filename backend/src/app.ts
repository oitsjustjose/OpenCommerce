import { config as LoadDotenv } from "dotenv";

import { json, urlencoded } from "body-parser";
import cors from "cors";
import express from "express";
import winston from "winston";
import Routes from "./app/controllers";
import AccessLog from "./app/middleware/AccessLog";
import UserInjection from "./app/middleware/UserInjection";
import { UserModel } from "./app/models/User";
import { LOGGER } from "./app/util/Logger";
import Multify from "./multer";

interface AuthenticatableRequest {
  user?: UserModel;
}

declare global {
  namespace Express {
    interface Request extends AuthenticatableRequest {}
  }
}

if (process.env.NODE_ENV !== "production") {
  LoadDotenv();
  LOGGER.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(UserInjection());
app.use(AccessLog());

console.log("-------------------------------------------------");
Multify(app);
Routes.forEach(({ path, httpMethod, handler }) => {
  switch (httpMethod) {
    case "GET":
      app.get(path, handler);
      break;
    case "POST":
      app.post(path, handler);
      break;
    case "DELETE":
      app.delete(path, handler);
      break;
    case "PUT":
      app.put(path, handler);
      break;
    case "PATCH":
      app.patch(path, handler);
      break;
  }
  console.log("-------------------------------------------------");
  console.log(`${httpMethod}: ${path}`);
});
console.log("-------------------------------------------------");

export default app;
