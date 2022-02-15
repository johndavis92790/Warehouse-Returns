const router = require('express').Router();
const withAuth = require('../utils/auth');
const path = require('path');



router.get('/', (req, res) => {
      res.render('homepage', {
           loggedIn: req.session.loggedIn
   });
});

// router.get('/', (req,res) => {
//    res.sendFile(path.join(__dirname, '../public/home.html'));
// });

router.get('/login', (req,res) => {
    res.render('login');
 });
        

// router.get('/login', (req,res) => {
//         res.sendFile(path.join(__dirname, '../public/login.html'));
// });

router.get('/office', (req,res) => {
        res.render('office');
});

// router.get('/office', (req,res) => {
//         res.sendFile(path.join(__dirname, '../public/office.html'));
// });

router.get('/warehouse', (req,res) => {
        res.render('warehouse');
});

// router.get('/warehouse', (req,res) => {
//         res.sendFile(path.join(__dirname, '../public/warehouse.html'));
// });

router.get("/completed", (req, res) => {
  res.render("completed");
});

router.get('/request', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/request.html'));
});

module.exports = router;