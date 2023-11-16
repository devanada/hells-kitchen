import express from "express";

import {
  getListBorrows,
  postBorrow,
  getDetailBorrow,
  putBorrow,
  deleteBook,
} from "./borrows.controller";
import { verifyToken } from "../utils/middlewares/auth";

const router = express.Router();

router
  .route("/borrows")
  .get(
    (req, res, next) => verifyToken(req, res, next, ["user", "admin"]),
    getListBorrows
  )
  .post((req, res, next) => verifyToken(req, res, next, ["user"]), postBorrow);
router
  .route("/borrows/:id_borrow")
  .get(
    (req, res, next) => verifyToken(req, res, next, ["user", "admin"]),
    getDetailBorrow
  )
  .put((req, res, next) => verifyToken(req, res, next, ["admin"]), putBorrow)
  .delete(
    (req, res, next) => verifyToken(req, res, next, ["admin"]),
    deleteBook
  );

export default router;
