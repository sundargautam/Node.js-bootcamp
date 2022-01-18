const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {
    const customerId = req.query.id;

    if (!customerId) {
        fs.readFile('customer.json',(err,data)=>{
            res.send(data);
        });
    }
    else{
        fs.readFile('customer.json',(err,data)=>{
            if(err){
                console.log('err1',err);
                console.log(err);
                res.writeHead(500,{'Content-Type':'text/html'});
                res.end(err);
            }
            else{
                let jsonObj=[];
                if(data.length>0){
                    jsonObj = JSON.parse(data);
                }
                let jsonObjNew = jsonObj.filter((customer)=>{
                    return customer.id == customerId;
                });
                res.send(jsonObjNew[0]);
            }
        });
    }
});

router.post('/',(req,res)=> {
    req.on('data',(data)=>{
        let customerArray =[];
        customerArray.push(JSON.parse(data));
        fs.writeFile('customer.json',JSON.stringify(customerArray),{flag:'w+'},(err)=>{
            if(err){
                console.log(err);
                res.writeHead(500,{'Content-Type':'text/html'});
                res.end(err);
            }
            else{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.end('<h1>File updated successfully</h1>');
            }
        });
    });
});

router.put('/',(req,res)=>{
    req.on('data',(body)=>{
        fs.readFile('customer.json',(err,data)=>{
            if(err){
                console.log('err1',err);
                console.log(err);
                res.writeHead(500,{'Content-Type':'text/html'});
                res.end(err);
            }
            else{
                let jsonObj=[];
                if(data.length>0){
                    jsonObj = JSON.parse(data);
                }
                jsonObj.push(JSON.parse(body));
                fs.writeFile('customer.json',JSON.stringify(jsonObj),{flag:'w+'},(err)=>{
                    if(err){
                        console.log(err);
                        res.writeHead(500,{'Content-Type':'text/html'});
                        res.end(err);
                    }
                    else{
                        res.writeHead(200,{'Content-Type':'text/html'});
                        res.end('<h1>File updated successfully</h1>');
                        console.log('File updated successfully');
                    }
                });
            }
        });   
    });
});

router.delete('/',(req,res)=>{
    const customerId = req.query.id;

    fs.readFile('customer.json',(err,data)=>{
        if(err){
            console.log('err1',err);
            console.log(err);
            res.writeHead(500,{'Content-Type':'text/html'});
            res.end(err);
        }
        else{
            let jsonObj=[];
            if(data.length>0){
                jsonObj = JSON.parse(data);
            }
            let jsonObjNew = jsonObj.filter((customer)=>{
                return customer.id != customerId;
            });
            fs.writeFile('customer.json',JSON.stringify(jsonObjNew),{flag:'w+'},(err)=>{
                if(err){
                    console.log(err);
                    res.writeHead(500,{'Content-Type':'text/html'});
                    res.end(err);
                }
                else{
                    res.writeHead(200,{'Content-Type':'text/html'});
                    res.end('<h1>File updated successfully</h1>');
                    console.log('File updated successfully');
                }
            });
        }
    }); 
});

module.exports = router;