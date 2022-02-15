const router = require('express').Router();
const withAuth = require('../utils/auth');
const path = require('path');



router.get("/", withAuth, (req, res) => {
  res.render("homepage", {
    loggedIn: req.session.loggedIn,
  });
});

router.get('/login', (req,res) => {
    res.render('login');
 });

router.get('/office', withAuth, (req,res) => {
        res.render('office', {
           loggedIn: req.session.loggedIn, 
   });
});

router.get('/warehouse', withAuth, (req,res) => {
        res.render("warehouse", {
          loggedIn: req.session.loggedIn,
        });
});

router.get("/completed", withAuth, (req, res) => {
  res.render("completed", {
    loggedIn: req.session.loggedIn,
  });
});

router.get('/request', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/request.html'));
});

module.exports = router;