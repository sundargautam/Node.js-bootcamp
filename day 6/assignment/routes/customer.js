import express from 'express';
import fs from 'fs';


const router = express.Router();

router.put('/',(req,res)=>{
    let username= req.query.username;

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
                if (customer.username == username) {
                    customer.address = address;
                    customer.name = name;
                }
            });
            fs.writeFile('./users.json',JSON.stringify(jsonObj),(err)=>{
                if(err){
                    res.status(500).send("Could not write file");
                }
                else{
                    res.status(200).send(`Customer ${username} updated`);
                }
            });
        }
    })
});

export default router;