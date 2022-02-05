const router = require('express').Router();

const returnRoutes = require('./return-routes.js');
const customerRoutes = require('./customer-routes.js');
const reasonRoutes = require('./reason-routes.js');
const conditionRoutes = require('./condition-routes.js');

router.use('/return', returnRoutes);
router.use('/customer', customerRoutes);
router.use('/reason', reasonRoutes);
router.use('/condition', conditionRoutes);

module.exports = router;