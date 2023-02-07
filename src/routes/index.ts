import { Request, Response, NextFunction } from "express";
import express from "express";
import cors from "cors";

import usersRouter from "../users/users.routes";
import authRouter from "../auth/auth.router";

const app = express();
var corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", authRouter);
app.use("/api/v1", usersRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    code: 404,
    message: "No such route exists",
  });
});

export default app;
