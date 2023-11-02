import { Request, Response } from "express";

import {
  getUserByUname,
  updateUserByUname,
  deleteUserByUname,
  getListUsers,
} from "./users.model";

export const listUsers = async (req: Request, res: Response) => {
  // try {
  //   const data = await getListUsers();
  //   if (data) {
  //     return res.status(200).json({ message: "Data found", data });
  //   } else {
  //     return res.status(404).json({ message: "No data found" });
  //   }
  // } catch (err: any) {
  //   return res.status(500).json({ message: err.message });
  // }
};

export const userGet = async (req: Request, res: Response) => {
  // try {
  //   const data = await getUserByUname(req);
  //   if (data) {
  //     return res.status(200).json({ message: "User found", payload: data });
  //   } else {
  //     return res.status(404).json({ message: "User not found" });
  //   }
  // } catch (err: any) {
  //   return res.status(500).json({ message: err.message });
  // }
};

export const userUpdate = async (req: Request, res: Response) => {
  // try {
  //   const data = await updateUserByUname(req);
  //   if (data) {
  //     return res.status(200).json({
  //       message: "User updated successfully",
  //     });
  //   } else {
  //     return res
  //       .status(400)
  //       .json({ message: "Failed to update user, username already exist" });
  //   }
  // } catch (err: any) {
  //   return res.status(500).json({ message: err.message });
  // }
};

export const userDelete = async (req: Request, res: Response) => {
  // try {
  //   const data = await deleteUserByUname(req);
  //   if (data) {
  //     return res.status(200).json({ message: "User deleted successfully" });
  //   } else {
  //     return res
  //       .status(400)
  //       .json({ message: "Failed to delete user, user not found" });
  //   }
  // } catch (err: any) {
  //   return res.status(500).json({ message: err.message });
  // }
};
