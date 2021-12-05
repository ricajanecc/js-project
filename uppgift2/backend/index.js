// installerade dependencies och initierade express app. Jag använde fs promises men eftersom jag behöver funktionen existsSync() och samtidigt behöver vanliga fs.
const express = require('express');
const app = express();
const fs = require("fs/promises");
const fso = require("fs");
//Jag började med en tom array 
let entries = [];
//Eftersom jag kommer ha en JSON body, jag använder express för att parsa den. 
app.use(express.json())
//Om användaren behöver en statisk fil, söker jag den från static mapp.
app.use("/static",express.static("../frontend/static"));
//Om användaren behöver en html fil, hämtas 
app.get("/",async function(req, res){
    res.setHeader("content-type", "text/html");
    res.statusCode = 200;
    const data = await fs.readFile("../frontend/guestbook.html");
    res.end(data);
});

app.get("/entries",function(req, res){
    res.setHeader("content-type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify(entries));
});

app.post("/entries",async function(req,res){
    const entrie = req.body;
    entrie.date = new Date().toUTCString();
    entries.push(entrie);
    fs.writeFile("./data.json", JSON.stringify(entries));
    res.statusCode = 200;
    res.end();
});

app.use(function(req,res){
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not found');
})
async function init(){
    if(fso.existsSync("./data.json")){
        entries = JSON.parse(await fs.readFile("./data.json", "utf-8"));
    }else{
        entries = [];
    }
    app.listen(8080);
}
init();