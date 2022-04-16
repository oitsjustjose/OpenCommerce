import { Request, Response } from "express";
import S3FileLink from "../../../models/S3FileLink";

export default async (req: Request, res: Response) => {
  // const f = new S3FileLink({ key: (req.file as any).key });
  // await f.save();
  return res.status(200).json({ output: (req.file as any).key });
};
