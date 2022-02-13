const { Return } = require("../models");

const returnData = [
  {
    part_number: "1234TEST",
    quantity: 1,
    reason_id: 1,
    customer_name: "Test Company",
    customer_address: "123 Fake St.",
    customer_phone: "801-123-4567",
    customer_email: "email@email.com",
    notes: "This is a test",
    credit: false,
    request_date: "2022-02-12",
    condition_id: 1,
    action_id: 2,
  },
  {
    part_number: "5678TEST",
    quantity: 1,
    reason_id: 1,
    customer_name: "Test Company2",
    customer_address: "1234 Fake St.",
    customer_phone: "801-123-4567",
    customer_email: "email2@email.com",
    notes: "This is a test2",
    credit: false,
    request_date: "2022-02-13",
    condition_id: null,
    action_id: 4,
  },
];

const seedReturns = () => Return.bulkCreate(returnData);

module.exports = seedReturns;
