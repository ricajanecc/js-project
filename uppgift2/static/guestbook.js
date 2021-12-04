window.addEventListener("load", function(){
    const form = document.getElementById("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        let errorForm = document.getElementById("formError"); //här selekterar ett element med formError, som skriver ut fel meddelande till formen
        let noErrorInName = firstNameValid();
        let noErrorInSurname = surnameValid(); //här exekverar validtorerna för att se om det finns fel 
        let noErrorInEmail = emailValid();
        let noErrorInPhone = phoneNumValid();
        if (noErrorInName && noErrorInSurname && noErrorInEmail && noErrorInPhone) { //om det inte finns fel
            console.log("Form sent!");
        } else { 
            errorForm.innerHTML = "There are errors in the form."; //annars uppvisar ett fel meddelande i errorForm element
        }
    })
}) 

function firstNameValid() {
    let firstName = document.getElementById("firstName");
    let firstNameError = document.getElementById("firstNameError");
    let errors = "";
    if (firstName.value === "") {
        errors += "This field cannot be empty. <br>";
    }
    if (/\d/.test(firstName.value)) {
        errors += "Invalid input. <br>";
    }
    firstNameError.innerHTML = errors;
    return errors === "";
}

function surnameValid() {
    let lastName = document.getElementById("lastName");
    let lastNameError = document.getElementById("lastNameError");
    let errors = "";
    if (lastName.value === "") {
        errors += "This field cannot be empty. <br>";
    }
    if (/\d/.test(lastName.value)) {
        errors += "Invalid input.<br>" ;
    }
    lastNameError.innerHTML = errors;
    return errors === "";
}

function emailValid() {
    let email = document.getElementById("email");
    let emailError = document.getElementById("emailError");
    let errors = "";
    if (email.value === "") {
        errors += "This field cannot be empty. <br>"
    }
    if (!/\S+@\S+\.\S+/.test(email.value)) {
        errors += "Invalid input. <br>"
    }
    emailError.innerHTML = errors;
    return errors === "";
}

function phoneNumValid() {
    let telNum = document.getElementById("telNum");
    let telNumError = document.getElementById("telNumError");
    let errors = "";
    if (telNum.value === "") {
        errors += "This field cannot be empty. <br>"
    }
    if (!/^\d{10}$/g.test(telNum.value)) {
        errors += "Incorrect input. <br>";  
    }
    telNumError.innerHTML = errors;
    return errors === "";
}
