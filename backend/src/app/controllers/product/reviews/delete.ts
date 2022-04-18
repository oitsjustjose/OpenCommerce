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

  product.reviews = product.reviews.filter(
    (x) => x._id.toString() !== req.params.revId
  );

  await product.save();
  return res.status(200).send();
};
