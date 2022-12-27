require("dotenv").config();
const http = require("http");
const app = require("./routes");

const server = http.createServer(app);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const db = require("./configs/database");

db.sequelize
  .sync()
  .then(() => {
    console.log("Successfully connected to database");
    server.listen(port, () => {
      console.log(`Server ready to serve and running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("database connection failed. exiting now...");
    console.error(err.message);
    process.exit(1);
  });
