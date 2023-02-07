import { Request, Response } from "express";

import { getUserByPK, updateUserByPK, deleteUserByPK } from "./users.model";

export const userGet = async (req: Request, res: Response) => {
  try {
    const data = await getUserByPK(req);
    if (data) {
      return res.status(200).json({ message: "User found", data });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const userUpdate = async (req: Request, res: Response) => {
  try {
    const data = await updateUserByPK(req);
    if (data) {
      return res.status(200).json({
        message: "User updated successfully",
      });
    } else {
      return res
        .status(400)
        .json({ code: 400, message: "Failed to update user" });
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const userDelete = async (req: Request, res: Response) => {
  try {
    const data = await deleteUserByPK(req);
    if (data) {
      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res
        .status(400)
        .json({ message: "Failed to delete user, user not found" });
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
