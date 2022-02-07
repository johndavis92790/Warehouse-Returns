const { Return } = require("../models");

const returnData = [
  {
    part_number: "1234",
    quantity: 1,
    reason_id: 1,
    condition_id: 1,
    customer_id: 1,
    notes: "This is a test"
  },
  {
    part_number: "5678",
    quantity: 2,
    reason_id: 2,
    condition_id: null,
    customer_id: 2,
    notes: "This is a test 2"
  },
];

const seedReturns = () => Return.bulkCreate(returnData);

module.exports = seedReturns;
