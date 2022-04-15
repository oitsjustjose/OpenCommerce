import { Request, Response } from "express";
import Products from "../../../models/Product";
import { LOGGER } from "../../../util/Logger";

export default async (req: Request, res: Response) => {
  try {
    if (!req.user?.admin) {
      return res.status(403).send();
    }

    const tmp = new Products(req.body);
    await tmp.save();
    return res.status(200).json(tmp);
  } catch (ex) {
    LOGGER.error(ex);
    return res.status(500).json({ error: ex });
  }
};
