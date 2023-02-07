import express from "express";

import { userSignup, userLogin } from "./auth.controller";

const router = express.Router();

router.post("/register", userSignup);
router.post("/login", userLogin);

export default router;
