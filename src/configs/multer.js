const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { v2 } = require("cloudinary");
const multer = require("multer");

const storage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: "DEV",
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb({ message: "Only jpeg and png files are allowed" }, false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter,
});

module.exports = upload;
