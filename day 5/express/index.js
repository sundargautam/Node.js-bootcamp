const express = require('express');
const app = express();

app.get('/', (req,res)=>{
    res.send('This is get request');
});

app.post('/', (req,res)=>{
    res.send('This is post request');
});

app.put('/', (req,res)=>{
    res.send('This is put request ');
});

app.delete('/',(req,res)=>{
    res.send('This is delete request');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});