import { Request, Response } from "express";
import Product from "../../../models/Product";
import { LOGGER } from "../../../util/Logger";

export default async (req: Request, res: Response) => {
  try {
    if (!req.user?.admin) {
      return res.status(403).send();
    }

    const tmp = new Product(req.body);
    await tmp.save();
    return res.status(200).json(tmp);
  } catch (ex) {
    LOGGER.error(ex);
    return res.status(500).json({ error: ex });
  }
};
