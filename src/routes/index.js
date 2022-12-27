const express = require("express");
const cors = require("cors");

const usersRouter = require("../users/users.routes");

const app = express();
var corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", usersRouter);

app.use((req, res, next) => {
  return res.status(404).json({
    code: 404,
    message: "No such route exists",
  });
});

module.exports = app;
