const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  username: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

module.exports = sequelize;