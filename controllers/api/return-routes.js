const router = require("express").Router();
const { Return } = require("../../models");
// const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  Return.findAll()
    .then((dbReturnData) => res.json(dbReturnData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
