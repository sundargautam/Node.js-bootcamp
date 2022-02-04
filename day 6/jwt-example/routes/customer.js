import express from 'express';
import fs from 'fs';
import jwtVerify from '../middlewares/jwt.js';

const router = express.Router();

router.put('/',jwtVerify,(req,res)=>{

    let userId= req.query.userId;
    let address = req.body.address;
    let name = req.body.name;

    fs.readFile('./users.json',(err,data)=>{
        if(err){
            res.status(500).send("Could not read file");
        }
        else{
            let jsonObj=[];
            if(data.length>0){
                jsonObj = JSON.parse(data);
            }
            else{
                res.status(404).send("No customer found");
            }
            jsonObj.forEach(customer => {
                if (customer.userId == userId) {
                    customer.address = address;
                    customer.name = name;
                }
            });
            fs.writeFile('./users.json',JSON.stringify(jsonObj),(err)=>{
                if(err){
                    res.status(500).send("Could not write file");
                }
                else{
                    res.status(200).send(`Customer ${name} updated`);
                }
            });
        }
    })
});

export default router;