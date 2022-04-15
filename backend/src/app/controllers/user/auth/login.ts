/**
 * @author Jose Stovall: stovallj1995@gmail.com
 * This file is the REST API endpoint in charge of logging in a user
 */

import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import moment from "moment";
import Users, { UserModel } from "../../../models/User";
import { LOGGER } from "../../../util/Logger";

export default async (req: Request, res: Response) => {
  try {
    const user: UserModel | null = await Users.findOne({
      email: req.body.email.toLowerCase(),
    });

    if (!user) {
      return res
        .status(404)
        .json({ error: "Email address is not registered." });
    }

    if (!user.isEmailValidated) {
      return res.status(403).json({
        error:
          "This email address has not yet been validated. Please check your email.",
      });
    }

    if (!user.validPassword(req.body.password)) {
      return res
        .status(404)
        .json({ error: "Invalid password for the email address provided." });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        first: user.first,
        last: user.last,
        admin: user.admin,
        expiresAt: moment().add(1, "day").toISOString(),
      },
      process.env.JWT_SECRET as string
    );

    return res.status(200).json({ token });
  } catch (ex) {
    LOGGER.error(ex);
    return res.status(500).json({ error: ex });
  }
};
