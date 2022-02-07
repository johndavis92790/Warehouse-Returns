// import all models
const Customer = require("./Customer");
const Reason = require("./Reason");
const Return = require("./Return");
const Condition = require("./Condition");
const User = require("./User");

// create associations
Return.belongsTo(Customer, {
  foreignKey: "customer_id",
});

Return.belongsTo(Reason, {
  foreignKey: "reason_id",
});

Return.belongsTo(Condition, {
  foreignKey: "condition_id",
});

module.exports = { Customer, Reason, Return, Condition, User };
