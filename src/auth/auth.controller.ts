import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { bodyType } from "../utils/types/user.type";
import { loginUser, regisUser, getUserByUname } from "./auth.model";

export const userSignup = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, username, password }: bodyType = req.body;

    if (!(username && password && first_name && last_name)) {
      return res.status(400).json({ message: "All input is required" });
    }

    const oldUser = await getUserByUname(username);

    if (oldUser) {
      return res
        .status(409)
        .json({ message: "User already exist, please login" });
    }

    const data = await regisUser(req);

    return res.status(201).json({ message: "User registered", data });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { username, password }: bodyType = req.body;

    if (!username && !password) {
      return res.status(400).json({ message: "All input is required" });
    } else if (!username && password) {
      return res.status(400).json({ message: "Username is required" });
    } else if (username && !password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await getUserByUname(username);

    if (user) {
      const comparePass = await bcrypt.compare(
        password,
        user.getDataValue("password")
      );
      if (comparePass) {
        const data = await loginUser(user, username);

        return res.status(200).json({
          message: "Login successfully",
          data: { token: data },
        });
      } else if (!comparePass) {
        return res.status(400).json({ message: "Invalid password" });
      }
    }
    return res.status(400).json({ message: "Invalid username" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
