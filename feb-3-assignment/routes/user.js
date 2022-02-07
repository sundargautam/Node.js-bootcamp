import 'dotenv/config';
import pool from "../database/connection.js";
import express from "express";

const router = express.Router();

router.get('/',(req,res)=>{
    let userId = req.query.id;
    let username = req.query.username;

    if (userId) {
        pool.query('select id,username,firstname,lastname,contactNumber from login where id = ?',[userId],(err,results,fields)=>{
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.status(200).send(results);
        });
    }
    else if (username) {
        pool.query('select id,username,firstname,lastname,contactNumber from login where username = ?',[username],(err,results,fields)=>{
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.status(200).send(results);
        })
    }
    else{
        pool.query('select id,username,firstname,lastname,contactNumber from login ',[],(err,results,fields)=>{
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.status(200).send(results);
        })
    }
})

export default router;
