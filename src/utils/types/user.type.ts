declare module "express-serve-static-core" {
  interface Request {
    token: bodyType;
  }
}

export type bodyType = {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  image: string;
  user_id?: string;
};
