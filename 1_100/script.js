const body = document.getElementsByTagName('body');
const input = document.getElementById("guess");
const submit = document.getElementById("submit");
const list = document.getElementById("guesslist");
const inputArea = document.getElementById("input-area");
const arrowInd = document.getElementById("arrow");

submit.addEventListener('click', game);

function game()
{
    const rand =  Math.floor(Math.random()*100) + 1;
    const userInput = Number(input.value);

    const newLi = document.createElement('li');
        newLi.setAttribute("id", "guessItem");

    const reset = document.createElement('button');
        reset.setAttribute("id", "reset");
        reset.append('Reset Game');

        (userInput < rand) ? arrowInd.style.transform = "rotate(0deg)" : arrowInd.style.transform = "rotate(180deg)";

    switch (true)
    {        
        // case(input.value):

        //     break:

        case(input.value === '' || userInput <= 0 || userInput >= 101):
        // submit.innerText = 'Enter In-Bound Number to start Game.'
            input.classList.add('error-state');
            input.value = "";
            break;

        case (userInput <= 0 || userInput >= 101):
            //Submit button will say Enter Number to start game
            input.classList.add('error-state');
            input.value = "";
            break;
        
        case (rand - 5 < userInput && userInput < rand + 5 && rand !== userInput && list.childElementCount < 10):
            newLi.style.backgroundColor = "#F70000";
            newLi.append(userInput);
            list.append(newLi);

            input.value = "";
            break;
    
        case (rand - 10 < userInput && userInput < rand + 10 && rand !== userInput && list.childElementCount < 10):
            newLi.style.backgroundColor = "#EE5E1B";
            newLi.append(userInput);
            list.append(newLi);
            
            input.value = "";
            break;

        case (rand - 20 < userInput && userInput < rand + 20 && rand !== userInput && list.childElementCount < 10):
            newLi.style.backgroundColor = "yellow";
            newLi.append(userInput);
            list.append(newLi);
            
            input.value = "";
            break;

        case (rand - 30 < userInput && userInput < rand + 30 && rand !== userInput && list.childElementCount < 10):
            newLi.style.backgroundColor = "#bbe25f";
            newLi.append(userInput);
            list.append(newLi);
            
            input.value = "";
            break;

        case (rand - 35 < userInput && userInput < rand + 35 && rand !== userInput && list.childElementCount < 10):
            newLi.style.backgroundColor = "#76D7C4";
            newLi.append(userInput);
            list.append(newLi);
                
            input.value = "";
            break;

        case (rand - 40 <= userInput && userInput <= rand + 40 && rand !== userInput && list.childElementCount < 10):
            newLi.style.backgroundColor = "#C1FCC8 ";
            newLi.append(userInput);
            list.append(newLi);
            
            input.value = "";
            break;

        case (userInput < rand - 40 || rand + 40 < userInput && rand !== userInput && list.childElementCount < 10):
            newLi.style.backgroundColor = "#C1FCE4";
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

// function onHover()
// {
    
// }