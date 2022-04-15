import { Request, Response } from "express";
import Review from "../../../models/Review";
import { LOGGER } from "../../../util/Logger";

export default async (req: Request, res: Response) => {
  // TODO: Validation logic to verify that the user has ever purchased one
  try {
    if (!req.user) {
      return res
        .status(403)
        .json({ error: "You must be logged in to leave a review" });
    }

    const tmp = new Review(req.body);
    await tmp.save();
    return res.status(200).json(tmp);
  } catch (ex) {
    LOGGER.error(ex);
    return res.status(500).json({ error: ex });
  }
};
