const { Action } = require("../models");

const actionData = [
  {
    name: "Put Away and Count Stock",
  },
  {
    name: "Throw Away/Scrap",
  },
  {
    name: "Return to Manufacturer",
  },
  {
    name: "Return to Customer",
  },
  {
    name: "Meyers Return",
  },
  {
    name: "Keystone Return",
  },
];

const seedActions = () => Action.bulkCreate(actionData);

module.exports = seedActions;
