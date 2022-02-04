// create express route
import express from 'express';
import bcrypt from 'bcrypt';
import fs from 'fs';
import jwt from 'jsonwebtoken';
const router = express.Router();

const VERY_SECRET_KEY = 'verysecretkey';

router.post('/',(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;

    fs.readFile('./users.json',(err,data)=>{
        if(err){
            res.status(500).send("Could not read file");
        }
        else{
            let jsonObj=[];
            if(data.length>0){
                jsonObj = JSON.parse(data);
            }
            jsonObj.forEach(customer => {
                if (customer.username == username) {
                    let hashedPassword = customer.password;
                    bcrypt.compare(password, hashedPassword, function(err, result) {
                        if(err){
                            res.status(500).send(err);
                        }
                        else{
                            if(result){
                                delete customer.password;
                                
                                jwt.sign({'id':customer.userId},VERY_SECRET_KEY,{expiresIn:'2h'},(err,token)=>{
                                    if(err){
                                        res.status(500).send(err);
                                    }
                                    else{
                                        res.status(200).send({token:token});
                                    }                                    
                                });
                            }
                            else{
                                res.status(401).send("Wrong password");
                            }
                        }
                    });
                }
            });
        }
    });
});

export default router;
