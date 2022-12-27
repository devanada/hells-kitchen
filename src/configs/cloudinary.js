// import { v2 as cloudinary } from "cloudinary";
const { v2 } = require("cloudinary");

v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports.uploads = (file, folder) => {
  return new Promise((resolve, reject) => {
    v2.uploader.upload(
      file,
      { resource_type: "auto", folder },
      (error, result) => {
        if (error) {
          reject({ status: "error", message: error.message });
        } else {
          resolve({
            status: "success",
            url: result.url,
            id: result.public_id,
            message: "success",
          });
        }
      }
    );
  });
};
