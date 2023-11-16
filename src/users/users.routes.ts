import express from "express";

import { userGet, userUpdate, userDelete } from "./users.controller";
import { verifyToken } from "../utils/middlewares/auth";
import upload from "../utils/configs/multer";

const router = express.Router();

router
  .route("/users")
  .get(
    (req, res, next) => verifyToken(req, res, next, ["user", "admin"]),
    userGet
  )
  .put(
    (req, res, next) => verifyToken(req, res, next, ["user", "admin"]),
    upload.single("profile_picture"),
    userUpdate
  )
  .delete(
    (req, res, next) => verifyToken(req, res, next, ["user", "admin"]),
    userDelete
  );

export default router;
