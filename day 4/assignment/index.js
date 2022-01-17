const http = require('http');
const {getCustomerMethod,postCustomerMethod,putCustomerMethod} = require('./customer.js');


const server  = http.createServer((req,res)=>{
    
    if(req.url === '/customer'){
        switch (req.method) {
            case 'GET':
                getCustomerMethod(res);
                break;
            case 'POST':
                postCustomerMethod(req,res);
                break;
            case 'PUT':
                req.on('data',(data)=>{
                    putCustomerMethod(data,res);
                });
                break;
            default:
                res.writeHead(405,'Method not found',{'Content-Type':'text/html'});
                res.end('<h1>No such Method</h1>');
                break;
        }
    }
    else{
        res.writeHead(404,{'Content-Type':'text/html'});
        res.end('<h1>No such endpoint found</h1>');
    }
});

server.listen(3000);