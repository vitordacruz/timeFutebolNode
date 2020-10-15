const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const Time = require("./Time");
class Jogador extends Model {};

Jogador.init(
    {
        nome: DataTypes.STRING,            
        apelido: DataTypes.STRING,
        id_time: {
            type: DataTypes.INTEGER,
            references: {
              model: Time,
              key: "id",
            },
        },
    },
    {
        sequelize,
        modelName: "Jogador",
        tableName: "jogadores",
    }
);

Jogador.belongsTo(Time, {
    foreignKey: "id_time",
});

module.exports = Jogador;