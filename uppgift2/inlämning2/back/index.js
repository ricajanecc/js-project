const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const {
    Server
} = require("socket.io");
const io = new Server(server);
const path = require("path"); //bibliotek för att jobba med URL
//redirect allt som går till static path och söker från front/static mapp
let users = [];
app.use("/static", express.static("../front/static"));

//html file 
app.get('/', (req, res) => {
    res.sendFile(path.resolve("../front/index.html"));
})
//exekverar när webb socket påbörjar
io.on('connection', (socket) => {
    let nickname; //börjar med nickName som tom 
    //när användaren skickar nickName 
    socket.on("nickname", (nick) => {
        nickname = nick; //läggs nickName i en variabel
        users.push({name:nickname, typing:false}); //pushar en ny user till user lists
        io.emit("users", users); //skickar uppdaterat users till klient
        console.log(nickname + " connected");
        socket.emit('chat message', { //skickar en välkommen text till användaren 
            text: 'Welcome to the chatroom', 
            author: null 
        });
        socket.broadcast.emit("chat message", { //skickar en meddelande att en ny användaren anslutar till chatten 
            text: nickname + ' has joined the chat',
            author: null
        })
    })
    
    socket.on("typing start", ()=>{  //när användaren börjar skriva 
        const user = users.find(user => user.name === nickname); //söker användaren i user list 
        user.typing = true; //tilldelar som true 
        io.emit("users", users); //skickar en ny uppdaterat user list till alla
    })
    socket.on("typing end", ()=>{ //när användaren slutar skriva
        const user = users.find(user => user.name === nickname);
        user.typing = false; //tilldelar som false
        io.emit("users", users);  //skickar en ny uppdaterat user list till alla
    })
    socket.on('chat message', (msg) => { //när en meddelande ankom
        console.log(msg.author+ " sent " + msg.text); 
        socket.broadcast.emit('chat message', msg); //skickar meddelande till alla som är kvar i chatten 
    });
    socket.on('disconnect', () => { //när användaren koppla ur 
        users = users.filter(user => user.name !== nickname); //raderar user från user list
        io.emit("users", users); //skickar en ny uppdaterat list till alla 
        console.log(nickname+" disconnected");
        socket.broadcast.emit("chat message", { //skickar meddelande till alla som är kvar i chatten 
            text: nickname + ' has left the chat',
            author: null
        })

    })
});

server.listen(3000, () => {
    console.log("Listening on *:3000")
});