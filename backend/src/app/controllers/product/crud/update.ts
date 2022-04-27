import { Request, Response } from "express";
import { LOGGER } from "../../../util/Logger";
import Products from "../../../models/Product";

export default async (req: Request, res: Response) => {
  try {
    if (!req.user?.admin) {
      return res.status(403).send();
    }

    if (!req.params.id) {
      return res
        .status(422)
        .json({ error: "Request is missing Parameter 'id'" });
    }

    const product = await Products.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ error: `No such product with ID ${req.params.id} found` });
    }

    req.body.name && (product.name = req.body.name);
    req.body.description && (product.description = req.body.description);
    req.body.quantity && (product.quantity = req.body.quantity);
    req.body.price && (product.price = req.body.price);
    req.body.images && (product.images = req.body.images);
    req.body.hidden && (product.hidden = req.body.hidden);

    await product.save();
    return res.status(200).json(product);
  } catch (ex) {
    LOGGER.error(ex);
    return res.status(500).json({ error: ex });
  }
};
