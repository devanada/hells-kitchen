import { v2 as cloudinary } from "cloudinary";
import { Request } from "express";
import multer from "multer";

const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV",
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
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

export default upload;
