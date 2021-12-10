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
            sendEntry(); //uppvisar funktionen sendEntry
        } else { 
            errorForm.innerHTML = "There are errors in the form."; //annars uppvisar ett fel meddelande i errorForm element
        }
    })
}) 

//en funktion som skickar entry till server. 
async function sendEntry() {  
    //selekterar alla input från form
    const firstName = document.getElementById("firstName");
    const lastName  = document.getElementById("lastName");
    const email = document.getElementById("email");
    const telNum = document.getElementById("telNum");
    const comment = document.getElementById("commentText");
    //konstruerar entry objekt
    const entry = {
        "first-name": firstName.value,
        "last-name": lastName.value,
        "email": email.value,
        "phone": telNum.value,
        "comment": comment.value
    }
    //skickar entry objekt som en json till server 
    await fetch("/entries", {
        method:"POST", 
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(entry),
    });
    //tilldelar input till en tom sträng för att formen är tom  
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    telNum.value = "";
    comment.value = "";
    //uppdaterar entries genom att anropa denna funktion
    getEntries();
}
//validering, så att användaren anger rätt input 
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
//funktionen anropar server för att hämta entries och skriver ut entries till HTML 
async function getEntries(){
    const data = await fetch("/entries").then(data=>data.json()); //anropar server för att hämta entries och konverterar json till object 
    const historyContainer = document.querySelector(".history-container"); //här skriver ut entries genom att selektera container 
    historyContainer.innerHTML = ""; //raderar tidigare entries genom att tilldela container till en tom sträng
    for (let i = 0; i < data.length; i++) { //loopar igenom entries 
        const div = document.createElement("div"); //skapar en div element 
        div.innerHTML =`
    <details>
        <summary>
            <b class="name"></b>
            <span class="date"></span>
        </summary>
        <p class="phone"></p>
        <p class="email"></p>
    </details>
    <p class="comment"></p>`; //en struktur in i elementet 
    //sätter properties av entries in i div taggen genom att använda innerText, detta förhindrar XSS attacks
    div.querySelector(".name").innerText = data[i]["first-name"]+ " " + data[i]["last-name"];
    div.querySelector(".phone").innerText = data[i]["phone"];
    div.querySelector(".email").innerText = data[i]["email"];
    div.querySelector(".comment").innerText = data[i]["comment"];
    div.querySelector(".date").innerText = data[i]["date"]; 
    historyContainer.appendChild(div); //sätter div taggen in i container
    }
}

getEntries(); //hämtar entries från server, första gången den laddar 