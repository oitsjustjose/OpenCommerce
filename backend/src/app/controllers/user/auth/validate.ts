import { Request, Response } from "express";
import Users from "../../../models/User";
import { LOGGER } from "../../../util/Logger";

export default async (req: Request, res: Response) => {
  try {
    const user = await Users.findById(req.query._id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.isEmailValidated = true;
    await user.save();
    return res
      .status(200)
      .send(
        "Thank you for validating your email address! You may now close this window."
      );
  } catch (ex) {
    LOGGER.error(ex);
    return res.status(500).send("Uh oh! Something went wrong..");
  }
};
