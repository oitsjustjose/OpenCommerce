import { Request, Response } from "express";
import Products from "../../../models/Product";
import { LOGGER } from "../../../util/Logger";

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

    await product.delete();
    return res.status(200).json({ "Successfully Deleted": product });
  } catch (ex) {
    LOGGER.error(ex);
    return res.status(500).json({ error: ex });
  }
};
