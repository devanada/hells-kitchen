const bcrypt = require("bcryptjs");
const jwtController = require("jsonwebtoken");

const db = require("../configs/database");
const cloudinary = require("../configs/cloudinary");

const Users = db.users;

const userSignup = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!(email && password && first_name && last_name)) {
      return res
        .status(400)
        .json({ code: 400, message: "All input is required." });
    }

    const oldUser = await Users.findOne({ where: { email } });

    if (oldUser) {
      return res
        .status(409)
        .json({ code: 409, message: "User already exist. Please Login" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const object = {
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    };
    const user = await Users.create(object);

    const token = jwtController.sign(
      { user_id: user.id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;

    return res
      .status(200)
      .json({ code: 200, message: "User registered", data: user });
  } catch (err) {
    const errors = err.errors.map((val) => {
      return { message: val.message, path: val.path };
    });
    return res.status(500).json({ code: 500, message: errors });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      return res
        .status(400)
        .json({ code: 400, message: "All input is required" });
    } else if (!email && password) {
      return res.status(400).json({ code: 400, message: "Email is required" });
    } else if (email && !password) {
      return res
        .status(400)
        .json({ code: 400, message: "Password is required" });
    }

    const user = await Users.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwtController.sign(
        { user_id: user.id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;

      return res.status(200).json({
        code: 200,
        message: "Login successfully",
        data: { token: user.token },
      });
    } else if (user && !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ code: 400, message: "Invalid password" });
    }
    return res.status(400).json({ code: 400, message: "Invalid email" });
  } catch (err) {
    return res.status(500).json({ code: 500, message: err.message });
  }
};

const userGet = async (req, res) => {
  try {
    const { user_id } = req.token;
    const user = await Users.findByPk(user_id);
    if (user) {
      return res
        .status(200)
        .json({ code: 200, message: "User found", data: user });
    } else {
      return res.status(404).json({ code: 404, message: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ code: 500, message: err.message });
  }
};

const userUpdate = async (req, res) => {
  try {
    const { user_id } = req.token;
    const { email, password } = req.body;
    let encryptedPassword = "";
    if (password) encryptedPassword = await bcrypt.hash(password, 10);
    let temp = {};
    for (const key in req.body) {
      if (key === "password") temp[key] = encryptedPassword;
      else if (key === "email") temp[key] = email.toLowerCase();
      else temp[key] = req.body[key];
    }
    if (req.file) {
      const { path } = req.file;
      const uploader = async (path) =>
        await cloudinary.uploads(path, "kitchen-sink");
      const newPath = await uploader(path);
      temp.image = newPath.url;
    }

    const user = await Users.update(temp, {
      where: {
        id: user_id,
      },
    });
    if (user) {
      return res.status(200).json({
        code: 200,
        message: "User updated successfully",
      });
    } else {
      return res
        .status(400)
        .json({ code: 400, message: "Failed to update user" });
    }
  } catch (err) {
    return res.status(500).json({ code: 500, message: err.message });
  }
};

const userDelete = async (req, res) => {
  try {
    const { user_id } = req.token;

    const user = await Users.destroy({
      where: {
        id: user_id,
      },
    });
    if (user) {
      return res
        .status(200)
        .json({ code: 200, message: "User deleted successfully" });
    } else {
      return res
        .status(400)
        .json({ code: 400, message: "Failed to delete user, user not found" });
    }
  } catch (err) {
    return res.status(500).json({ code: 500, message: err.message });
  }
};

module.exports = { userSignup, userLogin, userGet, userUpdate, userDelete };
