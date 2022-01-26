// create express route
import express from 'express';
import fs from 'fs';
import bcrypt from 'bcrypt';
import G from 'glob';

const router = express.Router();

router.post('/',(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;

    let regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/g;
   
    if(password.match(regex)){
        let saltRounds = 10;
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if(err){
                res.status(500).send(err);
            }
            else{
                readFile(res,username,hash);
            }
        });
    }
    else{
        res.status(500).send("Password must contain at least one uppercase letter, one lowercase letter, one number and one special character");
    }
});

function readFile(res,username,hashedPassword) {

    let customerArray =[];

    customerArray.push({
        username:username,
        password:hashedPassword
    })

    fs.readFile('./users.json',(err,data)=>{
        if(err){
            writeFile(customerArray,res);
        }
        else{
            let jsonObj=[];
            if(data.length>0){
                jsonObj = JSON.parse(data);
            }
            let jsonObjNew = jsonObj.find((customer)=>{
                return customer.username == username
            });
            if (jsonObjNew!=undefined) {
                res.writeHead(409,{'Content-Type':'text/html'});
                res.end("The username is already in use");
            }
            else{    
                jsonObj.push(customerArray[0])
                writeFile(jsonObj,res);
            }
        }
    });
}

function writeFile(jsonObj,res) {
    fs.writeFile('./users.json',JSON.stringify(jsonObj),{flag:'w+'},(err)=>{
        if (err) {
            res.status(500).send(err);
        }
        else{
            res.status(200).send('User signed up successfully');
        }
    })
}

export default router;