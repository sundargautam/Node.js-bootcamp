import express from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';

const router = express.Router();

const VERY_SECRET_KEY = 'verysecretkey';

router.put('/',(req,res)=>{

    if (!req.headers.authorization) {
        res.status(401).send('Unauthorized');
        return;
    }

    let token = req.headers.authorization.split(' ')[1]; 
    jwt.verify(token, VERY_SECRET_KEY,(err,decoded)=>{
        if (err) {
            res.status(401).send('Unauthorized');
            return;
        }
        else{
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
        }
    });
});

export default router;