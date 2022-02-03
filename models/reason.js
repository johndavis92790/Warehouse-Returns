const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Reason extends Model {}

Reason.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "reason",
  }
);

module.exports = Reason;
