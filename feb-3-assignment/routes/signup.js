import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../database/connection.js';

const router = express.Router();

router.post('/',(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let contactNumber = req.body.contactNumber;
    
    if(!username || !password || !firstName || !lastName || !contactNumber){
        res.status(400).json({
            message: 'Please fill all the fields'
        });
        return;
    }
    const saltRounds = 10;
    bcrypt.hash(password,saltRounds, function(err,hashedPassword) {
        const query = "insert into login(username,password,firstName,lastName,contactNumber) values(?,?,?,?,?)";
        const params = [username,hashedPassword,firstName,lastName,contactNumber];
        pool.query(query,params,(err,results,fields)=>{
            if(err){
                res.status(500).json({
                    message: 'Internal server error'
                });
                return;
            }
            res.status(201).json({
                message: 'User created successfully'
            });
        });
    });
})

export default router;