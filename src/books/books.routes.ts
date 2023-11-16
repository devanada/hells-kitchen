import express from "express";

import {
  getListBooks,
  getDetailBook,
  createBook,
  updateBook,
  deleteBook,
} from "./books.controller";
import { verifyToken } from "../utils/middlewares/auth";
import upload from "../utils/configs/multer";

const router = express.Router();

router
  .route("/books")
  .get(getListBooks)
  .post(
    (req, res, next) => verifyToken(req, res, next, ["admin"]),
    upload.single("cover_image"),
    createBook
  );
router
  .route("/books/:id_book")
  .get(getDetailBook)
  .put(
    (req, res, next) => verifyToken(req, res, next, ["admin"]),
    upload.single("cover_image"),
    updateBook
  )
  .delete(
    (req, res, next) => verifyToken(req, res, next, ["admin"]),
    deleteBook
  );

export default router;
