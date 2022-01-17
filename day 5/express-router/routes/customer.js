const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('This is get request');
});
router.get('/heroCustomer',(req,res)=>{
    res.send('This is heroCustomer get request');
});
router.all('/allCustomer',(req,res)=>{
    res.send(`This is allCustomer ${req.method} request`);
});

module.exports = router;

//get
//post
//put
//delete