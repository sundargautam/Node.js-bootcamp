import 'dotenv/config';
import pool from "../database/connection.js";
import express from "express";

const router = express.Router();

router.get('/',(req,res)=>{
    let productId = req.query.id;
    if (productId) {
        pool.query('select * from product where id = ?',[productId],(err,results,fields)=>{
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.status(200).send(results);
        });
    }
    else{
        pool.query('select * from product ',[],(err,results,fields)=>{
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.status(200).send(results);
        })
    }
})

router.post('/',(req,res)=>{
    let productName = req.body.productName;
    let productCategory = req.body.productCategory;

    if(!productName || !productCategory){
        res.status(400).send('Please provide product name and category');
        return;
    }
    pool.query('insert into product (name,category) values (?,?)',[productName,productCategory],(err,results,fields)=>{
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).send('Product added successfully');
    });
})

export default router;
