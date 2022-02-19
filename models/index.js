// import all models
const Customer = require("./Customer");
const Reason = require("./Reason");
const Return = require("./Return");
const Condition = require("./Condition");
const User = require("./User");
const Action = require("./Action");

// create associations
Return.belongsTo(Reason, {
  foreignKey: "reason_id",
});

Return.belongsTo(Condition, {
  foreignKey: "condition_id",
});

Return.belongsTo(Action, {
  foreignKey: "action_id",
});

module.exports = { Customer, Reason, Return, Condition, User, Action };
