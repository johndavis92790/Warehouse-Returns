const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Return extends Model {}

Return.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    part_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // date: {
    //   type: DataTypes.DATEONLY,
    //   createdAt: sequelize.DATE,
    // },
    reason_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "reason",
        key: "id",
      }
    },
    condition_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "condition",
        key: "id",
      }
    },
    // receive_date: {
    //   type: DataTypes.DATEONLY,
    // },
    customer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "customer",
        key: "id",
      }
    },
    notes: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    // timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "return",
  }
);

module.exports = Return;
