import { Request, Response } from "express";
import getS3Instace from "../../../util/S3";

export default async (req: Request, res: Response) => {
  if (!req.params.key) {
    return res.status(404).send();
  }

  const signedUrl = await getS3Instace().getSignedUrlPromise("getObject", {
    Bucket: process.env.AWS_BUCKET,
    Key: req.params.key,
    Expires: 604800,
  });

  return res.redirect(signedUrl);
};
