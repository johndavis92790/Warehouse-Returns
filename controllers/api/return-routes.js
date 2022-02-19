const router = require("express").Router();
const { Op } = require("sequelize");
const { Return, Reason, Condition, Customer, Action } = require("../../models");

// get all returns
router.get("/", (req, res) => {
  Return.findAll({
    include: [
      {
        model: Reason,
        attributes: ["id", "name"],
      },
      {
        model: Condition,
        attributes: ["id", "name"],
      },
      {
        model: Action,
        attributes: ["id", "name"],
      },
    ],
  })
    .then((dbReturnData) => res.json(dbReturnData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get a specific return
router.get("/:id", (req, res) => {
  Return.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Reason,
        attributes: ["id", "name"],
      },
      {
        model: Condition,
        attributes: ["id", "name"],
      },
      {
        model: Action,
        attributes: ["id", "name"],
      },
    ],
  })
    .then((dbReturnData) => res.json(dbReturnData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a new return process  
router.post("/", (req, res) => {
  console.log("test", req.body);
  Return.create({
    part_number: req.body.part_number,
    quantity: req.body.quantity,
    reason_id: req.body.reason,
    customer_name: req.body.customer_name,
    customer_address: req.body.customer_address,
    customer_phone: req.body.customer_phone,
    customer_email: req.body.customer_email,
    request_date: req.body.request_date,
    notes: req.body.notes,
    status: req.body.status,
  })
    .then((dbReturnData) => {
      res.json(dbReturnData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update any return for any reason
router.put("/:id", (req, res) => {
  console.log("req.params.id", req.params.id);
  Return.update(req.body, {
    where: {
      id: req.params.id,
    },
    individualHooks: true,
  })
    .then((dbReturnData) => {
      if (!dbReturnData) {
        res.status(404).json({ message: "No return found with this id" });
        return;
      }
      res.json(dbReturnData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete any return
router.delete("/:id", (req, res) => {
  Return.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbReturnData) => {
      if (!dbReturnData) {
        res.status(404).json({ message: "No return found with this id" });
        return;
      }
      res.json(dbReturnData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;