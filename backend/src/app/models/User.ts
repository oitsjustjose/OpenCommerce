import { Document, model, Schema } from "mongoose";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

export type UserModel = Document & {
  first: string;
  last: string;
  email: string;
  password: string;
  admin: boolean;
  hashPassword: (password: string) => string;
  validPassword: (password: string) => boolean;
};

const UserSchema = new Schema<UserModel>({
  first: String,
  last: String,
  email: String,
  password: String,
  admin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.hashPassword = function (password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
};

UserSchema.methods.validPassword = function (inp: string) {
  const [salt, key] = this.password.split(":");
  const hashedBuf = scryptSync(inp, salt, 64);
  const keyBuf = Buffer.from(key, "hex");
  return timingSafeEqual(hashedBuf, keyBuf);
};

export default model<UserModel>("users", UserSchema, "users");
