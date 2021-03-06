import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import moment from "moment";
import Users from "../models/User";
import { LOGGER } from "../util/Logger";

export default () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header("authorization").replace("Bearer", "").trim();
      if (!token) return next();

      const { _id, expiresAt } = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as { _id: string; expiresAt: string };

      if (moment(moment()).isAfter(expiresAt)) return next();

      const user = await Users.findById(_id);
      req.user = user.isEmailValidated ? user : null;
      return next();
    } catch (err) {
      LOGGER.error(err);
      return next();
    }
  };
};
