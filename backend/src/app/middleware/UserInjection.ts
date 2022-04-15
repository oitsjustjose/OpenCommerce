import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import moment from "moment";
import Users from "../models/User";

export default () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header("auth-token");
      if (!token) {
        return next();
      }

      const { _id, expiresAt } = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as { _id: string; expiresAt: string };

      if (moment(moment()).isAfter(expiresAt)) {
        return next();
      }

      const user = await Users.findById(_id);
      req.user = user;
      next();
    } catch (err) {
      return res.status(400).json({ error: `Invalid Token: ${err}` });
    }
  };
};
