const { Condition } = require("../models");

const conditionData = [
  {
    name: "Unopened",
  },
  {
    name: "Opened but OK",
  },
  {
    name: "Missing Parts (list in notes section)",
  },
  {
    name: "Damaged (scratched)",
  },
  {
    name: "Damaged (dented)",
  },
  {
    name: "Installed but OK",
  },
  {
    name: "Used",
  },
  {
    name: "Missing Box",
  }
];

const seedConditions = () => Condition.bulkCreate(conditionData);

module.exports = seedConditions;
