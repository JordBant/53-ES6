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
        let guessItem = document.createElement('li').setAttribute('class', 'li-div')
            guessItem.innerText(userInput.toString());
        list.append(circle);
        let userInput = '';
        count++;
    }
}