import { RouteCollection } from "..";
import post from "./crud/post";
import get from "./crud/get";
import moment from "moment";
import multer from "multer";
import multerS3 from "multer-s3";
import getS3Instace from "../../util/S3";

const uploader = multer({
  storage: multerS3({
    s3: getS3Instace(),
    bucket: process.env.AWS_BUCKET,
    key: function (req, file, cb) {
      cb(null, `${moment().toISOString()}-${file.originalname}`);
    },
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
  }),
});

const routes: RouteCollection[] = [
  {
    httpMethod: "GET",
    path: "/api/v1/fileupload/:key",
    handler: get,
  },
  {
    httpMethod: "POST",
    path: "/api/v1/fileupload",
    handler: post,
    middleware: [uploader.single("file")],
  },
];

export default routes;
