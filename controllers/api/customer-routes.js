const router = require('express').Router();
const { Customer } = require('../../models');

// these routes not currently used, maybe will be integrated in the future
// get all customers
router.get('/', (req, res) => {
  Customer.findAll()
    .then((dbCustomerData) => res.json(dbCustomerData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
