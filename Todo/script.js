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
    complete.type = 'checkbox';
    taskDiv.append(complete);

    const cross = document.createElement('img');
    cross.setAttribute('id', 'task-cross');
    cross.src = 'todo-images/cross.svg';

    const taskDel = document.createElement('button');
    taskDel.setAttribute('id', 'task-del');
    taskDiv.append(taskDel);
    taskDel.append(cross);

    taskDel.addEventListener('click', () => {
       taskDiv.remove();
    });

    switch (true) {
        case (input[0].value):
            
            break;
    
        default:
            break;
    }

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