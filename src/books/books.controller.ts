import { Request, Response } from "express";

import {
  getBooks,
  getBookById,
  postBook,
  updateBookById,
  deleteBookById,
} from "./books.model";
import { bookSchema } from "./books.types";
import { nonBodySchema, bodySchema } from "../utils/types/type";
import { zParse } from "../utils/zParse";

export const getListBooks = async (req: Request, res: Response) => {
  try {
    const { query } = await zParse(nonBodySchema, req);

    const data = await getBooks(query);
    if (data) {
      return res.status(200).json({ message: "Books found.", payload: data });
    } else {
      return res.status(404).json({ message: "No books found." });
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const getDetailBook = async (req: Request, res: Response) => {
  try {
    const data = await getBookById(req.params.id_book);

    if (data) {
      return res.status(200).json({ message: "Book found.", payload: data });
    } else {
      return res.status(404).json({ message: "No book found." });
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const { query, body } = await zParse(bodySchema(bookSchema), req);

    if (query.overwrite === "true") {
      const data = await postBook(req, body);

      if (!data) {
        return res.status(400).json({ message: "Failed to create a book." });
      }
    }

    return res.status(201).json({ message: "Successfully added a book." });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { query, body } = await zParse(bodySchema(bookSchema), req);

    const isBookFound = await getBookById(req.params.id_book);

    if (!isBookFound) {
      return res.status(404).json({ message: "No books found." });
    }

    if (query.overwrite === "true") {
      const isUpdated = await updateBookById(req, body);

      if (!isUpdated) {
        return res.status(400).json({ message: "Failed to update a book." });
      }
    }

    return res.status(200).json({
      message: "Book updated successfully.",
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { query } = await zParse(nonBodySchema, req);

    const isBookFound = await getBookById(req.params.id_book);

    if (!isBookFound) {
      return res.status(404).json({ message: "No books found." });
    }

    if (query.overwrite === "true") {
      const isDeleted = await deleteBookById(req.params.id_book);

      if (!isDeleted) {
        return res.status(400).json({ message: "Failed to delete a book." });
      }
    }

    return res.status(200).json({
      message: "Book deleted successfully.",
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
