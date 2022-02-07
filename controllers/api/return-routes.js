const router = require("express").Router();
const { Op } = require("sequelize");
const { Return, Reason, Condition, Customer } = require("../../models");
// const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  if (req.headers.query === "warehouse") {
    Return.findAll({
      where: {
        condition_id: null,
      },
    })
      .then((dbReturnData) => res.json(dbReturnData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  } else if (req.headers.query === "office") {
    Return.findAll({
      where: {
        condition_id: {
          [Op.not]: null,
        },
      },
    })
      .then((dbReturnData) => res.json(dbReturnData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
  // else if (req.headers.query === "completed") {
  //   Return.findAll({
  //     where: {
  //       condition_id: {
  //         [Op.not]: null,
  //       },
  //       credit: {
  //         [Op.not]: null,
  //       },
  //     },
  //   })
  //     .then((dbReturnData) => res.json(dbReturnData))
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  // }
});

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
        model: Customer,
        attributes: ["id", "name", "address", "phone", "email"],
      },
    ],
  })
    .then((dbReturnData) => res.json(dbReturnData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  console.log("test", req.body);
  Return.create({
    part_number: req.body.partNumber,
    quantity: req.body.quantity,
    reason_id: req.body.reason,
    condition_id: req.body.condition,
    customer_id: req.body.customer,
    notes: req.body.notes,
  })
    .then((dbReturnData) => {
      // req.session.save(() => {
        // req.session.user_id = dbUserData.id;
  // res.json(obj);
      res.json(dbReturnData);
      // });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  Return.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
    condition_id: req.body.condition,
    notes: req.body.notes,
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
