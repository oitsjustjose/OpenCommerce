import { Request, Response } from "express";
import AdminRoutes from "./admin/routes";
import ProductRoutes from "./product/routes";
import ReviewRoutes from "./review/routes";
import UserRoutes from "./user/routes";

export type RouteCollection = {
  httpMethod: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
  path: string;
  handler: (arg1: Request, arg2: Response) => any;
};

const routes: RouteCollection[] = [
  ...ProductRoutes,
  ...UserRoutes,
  ...ReviewRoutes,
  ...AdminRoutes,
];

export default routes;
