const http = require('http');
const {deleteClientMethod} = require('./client.js');
const {getCustomerMethod,postCustomerMethod,deleteCustomerMethod,putCustomerMethod} = require('./customer.js');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    if (req.method=='GET') {
        switch (req.url) {
            case '/customer':
                let customer = getCustomerMethod();
                res.end(customer);
                break;
            default:
                res.writeHead(404,'Not found');
                res.end('No such endpoint');
        }
    }
    else if (req.method=='POST') {
        switch (req.url) {
            case '/customer':
                let customer = postCustomerMethod();
                res.end(customer);
                break;
            default:
                res.writeHead(404,'Not found');
                res.end('No such endpoint');
        }
        // res.end('This was a post request')
    }
    else if (req.method=='PUT') {
        switch (req.url) {
            case '/customer':
                let customer = putCustomerMethod();
                res.end(customer);
                break;
            default:
                res.writeHead(404,'Not found');
                res.end('No such endpoint');
        }
    }
    else if (req.method=='DELETE') {
        switch (req.url) {
            case '/customer':
                let customer = deleteCustomerMethod();
                res.end(customer);
                break;
            case '/client':
                let client = deleteClientMethod();
                res.end(client);
                break;
            default:
                res.writeHead(404,'Not found');
                res.end('No such endpoint');
        }
    }
    else {  
        res.writeHead(405,'Method not found', {'Content-Type': 'text/plain'});
        res.end('Method not defined!')
    }
})

server.listen(3000);
