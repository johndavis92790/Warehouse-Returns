const { Customer } = require("../models");

// these seeds not currently used, maybe will be integrated in the future
const customerData = [
  {
    name: "Test Company",
    address: "123 Fake St.",
    phone: "801-123-4567",
    email: "email@email.com",
  },
  {
    name: "Fake Company",
    address: "124 Fake St.",
    phone: "801-123-4568",
    email: "email2@email.com",
  }
];

const seedCustomers = () => Customer.bulkCreate(customerData);

module.exports = seedCustomers;
