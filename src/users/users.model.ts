import { DataTypes } from "sequelize";
import { Request } from "express";
import bcrypt from "bcryptjs";

import sequelize from "../utils/configs/database";
const cloudinary = require("../utils/configs/cloudinary");

const Users = sequelize.define(
  "users",
  {
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
    },
    profile_picture: {
      type: DataTypes.STRING,
      defaultValue:
        "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
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
  // const user = await Users.findAll({
  //   where: { deletedAt: null },
  //   attributes: {
  //     exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
  //   },
  // });
  // return user;
};

export const getUserByUname = async (req: Request) => {
  // const { id } = req.token;
  // const user = await Users.findOne({
  //   where: { id, deletedAt: null },
  //   attributes: {
  //     exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
  //   },
  // });
  // return user;
};

export const updateUserByUname = async (req: Request) => {
  // const { email: uname } = req.token;
  // const { username, password } = req.body;
  // if (username) {
  //   const checkIfExist = await getUserByUname(username);
  //   if (checkIfExist) return null;
  // }
  // let encryptedPassword = "";
  // if (password) encryptedPassword = await bcrypt.hash(password, 10);
  // let temp: typeof req.body = {};
  // for (const key in req.body) {
  //   if (key === "password") temp[key] = encryptedPassword;
  //   else if (key === "username") temp[key] = username.toLowerCase();
  //   else temp[key] = req.body[key];
  // }
  // if (req.file) {
  //   const { path } = req.file;
  //   // TODO: Change any to proper types
  //   const uploader = async (path: any) =>
  //     await cloudinary.uploads(path, "kitchen-sink");
  //   const newPath = await uploader(path);
  //   temp.image = newPath.url;
  // }
  // const user = await Users.update(temp, {
  //   where: {
  //     username: uname,
  //     deletedAt: null,
  //   },
  // });
  // return user;
};

export const deleteUserByUname = async (req: Request) => {
  // const { id } = req.token;
  // const user = await Users.destroy({
  //   where: {
  //     id: id,
  //   },
  // });
  // return user;
};

export default Users;
