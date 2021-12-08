'use strict';

const body = document.getElementsByTagName('body')
const input = document.getElementById("guess");
const submit = document.getElementById("submit");
const list = document.getElementById("guesslist");
const inputArea = document.getElementById("input-area")

const rand = Math.floor(Math.random()*10);
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

    switch (userInput) {

        // Rand - 5 ≤ userInput ≤ Rand + 5
        case rand + 5 > userInput:
        case userInput > rand:

        case rand - 5 < userInput:
        case userInput < rand:

        case rand !== userInput:
        case count !== 10:

        // Apply redish-orange color styling of list item
            newLi.append(userInput);
            list.append(newLi);

            count += 1;
            break;
    
        case rand + 12 > userInput:
        case userInput > rand:
    
        case rand - 12 < userInput:
        case userInput < rand:

        case rand !== userInput:
        case count !== 10:
        // Apply orangish color styling of list item
            newLi.append(userInput);
            list.append(newLi);
            
            count += 1;
            break;

        case rand + 20 > userInput:
        case userInput > rand:
    
        case rand - 20 < userInput:
        case userInput < rand:

        case rand !== userInput:
        case count !== 10:

        // Apply yellow color styling of list item
            newLi.append(userInput);
            list.append(newLi);
            
            count += 1;
            break;

        case rand + 29 > userInput:
        case userInput > rand:

        case rand - 29 < userInput:
        case userInput < rand:

        case rand !== userInput:
        case count !== 10:
        // Apply yellow color styling of list item
            newLi.append(userInput);
            list.append(newLi);
            
        count += 1;
        break;

        case rand + 34 > userInput:
        case userInput > rand:

        case rand - 34 < userInput:
        case userInput < rand:

        case rand !== userInput:
        case count !== 10:
        // Apply yellow-green color styling of list item
            newLi.append(userInput);
            list.append(newLi);
                
        count += 1;
        break;

        case rand + 40 > userInput:
        case userInput > rand:

        case rand - 40 < userInput:
        case userInput < rand:

        case rand !== userInput:
        case count !== 10:
        // Apply minty greeny color styling of list item
            newLi.append(userInput);
            list.append(newLi);
            
            count += 1;
            break;

        case rand + 40 < userInput:
        case rand - 40 > userInput:

        case rand !== userInput:
        case count !== 10:
        // Apply minty greeny color styling of list item
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