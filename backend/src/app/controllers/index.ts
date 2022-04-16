import { Request, Response } from "express";
import ProductRoutes from "./product";
import ReviewRoutes from "./review";
import UserRoutes from "./user";
import S3Routes from "./s3";

export type RouteCollection = {
  httpMethod: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
  path: string;
  handler: (arg1: Request, arg2: Response) => any;
  middleware?: any[];
};

const routes: RouteCollection[] = [
  ...ProductRoutes,
  ...UserRoutes,
  ...ReviewRoutes,
  ...S3Routes,
];

export default routes;
