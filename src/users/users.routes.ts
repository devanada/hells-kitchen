import express from "express";

import { userGet, userUpdate, userDelete, listUsers } from "./users.controller";
import verifyToken from "../utils/middlewares/auth";
import upload from "../utils/configs/multer";

const router = express.Router();

router
  .route("/users")
  .get(listUsers)
  .put(verifyToken, upload.single("image"), userUpdate)
  .delete(verifyToken, userDelete);
router.get("/users/:username", userGet);

export default router;
