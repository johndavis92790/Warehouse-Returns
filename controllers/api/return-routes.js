const router = require("express").Router();
const { Op } = require("sequelize");
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

router.get("/warehouse-returns", (req, res) => {
  Return.findAll({
    where: {
      condition_id: {
        [Op.not]: null
      }
    }
  })
    .then((dbReturnData) => res.json(dbReturnData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
