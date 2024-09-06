const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

const initialize = async () => {
  await sequelize
    .authenticate()
    .then(() => {
      console.log("Connected to the MySQL database using Sequelize!");
    })
    .catch((err) => {
      console.error("Error connecting to the MySQL database:", err.message);
    });
};
initialize();

module.exports = sequelize;
