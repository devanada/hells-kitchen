const Sequelize = require("sequelize");
const { HOST, USER, PASSWORD, DB } = process.env;

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../users/users.model")(sequelize, Sequelize);

module.exports = db;
