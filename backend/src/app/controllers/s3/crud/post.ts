import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  return res.status(200).json({ output: (req.file as any).key });
};
