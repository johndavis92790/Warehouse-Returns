const router = require("express").Router();
const { Op } = require("sequelize");
const { Return, Reason, Condition, Customer } = require("../../models");
// const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  Return.findAll()
    .then((dbReturnData) => res.json(dbReturnData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
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

router.get("/warehouse-returns", (req, res) => {
  Return.findAll({
    where: {
      condition_id: {
        [Op.is]: null
      }
    },
  })
    .then((dbReturnData) => res.json(dbReturnData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get("/office-returns", (req, res) => {
  Return.findAll({
    where: {
      condition_id: {
        [Op.not]: null,
      }
    },
  })
    .then((dbReturnData) => res.json(dbReturnData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/completed-returns", (req, res) => {
  Return.findAll({
    where: {
      condition_id: {
        [Op.not]: null,
      }
    },
  })
    .then((dbReturnData) => res.json(dbReturnData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  const obj = req.body;
  console.log("test", obj);
  Return.create({
    part_number: obj.partNumber,
    quantity: obj.quantity,
    reason_id: obj.reason,
    condition_id: obj.condition,
    customer_id: obj.customer,
    notes: obj.notes,
  })
    .then((dbReturnData) => {
      // req.session.save(() => {
      //   req.session.user_id = dbUserData.id;

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
