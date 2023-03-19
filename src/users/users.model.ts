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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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

export const getListUsers = async () => {
  const user = await Users.findAll({
    where: { deletedAt: null },
    attributes: {
      exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
    },
  });
  return user;
};

export const getUserByUname = async (username: string) => {
  const user = await Users.findOne({
    where: { username, deletedAt: null },
    attributes: {
      exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
    },
  });
  return user;
};

export const updateUserByUname = async (req: Request) => {
  const { username: uname } = req.params;
  const { username, password } = req.body;

  const checkIfExist = await getUserByUname(uname);
  if (!checkIfExist) return null;

  let encryptedPassword = "";
  if (password) encryptedPassword = await bcrypt.hash(password, 10);
  let temp: typeof req.body = {};
  for (const key in req.body) {
    if (key === "password") temp[key] = encryptedPassword;
    else if (key === "username") temp[key] = username.toLowerCase();
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
      username: uname,
      deletedAt: null,
    },
  });
  return user;
};

export const deleteUserByUname = async (req: Request) => {
  const { user_id } = req.token;

  const user = await Users.destroy({
    where: {
      id: user_id,
    },
  });
  return user;
};

export default Users;
