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

  const product = await Products.findById(req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ error: `Product with id ${req.params.id} could not be located` });
  }

  const reviewsFromUser = product.reviews.filter((x) =>
    x.user._id.equals(req.user._id)
  ).length;
  if (!!reviewsFromUser) {
    return res
      .status(422)
      .json({ error: "You've already left a review for this product" });
  }

  if (req.body.rating < 0 || req.body.rating > 5.0) {
    return res
      .status(422)
      .json({ error: "Ratings must be between 0.0 and 5.0" });
  }

  product.reviews = [
    ...product.reviews,
    {
      ...req.body,
      user: {
        first: req.user.first,
        last: req.user.last,
        _id: req.user._id,
      },
    } as Review,
  ];
  await product.save();
  return res.status(200).send();
};
