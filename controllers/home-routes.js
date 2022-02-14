const router = require('express').Router();


router.get('/', (req, res) => {
    res.render('homepage');
})

router.get('/', (req,res) => {
   res.sendFile(path.join(__dirname, './test-htmls/index.html'));
});

router.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname, './test-htmls/login.html'));
});

router.get('/office', (req,res) => {
    res.sendFile(path.join(__dirname, './test-htmls/office.html'));
});

router.get('/warehouse', (req,res) => {
    res.sendFile(path.join(__dirname, './test-htmls/warehouse.html'));
});

router.get('/request', (req,res) => {
    res.sendFile(path.join(__dirname, './test-htmls/request.html'));
});

module.exports = router;