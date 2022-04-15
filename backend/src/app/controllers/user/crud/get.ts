import EmailValidator from "email-validator";
import { Request, Response } from "express";
import Users from "../../../models/User";
import { LOGGER } from "../../../util/Logger";

export default async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res
        .status(422)
        .json({ error: "Cannot fetch the user since you are not logged in." });
    }

    // If you're an admin it's assumed you're viewing someone else's account
    const userId = req.user.admin && req.body._id ? req.body._id : req.user._id;
    const user = await Users.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ error: `User with id ${userId} not found` });
    }

    return res.status(200).json(user);
  } catch (ex) {
    LOGGER.error(ex);
    return res.status(500).json({ error: ex });
  }
};
