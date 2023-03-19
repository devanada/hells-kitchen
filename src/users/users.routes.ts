import express from "express";

import { userGet, userUpdate, userDelete, listUsers } from "./users.controller";
import verifyToken from "../utils/middlewares/auth";
import upload from "../utils/configs/multer";

const router = express.Router();

router.get("/users", listUsers);
router
  .route("/users/:username")
  .get(userGet)
  .put(verifyToken, upload.single("image"), userUpdate)
  .delete(verifyToken, userDelete);

export default router;
