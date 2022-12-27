const express = require("express");
const userControllers = require("./users.controller");
const upload = require("../configs/multer");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/register", userControllers.userSignup);
router.post("/login", userControllers.userLogin);
router
  .route("/profile")
  .get(auth, userControllers.userGet)
  .put(auth, upload.single("image"), userControllers.userUpdate)
  .delete(auth, userControllers.userDelete);

module.exports = router;
