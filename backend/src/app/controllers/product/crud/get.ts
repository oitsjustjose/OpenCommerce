import { Request, Response } from "express";
import Products from "../../../models/Product";
import { LOGGER } from "../../../util/Logger";
import { Types } from "mongoose";

export default async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res
        .status(422)
        .json({ error: "Request is missing Parameter 'id'" });
    }

    const product = await Products.findById(new Types.ObjectId(req.params.id));
    if (!product) {
      return res
        .status(404)
        .json({ error: `No product with ID ${req.params.id} was found.` });
    }

    return res.status(200).json({
      ...product.toJSON(),
      overallRating: product.reviews.length
        ? product.reviews
            .map((x) => x.rating)
            .reduce((prev, curr) => prev + curr) / product.reviews.length
        : null,
    });
  } catch (ex) {
    LOGGER.error(ex);
    return res.status(500).json({ error: ex });
  }
};
