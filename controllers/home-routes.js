const router = require('express').Router();
const withAuth = require('../utils/auth');
const path = require('path');

router.get('/', withAuth, (req,res) => {
   res.sendFile(path.join(__dirname, '../public/home.html'));
});

router.get('/login', (req,res) => {
        res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.get('/office', withAuth, (req,res) => {
        res.sendFile(path.join(__dirname, '../public/office.html'));
});

router.get('/warehouse', withAuth, (req,res) => {
        res.sendFile(path.join(__dirname, '../public/warehouse.html'));
});

router.get('/request', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/request.html'));
});

module.exports = router;