import { Request, Response } from "express";
import Reviews from "../../../models/Review";
import { LOGGER } from "../../../util/Logger";

export default async (req: Request, res: Response) => {
  try {
    if (!req.params.productId) {
      return res
        .status(422)
        .json({ error: "Request is missing Parameter 'productId'" });
    }

    const reviews = await Reviews.find({ productId: req.params.productId });
    return res.status(200).json(reviews);
  } catch (ex) {
    LOGGER.error(ex);
    return res.status(500).json({ error: ex });
  }
};
