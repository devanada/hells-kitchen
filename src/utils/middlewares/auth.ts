import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const config = process.env;

const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
  role: string[]
) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(400).json({
      message: "Unauthorized, a token is required for authentication.",
    });
  }

  try {
    const bearer = token.split(" ");
    const bearerToken = bearer[1];
    const decoded: any = jwt.verify(bearerToken, config.TOKEN_KEY as string);
    req.token = decoded;
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized, you need to login first." });
  }

  if (!role.includes(req.token.role)) {
    return res
      .status(401)
      .json({ message: "You have no permission to access this." });
  }

  return next();
};

export { verifyToken };
