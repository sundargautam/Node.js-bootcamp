//import packages
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
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

//initialize middlewares
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(jwtVerify);
app.set('view engine','ejs');

//UI routes 
app.get('/',(req,res)=>{
    res.render('login.ejs');
})
app.get('/index',(req,res)=>{
    res.render('index.ejs');
})

//api routes
app.use('/api/signup',signup);
app.use('/api/login',login);
app.use('/api/user',user);
app.use('/api/product',product);

app.listen(process.env.SERVER_PORT,()=> console.log(`Server is listening on port ${process.env.SERVER_PORT}`));