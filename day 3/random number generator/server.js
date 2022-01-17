const { exit } = require('process');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const randomNumber = Math.floor(Math.random()*100);
console.log(`I'm thinking of a number between 1 and 100. 🤔 🤔 🤔`);
getAnswer();

function getAnswer(){
    rl.question('Please guess the number 🤔 🤔 🤔', (answer) => {
        if(typeof answer !== Number){
            console.log(`${answer} is not a number 😒 😒 😒`);
            getAnswer();
        }

        if (randomNumber === parseInt(answer)) {
            console.log('You guessed it! 🤩 🤩 🤩');
            console.log('Bye Bye, Winner! 🏆 🏆 🏆');
            rl.close();
            exit();
        }
        else{
            rl.question('🙈 🙈 🙈. Try Again? (Y/N) ',(tryAgain)=>{
                if(tryAgain.toUpperCase()==='Y')
                {
                    getAnswer();
                }
                else{
                    console.log('Bye Bye, Loser! 😢 😢 😢');
                    rl.close();
                    exit();
                }
            })
        }
    });
}