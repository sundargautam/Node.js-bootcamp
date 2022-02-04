const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/',(req,res)=> {
    var username = req.body.username;
    var hashPassword = req.body.hashPassword;
    var originalPassword = req.body.originalPassword;
    
    bcrypt.compare(originalPassword,hashPassword, function(err, result) {
        if(err){
            console.log(err);
            res.writeHead(500,{'Content-Type':'text/html'});
            res.end(err);
        }
        else{
            if (result) {
                res.send(`Hey ${username} your password matched`);                
            }
            else{ 
                res.send(`Hey ${username} your password did not match`);
            }
        }
    });
});

module.exports = router;
