import { json, urlencoded } from "body-parser";
import cors from "cors";
import express from "express";
import Routes from "./app/controllers";
import AccessLog from "./app/middleware/AccessLog";
import UserInjection from "./app/middleware/UserInjection";
import { UserModel } from "./app/models/User";

interface AuthenticatableRequest {
  user?: UserModel;
}

declare global {
  namespace Express {
    interface Request extends AuthenticatableRequest {}
  }
}

export default () => {
  const app = express();

  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(UserInjection());
  app.use(AccessLog());

  Routes.forEach(({ path, httpMethod, middleware, handler }) => {
    switch (httpMethod) {
      case "GET":
        app.get(path, ...(middleware || []), handler);
        break;
      case "POST":
        app.post(path, ...(middleware || []), handler);
        break;
      case "DELETE":
        app.delete(path, ...(middleware || []), handler);
        break;
      case "PUT":
        app.put(path, ...(middleware || []), handler);
        break;
      case "PATCH":
        app.patch(path, ...(middleware || []), handler);
        break;
    }
    console.log("-------------------------------------------------");
    console.log(`${httpMethod}: ${path}`);
  });
  console.log("-------------------------------------------------");
  return app;
};
