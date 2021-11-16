const form = document.getElementsById('form');

const password = document.getElementsById('password');
const confirm_password = document.getElementId('confirm');
const email = document.getElementId('email');
const number = document.getElementId('number');
const username = document.getElementId('username');

form.addEventListener('submit', (e) => {e.preventDefault});


//============State handlers===============//
function acceptHandler(formElement)
{
    let changeOn = formElement.parentElement;
    changeOn.className = 'form-section accept';
}

function rejectHandler(formElement)
{
    let changeOn = formElement.parentElement;
    changeOn.className = 'form-section reject';
}
//===================Username======================//

//====================Email========================//

//===================Phone Number======================//

//===================Password======================//
function pwHandler(pw, confirm)
{
    function checkPW()
    {
        let howLong = pw.length;
        let state = pw.parentElement;
        for(let i = 0; i <= howLong; i++)
        {
            let character = pw.charAt(i);
            (!isNan(character) && character == character.toUpperCase() && howLong < 8) ? acceptHandler(pw) : rejectHandler(pw);
        }
    }

    function checkConfirm()
    {
        let state = confirm.parentElement;
        let check1 = pw.value;
        let check2 = confirm.value;
        (check1 === check2) ? acceptHandler(confirm) : rejectHandler(confirm);
    }

    checkPW();
    checkConfirm();
}

pwHandler(password, confirm_password);