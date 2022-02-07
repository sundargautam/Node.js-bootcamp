//import packages
import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';

//import routers
import signup from './routes/signup.js';
import login from './routes/login.js';
import user from './routes/user.js';
import product from './routes/product.js';

//import middlewares
import jwtVerify from './middlewares/jsonwebtoken.js';

//new express app
const app = express();

app.use(bodyParser.json());
app.use(jwtVerify);

app.use('/signup',signup);
app.use('/login',login);
app.use('/user',user);
app.use('/product',product);

app.listen(process.env.SERVER_PORT,()=> console.log(`Server is listening on port ${process.env.SERVER_PORT}`));