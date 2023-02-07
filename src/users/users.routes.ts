import express from "express";

import { userGet, userUpdate, userDelete } from "./users.controller";
import verifyToken from "../utils/middlewares/auth";
import upload from "../utils/configs/multer";

const router = express.Router();

router
  .route("/profile")
  .get(verifyToken, userGet)
  .put(verifyToken, upload.single("image"), userUpdate)
  .delete(verifyToken, userDelete);

export default router;
