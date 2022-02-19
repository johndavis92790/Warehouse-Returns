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
    request_date: {
      type: DataTypes.DATEONLY,
      // 2021-07-06
    },
    condition_date: {
      type: DataTypes.DATEONLY,
    },
    credit_date: {
      type: DataTypes.DATEONLY,
    },
    action_date: {
      type: DataTypes.DATEONLY,
    },
    current_stock: {
      type: DataTypes.INTEGER,
    },
    stock_date: {
      type: DataTypes.DATEONLY,
    },
    stock_corrected: {
      type: DataTypes.BOOLEAN,
    },
    // foreign key for chosen reason
    reason_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "reason",
        key: "id",
      },
    },
    // foreign key for chosen condition
    condition_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "condition",
        key: "id",
      },
    },
    customer_name: {
      type: DataTypes.STRING,
    },
    customer_address: {
      type: DataTypes.STRING,
    },
    customer_phone: {
      type: DataTypes.STRING,
    },
    customer_email: {
      type: DataTypes.STRING,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    credit: {
      type: DataTypes.BOOLEAN,
    },
    // foreign key for chosen action
    action_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "action",
        key: "id",
      },
    },
    // live status of which step this return is currently in
    status: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "return",
  }
);

module.exports = Return;
