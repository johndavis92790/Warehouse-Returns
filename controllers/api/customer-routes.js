const router = require('express').Router();
const { Customer } = require('../../models');
// const withAuth = require("../../utils/auth");

router.get('/', (req, res) => {
  Customer.findAll()
    .then((dbCustomerData) => res.json(dbCustomerData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
