const router = require('express').Router();
const { Reason } = require('../../models');

// get all return reasons
router.get('/', (req,res) => {
  Reason.findAll()
    .then((dbReasonData) => res.json(dbReasonData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
})

module.exports = router;