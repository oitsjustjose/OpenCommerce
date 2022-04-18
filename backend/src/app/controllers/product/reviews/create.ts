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
