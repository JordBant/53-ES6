const form = document.getElementById('form');
const password = document.getElementById('password');
const confirm_password = document.getElementById('confirm');
const email = document.getElementById('email');
const number = document.getElementById('number');
const username = document.getElementById('username');

form.addEventListener('submit', (e) => {e.preventDefault()});

pwHandler(password, confirm_password);


//============State handlers===============//
function acceptHandler(formEl)
{
    const changeOn = formEl.parentElement;
    changeOn.className = 'form-section accept';
}

function rejectHandler(formEl)
{
    const changeOn = formEl.parentElement;
    changeOn.className = 'form-section reject';
}
//===================Username======================//

//====================Email========================//

//===================Phone Number==================//

//===================Password======================//
function pwHandler(pw, confirm)
{
    function checkPW()
    {
        let howLong = pw.value.length;
        let state = pw.parentElement;
        for(let i = 0; i <= howLong; i++)
        {
            let character = pw.value.charAt(i);
            (!Number.isNan(character) && character == character.toUpperCase() && howLong < 8) ? acceptHandler(state) : rejectHandler(state);
        }
    };

    function checkConfirm()
    {
        let state = confirm.parentElement;
        let check1 = pw.value;
        let check2 = confirm.value;
        (check1 === check2) ? acceptHandler(state) : rejectHandler(state);
    };

    return checkPW(), checkConfirm();
}