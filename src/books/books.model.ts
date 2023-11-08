import { DataTypes, Op, Order, WhereOptions } from "sequelize";
import { Request } from "express";

import sequelize from "../utils/configs/database";
import { QuerySchema, categories } from "../utils/types/type";
import { BookSchema } from "./books.types";
import { getPagination, getPagingData } from "../utils/formatter/api";
const cloudinary = require("../utils/configs/cloudinary");

const Books = sequelize.define(
  "books",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(...categories),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cover_image: {
      type: DataTypes.STRING,
      defaultValue:
        "https://res.cloudinary.com/hypeotesa/image/upload/v1698932145/kitchen-sink/jqlmxqqst1plmouutjhj.png",
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
    console.log("Books table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table:", error);
  });

export const getBooks = async (req: QuerySchema) => {
  let order: Order = [];
  let where: WhereOptions<any> = {};

  if (req.query) {
    where = { ...where, title: { [Op.iLike]: `%${req.query}%` } };
  }

  if (req.sort === "new") {
    order.push(["createdAt", "DESC"]);
  } else {
    order.push(["id", "ASC"]);
  }

  if (req.filter === "featured") {
    order.push(sequelize.random());
    where = { ...where, featured: true };
  }

  const { limit, offset } = getPagination(+req.page, +req.limit);

  const response = await Books.findAndCountAll({
    where,
    order,
    limit,
    offset,
  });
  const result = getPagingData(response, +req.page, limit);

  return result;
};

export const getBookById = async (id: string) => {
  const user = await Books.findOne({
    where: { id },
    attributes: {
      exclude: ["createdAt", "updatedAt", "deletedAt"],
    },
  });

  return user;
};

export const postBook = async (req: Request, body: BookSchema) => {
  let newBody: BookSchema = {
    ...body,
  };

  if (req.file) {
    const { path } = req.file;

    // TODO: Change any to proper types
    const uploader = async (path: any) =>
      await cloudinary.uploads(path, "kitchen-sink");
    const newPath = await uploader(path);

    newBody.cover_image = newPath.url;
  }

  const book = await Books.create(newBody);

  return book;
};

export const updateBookById = async (req: Request, body: BookSchema) => {
  const { id_book } = req.params;

  let newBody: BookSchema = {
    ...body,
  };

  if (req.file) {
    const { path } = req.file;

    // TODO: Change any to proper types
    const uploader = async (path: any) =>
      await cloudinary.uploads(path, "kitchen-sink");
    const newPath = await uploader(path);

    newBody.cover_image = newPath.url;
  }

  const book = await Books.update(newBody, {
    where: {
      id: id_book,
      deletedAt: null,
    },
  });

  return book;
};

export const deleteBookById = async (id: string) => {
  const book = await Books.destroy({
    where: {
      id: id,
    },
  });

  return book;
};

export default Books;
