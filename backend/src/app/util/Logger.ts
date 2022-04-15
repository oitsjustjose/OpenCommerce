import { Request } from "express";
import winston from "winston";

export const LOGGER = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: "api" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

export const logAccess = (req: Request) => {
  LOGGER.info(
    `Accessed endpoint ${req.path}. User is ${
      req.user ? "authenticated" : "not authenticated"
    }`
  );
};
