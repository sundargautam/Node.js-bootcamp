const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const customerId = req.query.id;
    const customerName = req.query.name;
    res.send(`This is get request for customer with id: ${customerId} and name: ${customerName}`);
});
router.post('/',(req,res)=>{
    res.send('This is post request for customer');
});
router.put('/',(req,res)=>{
    res.send(`This is put request for customer`);
});

router.delete('/',(req,res)=>{
    res.send(`This is delete request for customer`);
});

module.exports = router;
