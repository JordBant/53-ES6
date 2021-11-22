const FORM = document.getElementById('form');
const PASSWORD = document.getElementById('password');
const CONFIRM_PASSWORD = document.getElementById('confirm');
const EMAIL = document.getElementById('email');
const PHONE = document.getElementById('number');
const USERNAME = document.getElementById('username');

//============State handlers===============//
function acceptHandler(formEl){
    const changeOn = formEl.parentElement;
    changeOn.className = 'form-section accept';
}

function rejectHandler(formEl){
    const changeOn = formEl.parentElement;
    changeOn.className = 'form-section reject';
}
//===================Username======================//

//===================Email=========================//

//===================Phone Number==================//

//===================Password======================//
function pwHandler(pw, confirm){

    function checkPW()
    {
        let howLong = pw.value.length;
        if(pw.value === ""){
            rejectHandler(pw);
        }
        // for some reason, will allow the state to be changed by just putting in 8 characters
        for(let i = 0; i <= howLong; i++)
        {
            let character = pw.value.charAt(i);
            if (character == character.toUpperCase() /* && howLong >= 8 &&!isNaN(character * 1)*/){
                acceptHandler(pw);
            } else {
                rejectHandler(pw);
            } 
        }
    };
    checkPW();

    // function checkConfirm(){
    //     if(confirm.value === ""){
    //         rejectHandler(confirm);
    //     }

    //     let check1 = pw.value;
    //     let check2 = confirm.value;

    //     if(check1 === check2){
    //         acceptHandler(confirm)
    //     } else {
    //         rejectHandler(confirm);
    //     }
    // };
    // checkConfirm();
}
// =================Event Listener============== //
FORM.addEventListener('submit', (e) => {

    e.preventDefault();
    // UNameHandler(USERNAME);
    // eMailHandler(EMAIL);
    // PhoneNumHandler(PHONE);
    pwHandler(PASSWORD, CONFIRM_PASSWORD);
});