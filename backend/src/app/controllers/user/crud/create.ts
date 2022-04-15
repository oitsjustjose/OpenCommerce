import EmailValidator from "email-validator";
import { Request, Response } from "express";
import ValidateEmail from "../../../email/templates/ValidateEmail";
import Users from "../../../models/User";
import { LOGGER } from "../../../util/Logger";

export default async (req: Request, res: Response) => {
  try {
    const { first, last, email, password } = req.body;
    const fmtEmail = email.toLowerCase();

    if (!first || !last || !first.length || !last.length) {
      return res.status(422).json({
        error: "First and Last Name are Required Fields",
      });
    }

    if (!fmtEmail || !fmtEmail.length || !EmailValidator.validate(fmtEmail)) {
      return res.status(422).json({
        error: "A valid email is required",
      });
    }

    if (!password || password.length < 8) {
      return res.status(422).json({
        error: "Password is required and must contain at least 8 characters",
      });
    }

    const existing = await Users.find({ email: fmtEmail });
    if (existing && existing.length) {
      return res
        .status(422)
        .json({ error: `Email address ${fmtEmail} is already registered.` });
    }

    const created = new Users({ first, last, email: fmtEmail });
    created.password = created.hashPassword(password);
    await created.save();

    await ValidateEmail(created);

    return res.status(200).json(created);
  } catch (ex) {
    LOGGER.error(ex);
    return res.status(500).json({ error: ex });
  }
};
