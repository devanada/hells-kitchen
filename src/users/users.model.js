module.exports = (sequelize, Sequelize) => {
  const users = sequelize.define("users", {
    first_name: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    last_name: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
      defaultValue:
        "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    },
    token: {
      type: Sequelize.STRING,
    },
  });

  return users;
};
