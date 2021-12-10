// installerade dependencies och initierade express app. Jag använde fs promises men eftersom jag behöver funktionen existsSync() och samtidigt behöver vanliga fs.
const express = require('express');
const app = express();
const fs = require("fs/promises");
const fso = require("fs");
//Jag började med en tom array 
let entries = [];
//Eftersom jag kommer ha en JSON body, jag använder express för att parsa den. 
app.use(express.json())
//Om klient behöver en statisk fil, söker jag den från static mapp.
app.use("/static",express.static("../frontend/static"));
//Om klient behöver en html fil, hämtas från fil system  
app.get("/",async function(req, res){ 
    res.setHeader("content-type", "text/html"); //sätter header till content type html 
    res.statusCode = 200; //status okej/bra
    const data = await fs.readFile("../frontend/guestbook.html"); //använder promises och await för att läsa filen automatiskt
    res.end(data); //skickas html fill till klient
});
//När klient hämtas entries, så skickas entries 
app.get("/entries",function(req, res){
    res.setHeader("content-type", "application/json"); //sätter header till content type  json 
    res.statusCode = 200;
    res.end(JSON.stringify(entries)); //konverteras entries till en sträng och skickar till klient
});
//när klient skickar en ny entry så läggs den tillsammans med dem andra entries. Därefter sparas till data.json fil
app.post("/entries", function(req,res){
    const entry = req.body; //tar body från request till entry objekt 
    entry.date = new Date().toUTCString(); //sätter datum av entry till UTC av nu 
    entries.push(entry); //tillsätter entry till entries
    fs.writeFile("./data.json", JSON.stringify(entries)); //skriver en json entries till data.json
    res.statusCode = 200;
    res.end();
});
//om klient är i en fel path, så skickar 404
app.use(function(req,res){
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not found');
})
//funktionen exekverar i början av programmet, initialiserar entries och påbörjar server 
async function init(){
    //här ser man om data.json existerar 
    if(fso.existsSync("./data.json")){
        //om det existerar läser in unicode och konverterar json till objekt entries 
        entries = JSON.parse(await fs.readFile("./data.json", "utf-8"));
    }else{
        //om data.json inte existerar, initialiseras entries som en tom sträng 
        entries = [];
    }
    app.listen(8080); //påbörjar webbserver från port 8080
}
init(); //anropar init() funktionen 