const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const returnRoutes = require('./return-routes.js');
const customerRoutes = require('./customer-routes.js');
const reasonRoutes = require('./reason-routes.js');
const conditionRoutes = require('./condition-routes.js');
const userRoutes = require("./user-routes.js");

router.use('/return', homeRoutes);
router.use('/return', returnRoutes);
router.use('/customer', customerRoutes);
router.use('/reason', reasonRoutes);
router.use('/condition', conditionRoutes);
router.use("/users", userRoutes);

module.exports = router;