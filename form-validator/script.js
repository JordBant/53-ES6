const form = document.getElementsById('form');

const password = document.getElementsById('password');
const confirm_password = document.getElementId('confirm');
const email = document.getElementId('email');
const number = document.getElementId('number');
const username = document.getElementId('username');

form.addEventListener('submit', e = () => {e.preventDefault});

function pwHandler(pw, confirm)
{
    function checkPW()
    {
        let howLong = pw.length;

        for(let i = 0; i <= howLong; i++)
        {
            let character = pw.charAt(i);
            (!isNan(character) && character == character.toUpperCase() && howLong < 8) ? password.parentElement.classList("accpet") : password.parentElement.classList("reject");
        }
    }

    function checkConfirm()
    {
        let check1 = pw.value;
        let check2 = confirm.value;
        (check1 === check2) ? password.parentElement.classList("accpet") : password.parentElement.classList("reject");
    }

    checkPW();
    checkConfirm();
}

pwHandler(password, confirm_password);

/* pt 1 
    - Check if string is shorter than 8 characters
    - Check if string contains numbers
    - Check if string contains capital letter
    - Check if string contains any invalid symbols

   pt 2
    - Cache and compare password value and confirm value
    - Change state of form component based on the boolean value
 */ 