import aws from "aws-sdk";

let cached: aws.S3 | null = null;

export default () => {
  if (cached) {
    return cached;
  }

  const S3 = new aws.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    apiVersion: "2006-03-01",
    signatureVersion: "v4",
  });

  cached = S3;
  return cached;
};
