'use strict';

const body = document.getElementsByTagName('body')
const input = document.getElementById("guess");
const submit = document.getElementById("submit");
const list = document.getElementById("guesslist");
const inputArea = document.getElementById("input-area")

const rand =  Math.floor(Math.random()*100);
let count = 1;

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
        case(userInput !== rand && count === 10):
            // You ran out of turns
        break;

        case (userInput <= 0 || userInput >= 101):
            //Submit button will say Enter Number to start game
            submit.innerText = 'Enter In-Bound Number to start Game.'
            input.value = "";
            break;
        
        case (rand - 5 < userInput && userInput < rand + 5 && rand !== userInput && count !== 10):
            newLi.style.border = "7px solid #F70000";
            newLi.append(userInput);
            list.append(newLi);

            input.value = "";
            count += 1;
            break;
    
        case (rand - 10 < userInput && userInput < rand + 10 && rand !== userInput && count !== 10):
            newLi.style.border = "7px solid #EE5E1B";
            newLi.append(userInput);
            list.append(newLi);
            
            input.value = "";
            count += 1;
            break;

        case (rand - 20 < userInput && userInput < rand + 20 && rand !== userInput && count !== 10):
            newLi.style.border = "7px solid #F9A213";
            newLi.append(userInput);
            list.append(newLi);
            
            input.value = "";
            count += 1;
            break;


        case (rand - 30 < userInput && userInput < rand + 30 && rand !== userInput && count !== 10):
            newLi.style.border = "7px solid #ABEBC6";
            newLi.append(userInput);
            list.append(newLi);
            
            input.value = "";
            count += 1;
            break;

        case (rand - 35 < userInput && userInput < rand + 35 && rand !== userInput && count !== 10):
            newLi.style.border = "7px solid #76D7C4";
            newLi.append(userInput);
            list.append(newLi);
                
            input.value = "";
            count += 1;
            break;

        case (rand - 40 <= userInput && userInput <= rand + 40 && rand !== userInput && count !== 10):
            newLi.style.border = "7px solid #C1FCC8 ";
            newLi.append(userInput);
            list.append(newLi);
            
            input.value = "";
            count += 1;
            break;

        case (userInput < rand - 40 || rand + 40 < userInput && rand !== userInput && count !== 10):
            newLi.style.border = "7px solid #C1FCE4";
            newLi.append(userInput);
            list.append(newLi);
            
            input.value = "";
            count += 1;
            break;

        default:
            input.value = "";
            inputArea.replaceChild(reset, submit);
            reset.addEventListener('click', gameReset);

            input.remove();
            break;
    }
}

const gameReset = () =>{
    
}