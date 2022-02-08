import express from "express";

const router = express.Router();

router.get('/',(req,res)=>{
    res.cookie('auth','');
    res.redirect('/login');
});

export default router;