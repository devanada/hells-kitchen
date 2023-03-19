import { Sequelize } from "sequelize-typescript";

const { HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const sequelize = new Sequelize({
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: HOST,
  dialect: "postgres",
  port: 5432,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err: any) => {
    console.log("database connection failed. exiting now...");
    console.error(err.message);
    process.exit(1);
  });

export default sequelize;
