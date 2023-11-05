import express from "express";

import {
  getListBorrows,
  postBorrow,
  getDetailBorrow,
  putBorrow,
  deleteBook,
} from "./borrows.controller";
import { verifyToken, verifyAndProtect } from "../utils/middlewares/auth";

const router = express.Router();

router
  .route("/borrows")
  .get(verifyToken, getListBorrows)
  .post(verifyToken, postBorrow);
router
  .route("/borrows/:id_borrow")
  .get(verifyToken, getDetailBorrow)
  .put(verifyAndProtect, putBorrow)
  .delete(verifyAndProtect, deleteBook);

export default router;
