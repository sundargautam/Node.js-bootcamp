const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '/index.html'));
});

router.get('/indexScript',(req,res)=>{
    res.sendFile(path.join(__dirname, '/indexScript.js'));
})

app.use(router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

