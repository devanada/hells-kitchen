import { Optional } from "sequelize";

declare module "express-serve-static-core" {
  interface Request {
    token: BodyType;
  }
}

export interface BodyType {
  full_name: string;
  email: string;
  password: string;
  role: string;
  profile_picture: string;
  address: string;
  phone_number: string;
  id?: string;
}

interface User {
  id: number;
  full_name: string;
  email: string;
  password: string;
  role: string;
  profile_picture: string;
  address: string;
  phone_number: string;
  updatedAt?: string;
  createdAt?: string;
  deletedAt?: string;
}

export interface UserInput extends Optional<User, "id"> {}
export interface UserOutput extends Required<User> {}
