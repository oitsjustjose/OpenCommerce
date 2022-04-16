import aws from "aws-sdk";
import { Express } from "express";
import moment from "moment";
import multer from "multer";
import multers3 from "multer-s3";
import S3FileLink from "./app/models/S3FileLink";

export default (app: Express) => {
  const s3 = new aws.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    apiVersion: "2006-03-01",
    signatureVersion: "v4",
  });

  const uploader = multer({
    storage: multers3({
      s3,
      bucket: process.env.AWS_BUCKET,
      key: function (req, file, cb) {
        cb(null, `${moment().toISOString()}-${file.originalname}`);
      },
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
    }),
  });

  // Special endpoint for the image upload
  app.post("/api/v1/fileupload", uploader.single("file"), async (req, res) => {
    const f = new S3FileLink({ key: (req.file as any).key });
    await f.save();
    return res.status(200).json({ output: f.key });
  });

  app.get("/api/v1/fileupload/:key", async (req, res) => {
    if (!req.params.key) {
      return res.status(404).send();
    }

    const signedUrl = await s3.getSignedUrlPromise("getObject", {
      Bucket: process.env.AWS_BUCKET,
      Key: req.params.key,
      Expires: 604800,
    });

    return res.redirect(signedUrl);
  });

  console.log("GET /api/v1/fileupload/:key");
  console.log("-------------------------------------------------");
  console.log("POST /api/v1/fileupload");
};
