const input = document.querySelectorAll("input");
const list = document.getElementById("list");
const inputDel = document.getElementById("clear-input");
const inputEnter = document.getElementById("enter-input");

// inputEnter.addEventListener('click', (e) => {console.log});
inputEnter.addEventListener('click', inputHandler);

//querySelectorAll returns a node-list 
inputDel.addEventListener('click', () => {
    input.forEach(input => input.value = '');
});

function inputHandler()
{
    const taskDiv = document.createElement('div');
    taskDiv.setAttribute('id', 'task-sec');

    const task = document.createElement('li');
    task.setAttribute('id', 'task');
    taskDiv.append(task);

    const complete = document.createElement('input');
    complete.setAttribute('id', 'task-check');
    taskDiv.append(complete);
    // complete.addEventListener('click', taskHandler);

    const cross = document.createElement('img');
    cross.setAttribute('id', 'cross');
    // cross.append(cross.svg to the button); 

    const taskDel = document.createElement('button');
    taskDel.setAttribute('id', 'task-del');
    taskDiv.append(taskDel);
    // taskDel.addEventListener('click', taskHandler);

    if(input[0].value)
    {
        task.append(input[0].value);
        list.append(taskDiv);
        input[0].value = '';
    } else {
        alert("Enter valid input value");
    }
}

// function taskHandler()
// {

// }