const input = document.getElementsByTagName('input');
const btn = document.getElementsById('submit');
const password = document.getElementsById('password');
const confirm_password = document.getElementId('confirm');
const email = document.getElementId('email');
const number = document.getElementId('number');
const username = document.getElementId('username');

btn.addEventListener('submit', e => e.preventDefault)

// password function:


function passwordValid(pw)
{
    input = pw.value;
}

/* pt 1 
    - Check if string is shorter than 8 characters
    - Check if string contains numbers
    - Check if string contains capital letter
    - Check if string contains any invalid symbols

   pt 2
    - Cache and compare password value and confirm value
    - Change state of form component based on the boolean value
 */ 
