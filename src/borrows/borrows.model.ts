import { DataTypes, Includeable, Op, Order, WhereOptions } from "sequelize";
import { Request } from "express";
import dayjs from "dayjs";

import sequelize from "../utils/configs/database";
import { QuerySchema } from "../utils/types/type";
import { BorrowPayload, BorrowSchema } from "./borrows.types";
import { getPagination, getPagingData } from "../utils/formatter/api";
import Users from "../users/users.model";
import Books from "../books/books.model";

const Borrows = sequelize.define(
  "borrows",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    borrow_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    return_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    paranoid: true,
    timestamps: true,
  }
);

Borrows.belongsTo(Users);
Borrows.belongsTo(Books);

sequelize
  .sync()
  .then(() => {
    console.log("Borrows table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table:", error);
  });

export const getBorrows = async (req: Request, query: QuerySchema) => {
  let order: Order = [];
  let where: WhereOptions<any> = {};
  let include: Includeable[] = [
    { model: Books, as: "book", attributes: ["id", "title", "cover_image"] },
  ];

  if (query.query) {
    where = {
      [Op.or]: [
        { "$user.full_name$": { [Op.iLike]: `%${query.query}%` } },
        { "$book.title$": { [Op.iLike]: `%${query.query}%` } },
      ],
    };
  }

  if (req.token.role === "user") {
    where = {
      ...where,
      userId: req.token.user_id,
    };
  } else {
    include.push({
      model: Users,
      as: "user",
      attributes: ["id", "full_name"],
    });
  }

  if (query.sort === "New") {
    order.push(["createdAt", "DESC"]);
  } else {
    order.push(["id", "ASC"]);
  }

  const { limit, offset } = getPagination(+query.page, +query.limit);

  const response = await Borrows.findAndCountAll({
    where,
    order,
    limit,
    offset,
    include,
    attributes: {
      exclude: ["userId", "bookId", "createdAt", "updatedAt", "deletedAt"],
    },
  });
  const result = getPagingData(response, +query.page, limit);

  return result;
};

export const createBorrow = async (req: Request, body: BorrowPayload) => {
  let newBody = [];

  for (const id of body.bookId) {
    const data = {
      userId: req.token.user_id,
      bookId: id,
      borrow_date: body.borrow_date,
      due_date: dayjs(body.borrow_date).add(7, "day").toString(),
    };
    newBody.push(data);
  }

  const result = await Borrows.bulkCreate(newBody);

  return result;
};

export const getBorrowById = async (req: Request) => {
  const { params, token } = req;
  let where: WhereOptions<any> = {
    id: params.id_borrow,
  };

  if (token.role === "user") {
    where.userId = token.user_id;
  }

  const result = await Borrows.findOne({
    where,
    attributes: {
      exclude: ["createdAt", "updatedAt", "deletedAt"],
    },
  });

  return result;
};

export const updateBorrowById = async (req: Request, body: BorrowSchema) => {
  const result = await Borrows.update(body, {
    where: {
      id: req.params.id_borrow,
    },
  });

  return result;
};

export const deleteBorrowById = async (id: string) => {
  const result = await Borrows.destroy({
    where: {
      id: id,
    },
  });

  return result;
};

export default Borrows;
