// import all models
const Customer = require("./Customer");
const Reason = require("./Reason");
const Return = require("./Return");
const Condition = require("./Condition");

// create associations
Customer.hasMany(Return, {
  foreignKey: "customer_id",
});

Reason.hasMany(Return, {
  foreignKey: "reason_id",
});

Condition.hasMany(Return, {
  foreignKey: "condition_id",
});

module.exports = { Customer, Reason, Return, Condition };
