const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req,res) => {
    if(req.session.loggedIn){
   res.sendFile(path.join(__dirname, './test-htmls/index.html'));
    }
    else{
        res.redirect('/login');
        return;
    }
});

router.get('/login', (req,res) => {
    if(!req.session.loggedIn){
    res.sendFile(path.join(__dirname, './test-htmls/login.html'));
    }
    else{
        res.redirect('/');
        return;
    }
});

router.get('/office', withAuth, (req,res) => {
    if(req.session.loggedIn){
        res.sendFile(path.join(__dirname, './test-htmls/office.html'));
         }
         else{
             res.redirect('/login');
             return;
         }
});

router.get('/warehouse', withAuth, (req,res) => {
    if(req.session.loggedIn){
        res.sendFile(path.join(__dirname, './test-htmls/warehouse.html'));
         }
         else{
             res.redirect('/login');
             return;
         }
});

router.get('/request', (req,res) => {
    res.sendFile(path.join(__dirname, './test-htmls/request.html'));
});

module.exports = router;