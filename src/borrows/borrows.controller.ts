import { Request, Response } from "express";

import {
  getBorrows,
  createBorrow,
  getBorrowById,
  updateBorrowById,
  deleteBorrowById,
} from "./borrows.model";
import { borrowPayload, borrowSchema } from "./borrows.types";
import { nonBodySchema, bodySchema } from "../utils/types/type";
import { zParse } from "../utils/zParse";

export const getListBorrows = async (req: Request, res: Response) => {
  try {
    const { query } = await zParse(nonBodySchema, req);

    const data = await getBorrows(req, query);
    if (data) {
      return res.status(200).json({ message: "Borrows found.", payload: data });
    } else {
      return res.status(404).json({ message: "No borrows found." });
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const postBorrow = async (req: Request, res: Response) => {
  try {
    const { query, body } = await zParse(bodySchema(borrowPayload), req);

    if (query.overwrite === "true") {
      const data = await createBorrow(req, body);

      if (!data) {
        return res.status(400).json({ message: "Failed to borrow a book." });
      }
    }

    return res.status(201).json({
      message:
        "Successfully borrow a book. Please go to librarian to get your book.",
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const getDetailBorrow = async (req: Request, res: Response) => {
  try {
    const data = await getBorrowById(req);

    if (data) {
      return res.status(200).json({ message: "Borrow found.", payload: data });
    } else {
      return res.status(404).json({ message: "No borrow found." });
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const putBorrow = async (req: Request, res: Response) => {
  try {
    const { query, body } = await zParse(bodySchema(borrowSchema), req);

    const isBookFound = await getBorrowById(req);

    if (!isBookFound) {
      return res.status(404).json({ message: "No borrow found." });
    }

    if (query.overwrite === "true") {
      const data = await updateBorrowById(req, body);

      if (!data) {
        return res.status(400).json({ message: "Failed to update a borrow." });
      }
    }

    return res.status(201).json({
      message: "Borrow update successfully",
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { query } = await zParse(nonBodySchema, req);

    const isBookFound = await getBorrowById(req);

    if (!isBookFound) {
      return res.status(404).json({ message: "No borrow found." });
    }

    if (query.overwrite === "true") {
      const isDeleted = await deleteBorrowById(req.params.id_borrow);

      if (!isDeleted) {
        return res.status(400).json({ message: "Failed to delete a borrow." });
      }
    }

    return res.status(200).json({
      message: "Borrow deleted successfully.",
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
