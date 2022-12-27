const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({
      code: 403,
      message: "A token is required for authentication",
    });
  }
  try {
    const bearer = token.split(" ");
    const bearerToken = bearer[1];
    const decoded = jwt.verify(bearerToken, config.TOKEN_KEY);
    req.token = decoded;
  } catch (err) {
    return res.status(401).json({ code: 401, message: "Invalid Token" });
  }
  return next();
};

module.exports = verifyToken;
