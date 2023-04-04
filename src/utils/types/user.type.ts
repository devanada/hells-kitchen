import { DataTypes, Model, Optional } from "sequelize";
declare module "express-serve-static-core" {
  interface Request {
    token: BodyType;
  }
}

export interface BodyType {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  image: string;
  user_id?: string;
}

interface User {
  id: number;
  image: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
}

export interface UserInput extends Optional<User, "id"> {}
export interface UserOutput extends Required<User> {}
