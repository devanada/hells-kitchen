import { Request, Response } from "express";

import {
  getUserByIdToken,
  updateUserByIdToken,
  deleteUserByIdToken,
} from "./users.model";

import { zParse } from "../utils/zParse";
import { userDeleteSchema, userUpdateSchema } from "./users.types";

export const userGet = async (req: Request, res: Response) => {
  try {
    const data = await getUserByIdToken(req);
    if (data) {
      return res.status(200).json({ message: "User found.", payload: data });
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const userUpdate = async (req: Request, res: Response) => {
  try {
    const { query, body } = await zParse(userUpdateSchema, req);

    if (query.overwrite === "true") {
      const data = await updateUserByIdToken(req, body);

      if (!data) {
        return res.status(400).json({ message: "Failed to update user." });
      }
    }

    return res.status(200).json({
      message: "User updated successfully.",
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const userDelete = async (req: Request, res: Response) => {
  try {
    const { query } = await zParse(userDeleteSchema, req);

    if (query.overwrite === "true") {
      const data = await deleteUserByIdToken(req);

      if (!data) {
        return res
          .status(400)
          .json({ message: "Failed to delete user, user not found." });
      }
    }

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
