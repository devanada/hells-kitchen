import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

import Users from "../users/users.model";
import { RegistSchema } from "./auth.types";

export const regisUser = async (body: RegistSchema) => {
  const { email, password } = body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  const object = {
    ...body,
    email: email.toLowerCase(),
    password: encryptedPassword,
  };

  const user = await Users.create(object);

  return user;
};

export const loginUser = async (data: any, email: string) => {
  const token = jsonwebtoken.sign(
    { user_id: data.id, email, role: data.role },
    process.env.TOKEN_KEY as string,
    {
      expiresIn: "2h",
    }
  );

  return token;
};

export const getUserByEmail = async (email: string, paranoid: boolean) => {
  const user = await Users.findOne({ where: { email }, paranoid: paranoid });

  return user;
};
