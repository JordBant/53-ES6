const body = document.getElementsByTagName('body');
const input = document.getElementById("guess");
const submit = document.getElementById("submit");
const list = document.getElementById("guesslist");
const inputArea = document.getElementById("input-area");
const arrowInd = document.getElementById("arrow");

const rand =  Math.floor(Math.random()*100) + 1;

submit.addEventListener('click', game);

function game()
{
    const userInput = Number(input.value);

    const newLi = document.createElement('li');
        newLi.setAttribute("id", "guessItem");

    const reset = document.createElement('button');
        reset.setAttribute("id", "reset");
        reset.append('Reset Game');

        (userInput < rand) ?  arrowInd.style.transform = "rotate(360deg)" :  arrowInd.style.transform = "rotate(180deg)";

    switch (true)
    {        

        case(input.value === ''):
        // submit.innerText = 'Enter In-Bound Number to start Game.'
        input.value = "";
        input.classList.add('error-state');
        break;

        case (userInput <= 0 || userInput >= 101):
            //Submit button will say Enter Number to start game
            input.classList.add('error-state');
            input.value = "";
            break;
        
        case (rand - 5 < userInput && userInput < rand + 5 && rand !== userInput && list.childElementCount < 10):
            newLi.style.border = "7px solid #F70000";
            newLi.append(userInput);
            list.append(newLi);

            input.value = "";
            break;
    
        case (rand - 10 < userInput && userInput < rand + 10 && rand !== userInput && list.childElementCount < 10):
            newLi.style.border = "7px solid #EE5E1B";
            newLi.append(userInput);
            list.append(newLi);
            
            input.value = "";
            break;

        case (rand - 20 < userInput && userInput < rand + 20 && rand !== userInput && list.childElementCount < 10):
            newLi.style.border = "7px solid yellow";
            newLi.append(userInput);
            list.append(newLi);
            
            input.value = "";
            break;

        case (rand - 30 < userInput && userInput < rand + 30 && rand !== userInput && list.childElementCount < 10):
            newLi.style.border = "7px solid #bbe25f";
            newLi.append(userInput);
            list.append(newLi);
            
            input.value = "";
            break;

        case (rand - 35 < userInput && userInput < rand + 35 && rand !== userInput && list.childElementCount < 10):
            newLi.style.border = "7px solid #76D7C4";
            newLi.append(userInput);
            list.append(newLi);
                
            input.value = "";
            break;

        case (rand - 40 <= userInput && userInput <= rand + 40 && rand !== userInput && list.childElementCount < 10):
            newLi.style.border = "7px solid #C1FCC8 ";
            newLi.append(userInput);
            list.append(newLi);
            
            input.value = "";
            break;

        case (userInput < rand - 40 || rand + 40 < userInput && rand !== userInput && list.childElementCount < 10):
            newLi.style.border = "7px solid #C1FCE4";
            newLi.append(userInput);
            list.append(newLi);
            
            input.value = "";
            break;

        default:
            input.value = "";
            input.remove();
            inputArea.replaceChild(reset, submit);
            reset.addEventListener('click', gameReset);
            
            break;
    }
}

function gameReset()
 {
    while(list.firstElementChild)
    {
        list.removeChild(list.firstElementChild);
    }
    inputArea.replaceChild(submit, reset);
    inputArea.append(input);

    input.value = "";
}