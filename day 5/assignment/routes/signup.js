const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/',(req,res)=> {

    var username = req.body.username;
    var password = req.body.password;
    
    const saltRounds = 12;
    
    bcrypt.hash(password, saltRounds, function(err, hash) {
        if(err){
            console.log(err)
            res.writeHead(500,{'Content-Type':'text/html'});
            res.end(err);
        }
        else{
            res.send(`Hey ${username} your hashed password is ${hash}`);
        }
    });
});

module.exports = router;
