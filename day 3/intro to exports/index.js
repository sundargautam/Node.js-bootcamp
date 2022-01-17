let importedCar = require('./car.js');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let count =0;
readCarData();

function readCarData() {
    if (count<5) {
        importedCar.exportedCars[count] = {}

        rl.question('Model number:', (modelAnswer) => {
            importedCar.exportedCars[count].model = modelAnswer;

            rl.question('Make:', (makeAnswer) => {
                importedCar.exportedCars[count].make = makeAnswer;

                rl.question('Year:', (yearAnswer) => {
                    importedCar.exportedCars[count].year = yearAnswer;
                    count++;
                    readCarData();
                });
            });
        });
    }
    else{
        rl.close();
        console.log(importedCar.exportedCars);
    }
    
}
