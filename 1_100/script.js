'use strict';

const input = document.getElementById("guess");
const submit = document.getElementById("submit");
const list = document.getElementById("guesslist");
const rand = Math.floor(Math.random()*100);

submit.addEventListener('click', game());

function game()
{
    const userInput = input.value;
    let count = 0;

    if(userInput !== rand)
    {
        let guessItem = document.createElement('li')
            guessItem.innerText(userInput.toString());
        let circle = document.createElement('div')
            circle.setAttribute('id', 'li-div')
            circle.append(guessItem);

        list.append(circle);
        let userInput = '';
        count++;
    }
}