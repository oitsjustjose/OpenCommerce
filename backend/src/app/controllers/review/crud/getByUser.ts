import { Request, Response } from "express";
import Reviews from "../../../models/Review";
import Users from "../../../models/User";
import { LOGGER } from "../../../util/Logger";

export default async (req: Request, res: Response) => {
  try {
    if (!req.params.userEmail) {
      return res
        .status(422)
        .json({ error: "Request is missing Parameter 'userEmail'" });
    }

    const user = await Users.findOne({ email: req.params.userEmail });
    const reviews = await Reviews.find({ userId: user._id });
    return res.status(200).json(reviews);
  } catch (ex) {
    LOGGER.error(ex);
    return res.status(500).json({ error: ex });
  }
};
