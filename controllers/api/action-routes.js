const router = require("express").Router();
const { Action } = require("../../models");

// get all actions
router.get("/", (req, res) => {
  Action.findAll()
    .then((dbActionData) => res.json(dbActionData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
