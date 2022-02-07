const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const warehouseRoutes = require('./warehouse-routes.js');
//const officeRoutes = require('./office-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// router.use('/warehouse', warehouseRoutes);
//router.use('/office', officeRoutes);

module.exports = router;
