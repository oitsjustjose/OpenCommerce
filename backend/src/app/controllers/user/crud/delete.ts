import EmailValidator from "email-validator";
import { Request, Response } from "express";
import Users from "../../../models/User";
import { LOGGER } from "../../../util/Logger";

export default async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res
        .status(422)
        .json({ error: "Cannot delete user since you are not logged in." });
    }

    // If you're an admin it's assumed you're deleting someone else's account for them
    const userIdToDel = req.user.admin ? req.body._id : req.user._id;
    const user = await Users.findById(userIdToDel);
    if (!user) {
      return res
        .status(404)
        .json({ error: `User with id ${userIdToDel} not found` });
    }

    await user.delete();
    return res.status(200).json({ "Successfully Deleted": user });
  } catch (ex) {
    LOGGER.error(ex);
    return res.status(500).json({ error: ex });
  }
};
