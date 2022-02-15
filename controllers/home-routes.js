const router = require('express').Router();
const withAuth = require('../utils/auth');
const path = require('path');



<<<<<<< HEAD
router.get('/', (req, res) => {
      res.render('homepage', {
           loggedIn: req.session.loggedIn
   });
=======
router.get('/', withAuth, (req, res) => {
   res.render('homepage');
>>>>>>> 918d53de8ef976c639e017b5f571500820aaab81
});

router.get('/login', (req,res) => {
    res.render('login');
 });

router.get('/office', withAuth, (req,res) => {
        res.render('office');
});

router.get('/warehouse', withAuth, (req,res) => {
        res.render('warehouse');
});

router.get("/completed", withAuth, (req, res) => {
  res.render("completed");
});

router.get('/request', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/request.html'));
});

module.exports = router;