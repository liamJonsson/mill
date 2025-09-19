//Validering av kontaktformulär

const inputName = document.getElementById('name');
const inputTel = document.getElementById('tel');
const inputEmail = document.getElementById('email');
const inputMessage = document.getElementById('message');

const nameError = document.getElementById('nameError');
const telError = document.getElementById('telError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

const sendButton = document.getElementById('sendButton');
sendButton.disabled = true;

let hasValidName = false;
let hasValidTel = false;
let hasValidEmail = false;
let hasValidMessage = false;

const validateForm = () =>{
    if(hasValidName && hasValidTel && hasValidEmail && hasValidMessage){
        sendButton.disabled = false;
    }
    else{
        sendButton.disabled = true;
    }
}


inputName.addEventListener('input', (event) => {
    const name = event.target.value;

    if(name.length > 1 && /^[A-Za-zÅÄÖåäö\s-]+$/.test(name)) {
        hasValidName = true;
        nameError.classList.add('visibility-hidden');
    
    }

    else if(name.length === 0){
        hasValidName = false;
        nameError.classList.add('visibility-hidden');
            
    }

    else{
        hasValidName = false;
        nameError.classList.remove('visibility-hidden');


    }
  validateForm();
})

inputTel.addEventListener('input', (event) => {
    const tel = event.target.value;

    if(tel.length > 0 && /^[0-9+\-\s]+$/.test(tel)) {
        hasValidTel = true;
        telError.classList.add('visibility-hidden');

    } else if(tel.length === 0) {
        hasValidTel = false;
        telError.classList.add('visibility-hidden');

    } else {
        hasValidTel = false;
        telError.classList.remove('visibility-hidden');
    }
     validateForm();
});

inputEmail.addEventListener('input', (event) => {
    const email = event.target.value;

    if(email.includes('@') && email.includes('.') && email.length > 4) {
        hasValidEmail = true;
        emailError.classList.add('visibility-hidden');
    } else if(email.length === 0) {
        hasValidEmail = false;
        emailError.classList.add('visibility-hidden');
    } else {
        hasValidEmail = false;
        emailError.classList.remove('visibility-hidden');
    }
     validateForm();
});


inputMessage.addEventListener('input', (event) => {
    const message = event.target.value;

    if(message.length > 0 && message.length <= 500) {
        hasValidMessage = true;
        messageError.classList.add('visibility-hidden');
    }
    
    else if(message.length > 500) {
        hasValidMessage = false;
        messageError.classList.remove('visibility-hidden');
    }

    else if(message.length === 0) {
        hasValidMessage = false;
        messageError.classList.add('visibility-hidden');
    }

     validateForm();
});

sendButton.addEventListener('click', () => {
    const thankyouMessage = document.getElementById('thankyou-message');
    thankyouMessage.classList.remove('visibility-hidden');
});
