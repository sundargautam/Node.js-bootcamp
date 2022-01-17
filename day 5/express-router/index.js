const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use('/customer', require('./routes/customer'));
app.use('/client', require('./routes/client'));

app.get('/',(req,res)=>{
    res.send('This is index page');
})
// app.use('/', require('./routes/index'));
