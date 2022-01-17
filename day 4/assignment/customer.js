const fs = require('fs');

function postCustomer(req,res) {
    fs.open('customer.json','a+',(err,fd)=>{
        if(err){
            console.log(err);
            res.writeHead(500,{'Content-Type':'text/html'});
            res.end(err);
        }
        else{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end('<h1>File created successfully</h1>');
            console.log('File created successfully');
        }
    });
}

function getCustomer(res) {
    fs.readFile('customer.json',(err,data)=>{
        if(err){
            console.log(err);
            res.writeHead(500,{'Content-Type':'text/html'});
            res.end(err);
        }
        else{
            res.writeHead(200,{'Content-Type':'text/json'});
            res.end(data);
        }
    });
}

function putCustomer(body,res) {
    var jsonObj=[];
    fs.readFile('customer.json',(err,data)=>{
        if(err){
            console.log('err1',err);
            console.log(err);
            res.writeHead(500,{'Content-Type':'text/html'});
            res.end(err);
        }
        else{
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
}


module.exports.getCustomerMethod = getCustomer;
module.exports.postCustomerMethod =postCustomer;
module.exports.putCustomerMethod = putCustomer;

