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
async function sendEntry() {
    const firstName = document.getElementById("firstName");
    const lastName  = document.getElementById("lastName");
    const email = document.getElementById("email");
    const telNum = document.getElementById("telNum");
    const comment = document.getElementById("commentText");
    const entry = {
        "first-name": firstName.value,
        "last-name": lastName.value,
        "email": email.value,
        "phone": telNum.value,
        "comment": comment.value
    }
    await fetch("/entries", {
        method:"POST", 
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(entry),
    });
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    telNum.value = "";
    comment.value = "";
    getEntries();
}

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

async function getEntries(){
    const data = await fetch("/entries").then(data=>data.json());
    const historyContainer = document.querySelector(".history-container");
    historyContainer.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        const div = document.createElement("div");
        div.innerHTML =`
    <details>
        <summary>
            <b class="name"></b>
            <span class="date"></span>
        </summary>
        <p class="phone"></p>
        <p class="email"></p>
    </details>
    <p class="comment"></p>`;
    div.querySelector(".name").innerText = data[i]["first-name"]+ " " + data[i]["last-name"];
    div.querySelector(".phone").innerText = data[i]["phone"];
    div.querySelector(".email").innerText = data[i]["email"];
    div.querySelector(".comment").innerText = data[i]["comment"];
    div.querySelector(".date").innerText = data[i]["date"];
    historyContainer.appendChild(div);
    }
}

getEntries();