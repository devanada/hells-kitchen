import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports.uploads = (file: any, folder: any) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      { resource_type: "auto", folder },
      (error: any, result: any) => {
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
