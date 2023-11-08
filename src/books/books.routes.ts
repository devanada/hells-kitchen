import express from "express";

import {
  getListBooks,
  getDetailBook,
  createBook,
  updateBook,
  deleteBook,
} from "./books.controller";
import { verifyAndProtect } from "../utils/middlewares/auth";
import upload from "../utils/configs/multer";

const router = express.Router();

router
  .route("/books")
  .get(getListBooks)
  .post(verifyAndProtect, upload.single("cover_image"), createBook);
router
  .route("/books/:id_book")
  .get(getDetailBook)
  .put(verifyAndProtect, upload.single("cover_image"), updateBook)
  .delete(verifyAndProtect, deleteBook);

export default router;
