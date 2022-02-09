const { Reason } = require("../models");

const reasonData = [
  {
    name: "Lost Sale",
  },
  {
    name: "Customer Never Showed",
  },
  {
    name: "Damaged (Concealed)",
  },
  {
    name: "Damaged (Packaging is damaged also)",
  },
  {
    name: "Duplicate Order",
  },
  {
    name: "Incorrect Part",
  },
  {
    name: "Mislabeled Part",
  },
  {
    name: "Missing Parts (List them in notes section)",
  }
];

const seedReasons = () => Reason.bulkCreate(reasonData);

module.exports = seedReasons;
