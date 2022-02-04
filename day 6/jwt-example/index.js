import express from 'express';
import bodyParser from 'body-parser';

import login from './routes/login.js';
import signup from './routes/signup.js';
import customer from './routes/customer.js';

const VERY_SECRET_KEY = 'verysecretkey';

// create instance of express app
const app = express();

// use body-parser as middleware
app.use(bodyParser.json());

// listen for requests on port 3000
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});

app.use('/login',login);
app.use('/signup',signup);
app.use('/customer',customer);