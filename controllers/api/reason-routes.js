const router = require('express').Router();
//const Reason = require('../../models');
const reasons = require('../../data/reasons');

router.get('/', (req,res) => {
    let results = reasons;
        res.json(results);
})

module.exports = router;