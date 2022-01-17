const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('This is get request for index');
});
router.post('/',(req,res)=>{
    res.send('This is post request for index');
});
router.put('/',(req,res)=>{
    res.send(`This is put request for index`);
});

router.delete('/',(req,res)=>{
    res.send(`This is delete request for index`);
});

module.exports = router;