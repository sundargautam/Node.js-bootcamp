import express from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import pool from "../database/connection.js";
import 'dotenv/config';

const router = express.Router();

router.post('/',(req,res)=>{
    let username  = req.body.txtUsername;
    let password = req.body.txtPassword;
    
    console.log(password);

    pool.query('select * from login where username = ?',[username],(err,results,fields)=>{
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (results.length === 0) {
            res.status(403).send('Invalid username or password'); // username is not found
            return;
        }
        bcrypt.compare(password,results[0].password,(err,result)=>{
            if(err){
                res.status(500).send(err);
                return;
            }
            if(result){
                const token = jwt.sign({
                    id: results[0].id,
                    username: results[0].username,
                    firstName: results[0].firstname,
                    lastName: results[0].lastname,
                    contactNumber: results[0].contactNumber
                },process.env.JWT_KEY,{
                    expiresIn: '1h'
                });
                res.cookie('token',token);
                res.redirect('/index');
            }
            else{
                res.status(403).send('Invalid username or password'); // password is not correct
            }
        })
    });
});

export default router;