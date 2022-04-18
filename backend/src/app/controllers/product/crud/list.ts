import { Request, Response } from "express";
import Products from "../../../models/Product";
import { LOGGER } from "../../../util/Logger";

export default async (req: Request, res: Response) => {
  try {
    const products = await Products.find(req.body.searchParams || {});
    return res.status(200).json(
      products.map((p) => ({
        ...p.toJSON(),
        overallRating: p.reviews.length
          ? p.reviews.map((x) => x.rating).reduce((prev, curr) => prev + curr) /
            p.reviews.length
          : null,
      }))
    );
  } catch (ex) {
    LOGGER.error(ex);
    return res.status(500).json({ error: ex });
  }
};
