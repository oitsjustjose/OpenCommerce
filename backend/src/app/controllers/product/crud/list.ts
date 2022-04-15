import { Request, Response } from "express";
import Products from "../../../models/Product";
import { LOGGER } from "../../../util/Logger";

export default async (req: Request, res: Response) => {
  try {
    const products = await Products.find(req.body.searchParams || {});
    return res.status(200).send(products);
  } catch (ex) {
    LOGGER.error(ex);
    return res.status(500).json({ error: ex });
  }
};
