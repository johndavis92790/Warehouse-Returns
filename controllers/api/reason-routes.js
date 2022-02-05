const router = require('express').Router();
const { Reason } = require('../../models');
// const withAuth = require("../../utils/auth");

router.get('/', (req,res) => {
  Reason.findAll()
    .then((dbReasonData) => res.json(dbReasonData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
})

module.exports = router;