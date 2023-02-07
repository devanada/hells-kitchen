import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { bodyType } from "../utils/types/user.type";
import { loginUser, regisUser, getUserByEmail } from "./auth.model";

export const userSignup = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password }: bodyType = req.body;

    if (!(email && password && first_name && last_name)) {
      return res.status(400).json({ message: "All input is required" });
    }

    const oldUser = await getUserByEmail(req);

    if (oldUser) {
      return res
        .status(409)
        .json({ message: "User already exist, please login" });
    }

    const data = await regisUser(req);

    return res.status(201).json({ message: "User registered", data });
  } catch (err: any) {
    const errors = err.errors.map((val: any) => {
      return { message: val.message, path: val.path };
    });
    return res.status(500).json({ message: errors });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password }: bodyType = req.body;

    if (!email && !password) {
      return res.status(400).json({ message: "All input is required" });
    } else if (!email && password) {
      return res.status(400).json({ message: "Email is required" });
    } else if (email && !password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user: any = await getUserByEmail(req);

    if (user && (await bcrypt.compare(password, user.password))) {
      const data = await loginUser(user, email);

      return res.status(200).json({
        message: "Login successfully",
        data: { token: data },
      });
    } else if (user && !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid password" });
    }
    return res.status(400).json({ message: "Invalid email" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
