import { Request, Response } from "express";
import ValidateEmail from "../../../email/templates/ValidateEmail";
import Users from "../../../models/User";
import { LOGGER } from "../../../util/Logger";

export default async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res
        .status(422)
        .json({ error: "Cannot modify user since you are not logged in." });
    }

    // If you're an admin it's assumed you're deleting someone else's account for them
    const userIdToUpdate = req.user.admin ? req.body._id : req.user._id;
    const user = await Users.findById(userIdToUpdate);
    if (!user) {
      return res
        .status(404)
        .json({ error: `User with id ${userIdToUpdate} not found` });
    }

    user.first = req.body.first || user.first;
    user.last = req.body.last || user.last;
    user.email = req.body.email || user.email;
    user.isEmailValidated = false;
    await user.save();

    if (req.body.email) {
      await ValidateEmail(user);
    }
    return res.status(200).json({
      ...user,
      password: "REDACTED",
    });
  } catch (ex) {
    LOGGER.error(ex);
    return res.status(500).json({ error: ex });
  }
};
