import { DataTypes } from "sequelize";
import { Request } from "express";
import bcrypt from "bcryptjs";

import sequelize from "../utils/configs/database";
import { UserUpdateSchema } from "./users.types";
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
        "https://res.cloudinary.com/hypeotesa/image/upload/v1698932147/kitchen-sink/yacw1yf1a7hdbh4ucx8u.png",
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

export const getUserByIdToken = async (req: Request) => {
  const { user_id } = req.token;
  const user = await Users.findOne({
    where: { id: user_id, deletedAt: null },
    attributes: {
      exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
    },
  });
  return user;
};

export const updateUserByIdToken = async (
  req: Request,
  body: UserUpdateSchema
) => {
  const { user_id } = req.token;

  const encryptedPassword = await bcrypt.hash(body.password, 10);

  let newBody: UserUpdateSchema = {
    ...body,
    email: body.email.toLowerCase(),
    password: encryptedPassword,
  };

  if (req.file) {
    const { path } = req.file;

    // TODO: Change any to proper types
    const uploader = async (path: any) =>
      await cloudinary.uploads(path, "kitchen-sink");
    const newPath = await uploader(path);

    newBody.profile_picture = newPath.url;
  }

  const user = await Users.update(newBody, {
    where: {
      id: user_id,
      deletedAt: null,
    },
  });

  return user;
};

export const deleteUserByIdToken = async (req: Request) => {
  const { user_id } = req.token;

  const user = await Users.destroy({
    where: {
      id: user_id,
    },
  });

  return user;
};

export default Users;
