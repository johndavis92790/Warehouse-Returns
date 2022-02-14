const seedActions = require("./action-seeds");
const seedReasons = require("./reason-seeds");
const seedConditions = require("./condition-seeds");
const seedCustomers = require("./customer-seeds");
const seedReturns = require("./return-seeds");
const seedUsers = require("./user-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("--------------");

  await seedUsers();
  console.log("--------------");
  await seedActions();
  console.log("--------------");
  await seedReasons();
  console.log("--------------");
  await seedConditions();
  console.log("--------------");
  await seedCustomers();
  console.log("--------------");
  await seedReturns();
  console.log("--------------");

  process.exit(0);
};

seedAll();
