let arr = [

];

let lastNumber = 20;
let count =0;
for (let i = 0; i < 3; i++) {
    arr[i]=[];
    for (let j = 0; j < 4; j++) {
        if (count%2==0) {
            arr[i][j] = count;
        }
        else{
           arr[i][j] = ++count;
        }
        count++;
        if (count>=lastNumber) {
            break;
        }
    }    
}

console.log(arr);