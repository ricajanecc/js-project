$(document).ready(function(){ //detta function gör <p> taggen till röd färg när man klickar på button
    $("#red").click(function(){ //selekterar en element med id="red"
        $("#paraColor").addClass("red"); //adderar class här
        $("#paraColor").removeClass("green"); //detta gör att det tar bort det gröna färg och kunna byta till röda när man klickar på det igen
    })
})

$(document).ready(function(){ //här är också en funktion som gör <p> taggen till grön man klickar på button
    $("#green").click(function(){ 
        $("#paraColor").addClass("green");
        $("#paraColor").removeClass("red");
    })
})

$(document).ready(function(){ //här en funktion som gör att när man klickar på den så kommer ut ett meddelande
    $("#upAndDown").click(function(){ //här gör att nar man klickar på det
        $("#surprise").slideToggle("slow"); //så kommer ut meddelande
    })
})

$(document).ready(function(){ //en funktion som gör att när man klickar på en button 
    $("#disappear").click(function(){ //börjar försvinna rutorna
        $("#firstBox, #secondBox, #thirdBox").fadeToggle(2000); //rutorna bleknar i 2000 millisekunder 
    })
})

