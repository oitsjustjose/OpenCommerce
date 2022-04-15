import { Request, Response } from "express";

import Users from "../../../models/User";
import ResetPasswordEmail from "../../../email/templates/ResetPasswordEmail";

export default async (req: Request, res: Response) => {
  try {
    const email: string | null = req.query.email as string;
    if (!email) {
      return res.status(422).json({ error: "No email provided." });
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ error: "User with given email not found." });
    }

    await ResetPasswordEmail(user);
    return res.status(200).send();
  } catch (ex) {
    return res.status(500).json({ error: ex });
  }
};
