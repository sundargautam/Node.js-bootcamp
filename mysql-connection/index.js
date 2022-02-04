//create express server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');

app.use(bodyParser.json());

//create connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'x9bbzq64bDX',
    database: 'SchoolDatabase'
});

app.get('/',(req,res)=>{
    connection.query('select * from student',(err,results)=>{
        if(err) throw err;
        res.send(results);
    });
})

app.post('/',(req,res)=>{

    const className = req.body.className;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const address = req.body.address;
    const gpa = req.body.gpa;
    const contactNumber = req.body.contactNumber;
    const bestSubjects = req.body.bestSubjects;

    let query = "insert into student (class, firstName, lastName, address,gpa, contactNumber, bestSubjects) values (?,?,?,?,?,?,?)";
    connection.query(query,[className,firstName,lastName,address,gpa,contactNumber,bestSubjects],(err,results)=>{
        if(err){ 
            res.status(500).send(err); 
            return;
        }
        if (results.affectedRows>0) {
            res.status(200).send("Student added successfully");
        }
        else{
            res.status(400).send("Student not added");
        }
    });
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
});