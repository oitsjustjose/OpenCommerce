import { NextFunction, Request, Response } from "express";
import { logAccess } from "../util/Logger";

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    logAccess(req);
    next();
  };
};
