import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import moment from "moment";

export type JwtDecodedUser = {
  _id: string;
  email: string;
  first: string;
  last: string;
  admin: boolean;
  expiresAt: string;
};

export default async (req: Request, res: Response) => {
  try {
    if (!req.query.token) {
      return res.status(422).json({ error: "No user token was provided" });
    }

    const data = jwt.verify(
      req.query.token as string,
      process.env.JWT_SECRET as string
    ) as JwtDecodedUser;

    if (moment(moment()).isAfter(data.expiresAt)) {
      return res.status(410).json({ error: "This token has expired" });
    }

    return res.status(200).json(data);
  } catch (ex) {
    return res.status(500).json({ error: ex });
  }
};
