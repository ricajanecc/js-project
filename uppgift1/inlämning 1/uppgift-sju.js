
window.addEventListener("load", function(){ // eftersom skriptet är laddad innan form, denna functionen väntar tills sidan är laddad
    const form = document.getElementById("bookingForm"); //här selekterar form 
    form.addEventListener("submit", function(event) { //här lyssnar till formens submit event 
        event.preventDefault(); //här förhindrar vi webbläsaren att skicka default GET HTTP packet
        let errorForm = document.getElementById("formError"); //här selekterar ett element med formError, som skriver ut fel meddelande till formen
        let noErrorInName = nameValidator(); //här exekverar validtorerna för att se om det finns fel 
        let noErrorInEmail = emailValidator();
        let noErrorInDestination = destinationValidator();
        let noErrorInDate = dateValidator();
        if (noErrorInName && noErrorInEmail && noErrorInDestination && noErrorInDate) { //om det inte finns fel 
            showBookingInfo(); //uppvisar funktionen showBookingInfo()
        } else { 
            errorForm.innerHTML = "There are errors in the form."; //annars uppvisar ett fel meddelande i errorForm element
        }
    });
});

function showBookingInfo() { //här en funktion som uppvisar booking informationen efter användaren har matat in all information
    let formContainer = document.querySelector(".formContainer"); 
    let bookingContainer = document.querySelector(".bookingContainer");
    formContainer.style.display = "none"; //detta gör att formContainer dold
    bookingContainer.style.display = ""; //detta uppvisar bookingContainer
    
    let bookingInfo = document.getElementById("bookingInfo"); //selekterar bookingInfo 
    let inputElement = document.querySelector("[name = fname]"); //selekterar alla input från formen för att hämta alla datan
    let emailElement = document.querySelector("[name = email]");
    let fromElement = document.querySelector("[name = startDestination]");
    let toElement = document.querySelector("[name = mainDestination]");
    let classElement = document.querySelector("[name = travelClass]");
    let firstDate = document.querySelector("[name = dateDeparture]");
    let secondDate = document.querySelector("[name = dateArrival]");
    let text = `
        <p><b>Name:</b> ${inputElement.value}</p>
        <p><b>Email:</b> ${emailElement.value}</p>
        <p>
            <b>From:</b> ${fromElement.querySelector("[value = "+fromElement.value+"]").innerHTML} 
            <b>To:</b> ${toElement.querySelector("[value = "+toElement.value+"]").innerHTML}
        </p>
        <p><b>Class:</b> ${classElement.querySelector("[value = "+classElement.value+"]").innerHTML}</p>
        <p>
            <b>Date of Departure:</b> ${new Date(firstDate.value).toLocaleString()} 
            <b>Date of Arrival:</b> ${new Date(secondDate.value).toLocaleString()}</p>
    `; //här tillderar till texten HTML som ska uppvisas med alla value från formen. För <select> taggen har vi selekterar <option> taggen för att uppvisa den inre HTML.För dates konverteras till en date object och använder toLocaleString() för att skriva ut fint.

    bookingInfo.innerHTML = text; //bytt inre HTML till texten som tidigare genererat
}

function nameValidator() { //Jag har gjort en function för att validera namnet om användaren har matat in rätt input. 
    let inputElement = document.querySelector("[name = fname]"); //först här selekterar jag elementet som har attributet fName
    let errorElement = document.getElementById("nameError"); // och även selekterar det elementet som har attributet nameError 
    let errors = "";
    if (inputElement.value === "") { //här ser jag om inputElement är inte tom
        errors += "Field cannot be empty. <br>" //annars skriver ut detta fel meddelande
    } 
    if (/\d/.test(inputElement.value)) { //här ser jag om användaren input har matat in en siffra genom att använda regular expression
        errors += "Name cannot contain number/s <br>" //om användaren har matat in en siffra, så skriver ut detta fel meddelande
    }
    errorElement.innerHTML = errors;
    if (errors === "") { //om det inte finns fel,  raderar inputError class från inputElement
        inputElement.classList.remove("inputError");
    } else {
        inputElement.classList.add("inputError"); //om det finns fel, adderar inputError class till inputElement
    }
    return errors === ""; //här returnerar en boolean, om det inte finns fel så returnerar true och returnerar false om det finns fel
}

function emailValidator() {
    let emailElement = document.querySelector("[name = email]");
    let errorEmail = document.getElementById("emailError");
    let errors = "";
    if (emailElement.value === "") { // om användaren matar in ingenting, eller lämnar fältet tom 
        errors += "Field cannot be empty. <br>"
    } 
    if (!/\S+@\S+\.\S+/.test(emailElement.value)){ //om användaren matar in en input som inte motsvarar regular expression
        errors += "Email is invalid. <br>"; //så skriver ut detta fel meddelande
    }
    errorEmail.innerHTML = errors; 
    if (errors === "") { 
        emailElement.classList.remove("inputError");
    } else {
        emailElement.classList.add("inputError");
    }
    return errors === "";
}

function destinationValidator() {
    let fromElement = document.querySelector("[name = startDestination]");
    let toElement = document.querySelector("[name = mainDestination]");
    let errorDestination = document.getElementById("destinationError");
    let errors = "";
    if (fromElement.value === toElement.value) { //om användaren väljer ut samma datum 
        errors += "Please enter unique \"From\" and \"To\" destinations.<br>"; //så skriver ut detta fel meddelandet
    }
    errorDestination.innerHTML = errors;
    if (errors === "") {
        fromElement.classList.remove("inputError");
        toElement.classList.remove("inputError");
    } else {
        fromElement.classList.add("inputError");
        toElement.classList.add("inputError");
    }
    return errors === "";
}
 
function dateValidator() {
    let firstDate = document.querySelector("[name = dateDeparture]");
    let secondDate = document.querySelector("[name = dateArrival]");
    let errorDate = document.getElementById("dateError");
    let errors = "";
    if (new Date(firstDate.value).getTime() > new Date(secondDate.value).getTime() ) { //om användaren väljer ut ett return datum som är före avresan 
        errors += "The return date cannot be before the departure date.<br>";
    }
    if (new Date(firstDate.value).getTime() < new Date().getTime()) { //om användaren väljer ut ett datum som har redan passerat
        errors += "The depature date cannot be in the past. <br>";
    }
    if (firstDate.value === "") { //om användaren har inte valt ut något datum till avresan 
        errors += "The depature date cannot be empty. <br>";
    }
    if (secondDate.value === "") { //om användaren har inte valt ut något datum till ankomst
        errors += "The return date cannot be empty. <br>"
    }
    errorDate.innerHTML = errors;
    if (errors === "") {
        firstDate.classList.remove("inputError");
        secondDate.classList.remove("inputError");
    } else {
        firstDate.classList.add("inputError");
        secondDate.classList.add("inputError");
    }
    return errors === "";
}