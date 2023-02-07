import jsonwebtoken from "jsonwebtoken";
import { Request } from "express";
import bcrypt from "bcryptjs";

import { bodyType } from "../utils/types/user.type";
import Users from "../users/users.model";

export const regisUser = async (req: Request) => {
  const { first_name, last_name, email, password }: bodyType = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  const object = {
    first_name,
    last_name,
    email: email.toLowerCase(),
    password: encryptedPassword,
  };
  const user: any = await Users.create(object);

  const token = jsonwebtoken.sign(
    { user_id: user.id, email },
    process.env.TOKEN_KEY as string,
    {
      expiresIn: "2h",
    }
  );
  user.token = token;
  return user;
};

export const loginUser = async (data: any, email: string) => {
  const token = jsonwebtoken.sign(
    { user_id: data.id, email },
    process.env.TOKEN_KEY as string,
    {
      expiresIn: "2h",
    }
  );

  return token;
};

export const getUserByEmail = async (req: Request) => {
  const { email }: bodyType = req.body;

  const user = await Users.findOne({ where: { email } });

  return user;
};
