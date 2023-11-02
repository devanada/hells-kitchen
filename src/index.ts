require("dotenv").config();
import http from "http";

import routes from "./routes";

declare module "express-serve-static-core" {
  interface Request {
    token: {
      user_id: number;
      role: string;
    };
  }
}

const server = http.createServer(routes);

const { API_PORT } = process.env;
const port = process.env.PORT ?? API_PORT;

server.listen(port, () => {
  console.log(`Server ready to serve and running on port ${port}`);
});
