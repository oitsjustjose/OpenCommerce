import NodeMailer from "nodemailer";

export const createTransport = () => {
  return NodeMailer.createTransport({
    host: "smtp.titan.email",
    port: 465,
    auth: {
      user: process.env.NODEMAILER_ADDRESS,
      pass: process.env.NODEMAILER_PASSWORD,
    },
    tls: { secureProtocol: "TLSv1_2_method", rejectUnauthorized: false },
    ignoreTLS: false,
    requireTLS: true,
  });
};
