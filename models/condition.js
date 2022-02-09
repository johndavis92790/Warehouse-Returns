const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Condition extends Model {}

Condition.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "condition",
  }
);

module.exports = Condition;
