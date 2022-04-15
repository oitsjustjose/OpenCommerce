import { Request, Response } from "express";
import ProductRoutes from "./product";
import ReviewRoutes from "./review";
import UserRoutes from "./user";

export type RouteCollection = {
  httpMethod: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
  path: string;
  handler: (arg1: Request, arg2: Response) => any;
};

const routes: RouteCollection[] = [
  ...ProductRoutes,
  ...UserRoutes,
  ...ReviewRoutes,
];

export default routes;
