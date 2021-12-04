//Uppgift 1 och 2
let multiTableElement = document.getElementById("multiTable"); //selekterar elementet som har id multiTable
let tableResult = ""; //skapade en tom string 
for (let i = 1; i < 11; i++ ) {
    tableResult = tableResult + "<div class=\"multiTab\"> Multiplication Table of " + i + " :"  + "<br>"; //här adderar titel till multiplication tables
    for (let j = 1; j < 11; j++) {
        tableResult = tableResult + i + "*" + j + "=" + (i * j) + "<br>"; //adderar multiplication till multiplication tables.
    }
    tableResult = tableResult + "</div>"; //stänger av <div> taggen av multiplication tables
}
multiTableElement.innerHTML = tableResult; // adderar resultatet till HTML 

//uppgift 3 
let answer = Math.floor(Math.random() * 100 + 1); //skapar en random siffra från 1-100
let responseElement = document.getElementById("response"); //selekterar element som har id response
document.getElementById("submitButton").onclick = function() { //När man klickar på submit button
    let userGuess = document.getElementById("guessNumber").value; //får gissning från användaren
    if (answer.toString() === userGuess) { //Om användaren gissar rätt
        responseElement.innerText = "Correct!"; //uppvisar detta meddelande
    } else {
        if (answer > Number(userGuess)) { //Om anvandaren gissa ett mindre tal
           responseElement.innerText = "Too low!"; // uppvisar till konsolen att talet är för låg
        }
        else {
            responseElement.innerText = "Too high!"; // om siffran är högre än svaret uppvisar detta meddelande 
        }
    }
}
//uppgift 4  
function isConsonant(letter) { //denna function accepterar en string med en bokstav inuti och returnerar true om bokstaven är en konsonant och false om bokstaven är en vokal
    const vowel = "aeouiäåöAEOUIÄÅÖ"; // här är alla bokstaver som ska detekteras som vokal
    let isConsonant = true; // förinställd consonant som true
    for (let i = 0; i < vowel.length; i++) {
      if (letter === vowel[i]) { // om bokstaven har en vokal, blir isConsonant till false 
        isConsonant = false;
      }
    }
    return isConsonant; // returnerar isConsonant
  }

let translatedWordElement = document.getElementById("translated"); //  selekterar translated word och wordToTranslate element
let userWordElement = document.getElementById("wordToTranslate");
userWordElement.oninput = function() { //när user word bytt
    let userWord = userWordElement.value; //får value som användaren har matat in
    let translationWord = ""; //vi tilldelar string var vi ska lagra översättning
    for (let i = 0; i < userWord.length; i++) { //för varje bokstaven in i user word
        let letter = userWord[i];
        let isOurLetterCons = isConsonant(letter); // här ser vi om bokstaven är en konsonant genom att använda den funktionen före
        if (isOurLetterCons) {
            translationWord = translationWord + letter + "o" + letter; //om bokstaven är konsonant  byter det till bokstaven + o + bokstaven
        } else {
            translationWord = translationWord + letter; // om det är en vokal, blir det som det är
        }
    }
    translatedWordElement.innerText = translationWord; //  här uppvisar översättning till translatedWordElement
}

//Uppgift 5
class Person { //skapade en class som heter Person 
    constructor(name, address) { //med 2 attribut 
        this.name = name;
        this.address = address; 
    }
    work(occupation) { //2 metoder till att vardera klassen 
        console.log(this.name + " is working as a " + occupation);
    }
    sleep(hour) {
        console.log(this.name + " is sleeping for " + hour + " hours.");
    }

} 
class Student extends Person { //subklassen, eftersom det är en subklass till klassen Person, kan det också ha samma attribut som class Person
    constructor(name, grade, address) {
        super(name);
        this.grade = grade;
        this.address = address;
    }
    study(subject) {
        console.log(this.name + " is studying " + subject + this.grade + ".");
    }
    eat(food) {
        console.log(this.name + " is eating " + food + ".");
    }
   
}

const person = new Person("Michelle", "Downtown"); 
person.work("waitress"); //här kommer skriva ut: Michelle is working as a waitress.
person.sleep(7); // här kommer skriva ut: Michelle is sleeping for 7 hours. 

const student = new Student("Rica", 1);
student.study("JavaScript"); //här kommer skriva ut: Rica is studying JavaScript 1. 
student.eat("ice cream"); //här kommer skriva ut: Rica is eating ice cream.
student.sleep(1); //här kommer skriva ut: Rica is sleeping for 1 hours.
student.work("cashier"); //här kommer skriva ut: Rica is working as a cashier.



