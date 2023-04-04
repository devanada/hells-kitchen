import jsonwebtoken from "jsonwebtoken";
import { Request } from "express";
import bcrypt from "bcryptjs";

import { BodyType } from "../utils/types/user.type";
import Users from "../users/users.model";

export const regisUser = async (req: Request) => {
  const { first_name, last_name, username, password }: BodyType = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  const object = {
    first_name,
    last_name,
    username: username.toLowerCase(),
    password: encryptedPassword,
  };
  // TODO: Change any to proper types
  const user: any = await Users.create(object);

  const token = jsonwebtoken.sign(
    { user_id: user.id, username },
    process.env.TOKEN_KEY as string,
    {
      expiresIn: "2h",
    }
  );
  user.token = token;
  return user;
};

export const loginUser = async (data: any, username: string) => {
  const token = jsonwebtoken.sign(
    { user_id: data.id, username },
    process.env.TOKEN_KEY as string,
    {
      expiresIn: "2h",
    }
  );

  return token;
};

export const getUserByUname = async (username: string) => {
  const user = await Users.findOne({ where: { username, deletedAt: null } });

  return user;
};
