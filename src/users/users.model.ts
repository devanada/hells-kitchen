import { DataTypes } from "sequelize";
import { Request } from "express";
import bcrypt from "bcryptjs";

import sequelize from "../utils/configs/database";
const cloudinary = require("../utils/configs/cloudinary");

const Users = sequelize.define(
  "users",
  {
    first_name: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    last_name: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue:
        "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    },
  },
  {
    paranoid: true,
    timestamps: true,
  }
);

sequelize
  .sync()
  .then(() => {
    console.log("Users table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table:", error);
  });

export const getUserByPK = async (req: Request) => {
  const { user_id } = req.token;
  const user = await Users.findByPk(user_id);
  return user;
};

export const updateUserByPK = async (req: Request) => {
  const { user_id } = req.token;
  const { email, password } = req.body;
  let encryptedPassword = "";
  if (password) encryptedPassword = await bcrypt.hash(password, 10);
  let temp: typeof req.body = {};
  for (const key in req.body) {
    if (key === "password") temp[key] = encryptedPassword;
    else if (key === "email") temp[key] = email.toLowerCase();
    else temp[key] = req.body[key];
  }
  // temp.updatedAt = new Date();
  if (req.file) {
    const { path } = req.file;
    const uploader = async (path: any) =>
      await cloudinary.uploads(path, "kitchen-sink");
    const newPath = await uploader(path);
    temp.image = newPath.url;
  }

  const user = await Users.update(temp, {
    where: {
      id: user_id,
    },
  });
  return user;
};

export const deleteUserByPK = async (req: Request) => {
  const { user_id } = req.token;

  const user = await Users.destroy({
    where: {
      id: user_id,
    },
  });
  return user;
};

export default Users;
