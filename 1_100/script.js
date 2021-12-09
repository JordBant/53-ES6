'use strict';

const body = document.getElementsByTagName('body')
const input = document.getElementById("guess");
const submit = document.getElementById("submit");
const list = document.getElementById("guesslist");
const inputArea = document.getElementById("input-area")

const rand = 50 /*Math.floor(Math.random()*100)*/;
let count = 0;

submit.addEventListener('click', game);

function game()
{
    const userInput = Number(input.value);
    const newLi = document.createElement('li');
        newLi.setAttribute("id", "guessItem");

    const reset = document.createElement('button');
        reset.setAttribute("id", "reset");
        reset.append('Reset Game');

    switch (true)
    {        
        case (rand - 5 < userInput && userInput < rand + 5 && rand !== userInput && count < 11):
            newLi.style.border = "7px solid red";
            newLi.append(userInput);
            list.append(newLi);

            count += 1;
            break;
    
        case (rand - 10 < userInput && userInput < rand + 10 && rand !== userInput && count < 11):
            newLi.style.border = "7px solid orange";
            newLi.append(userInput);
            list.append(newLi);
            
            count += 1;
            break;

        case (rand - 20 < userInput && userInput < rand + 20 && rand !== userInput && count < 11):
            newLi.style.border = "7px solid yellow";
            newLi.append(userInput);
            list.append(newLi);
            
            count += 1;
            break;


        case (rand - 30 < userInput && userInput < rand + 30 && rand !== userInput && count < 11):
            newLi.style.border = "7px solid green";
            newLi.append(userInput);
            list.append(newLi);
            
            count += 1;
            break;

        case (rand - 35 < userInput && userInput < rand + 35 && rand !== userInput && count < 11):
            newLi.style.border = "7px solid purple";
            newLi.append(userInput);
            list.append(newLi);
                
            count += 1;
            break;

        case (rand - 40 <= userInput && userInput <= rand + 40 && rand !== userInput && count < 11):
            newLi.style.border = "7px solid blue";
            newLi.append(userInput);
            list.append(newLi);
            
            count += 1;
            break;

        case (userInput < rand - 40 || rand + 40 < userInput && rand !== userInput && count < 11):
            newLi.style.border = "7px solid grey";
            newLi.append(userInput);
            list.append(newLi);
            
            count += 1;
            break;

        default:
            newLi.append('nice');
            list.append(newLi);
    
            inputArea.replaceChild(reset, submit);
            input.remove();
            break;
    }
    
    // reset.addEventListener('click', gameReset);
}

// const gameReset = () =>{

// }