const fs = require('fs')

fs.open('a.txt', 'a+',(err,fd)=>{
    if(err){ 
        console.log(err);
    }
    else{
        fs.readFile(fd,(err,data)=>{
            if(err){ 
                console.log(err);
            }
            else{
                console.log('data',data.toString())
            }
        });
    }
});