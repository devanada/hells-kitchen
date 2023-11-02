import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { loginUser, regisUser, getUserByEmail } from "./auth.model";
import { zParse } from "../utils/zParse";
import { registerSchema, loginSchema } from "./auth.types";

export const userSignup = async (req: Request, res: Response) => {
  try {
    const { query, body } = await zParse(registerSchema, req);

    if (query.overwrite === "true") {
      const oldUser = await getUserByEmail(body.email);

      if (oldUser) {
        return res
          .status(409)
          .json({ message: "User already exist, please login" });
      }

      await regisUser(body);
    }

    return res.status(201).json({ message: "User registered, please login" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { body } = await zParse(loginSchema, req);

    const user = await getUserByEmail(body.email);

    if (user) {
      const comparePass = await bcrypt.compare(
        body.password,
        user.getDataValue("password")
      );

      if (comparePass) {
        const data = await loginUser(user, body.email);

        return res.status(200).json({
          message: "Login successfully",
          payload: { token: data },
        });
      } else if (!comparePass) {
        return res.status(400).json({ message: "Invalid password" });
      }
    }

    return res
      .status(400)
      .json({ message: "User not found, you must register first" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
