const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcrypt");
class Time extends Model {};

Time.init(
    {
        nome: {
            type: DataTypes.STRING,
            unique: true,
        },
        cidadeEstado: DataTypes.STRING,
    },
    {
        sequelize,
        modelName: "Time",
        tableName: "times",
    }
);

module.exports = Time;