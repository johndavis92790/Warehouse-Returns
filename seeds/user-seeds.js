const sequelize = require("../config/connection");
const { User } = require("../models");

const userdata = [
  {
    username: "test1",
    email: "email1@email.com",
    password: "test1",
  },
  {
    username: "test2",
    email: "email2@email.com",
    password: "test2",
  },
];

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = seedUsers;
