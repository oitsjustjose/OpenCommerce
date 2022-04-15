import { Request, Response } from "express";
import Products from "../../../models/Product";
import { LOGGER } from "../../../util/Logger";

export default async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res
        .status(422)
        .json({ error: "Request is missing Parameter 'id'" });
    }

    const product = await Products.findById(req.params.id);

    return !!product
      ? res.status(200).json(product)
      : res
          .status(404)
          .json({ error: `No product with ID ${req.params.id} was found.` });
  } catch (ex) {
    LOGGER.error(ex);
    return res.status(500).json({ error: ex });
  }
};
