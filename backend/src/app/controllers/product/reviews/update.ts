import { Request, Response } from "express";
import Products, { Review } from "../../../models/Product";

export default async (req: Request, res: Response) => {
  if (!req.user) {
    return res
      .status(403)
      .json({ error: "You must be logged in to leave a review" });
  }

  if (!req.params.id) {
    return res
      .status(422)
      .json({ error: "Missing parameter 'id' to specify product" });
  }

  if (!req.params.revId) {
    return res
      .status(422)
      .json({ error: "Missing parameter 'revId' to specify which review" });
  }

  const product = await Products.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const rev = product.reviews.find(
    (x) => x._id.toString() === req.params.revId
  );

  if (!rev) {
    return res.status(404).json({ error: "Review not found" });
  }

  if (!rev.user._id.equals(req.user._id)) {
    return res.status(403).json({ error: "Review isn't yours" });
  }

  if (req.body.rating < 0 || req.body.rating > 5.0) {
    return res
      .status(422)
      .json({ error: "Ratings must be between 0.0 and 5.0" });
  }

  rev.rating = req.body.rating || rev.rating;
  rev.review.title = req.body.review?.title || rev.review.title;
  rev.review.body = req.body.review?.body || rev.review.body;

  await product.save();
  return res.status(200).send();
};
