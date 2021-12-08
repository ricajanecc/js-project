const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path"); //library for working with URL
//redirects anything that goes to the static path and searches from front/static folder
app.use("/static", express.static("../front/static"));

//html file serve 
app.get('/', (req,res) => {
    res.sendFile(path.resolve("../front/index.html"));
})

io.on('connection', (socket) => {
    console.log("a user connected");
    socket.on('disconnect', () => {
        console.log("a user disconnected");
    })
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log("message received " + msg);
      io.emit('chat message', msg);
    });
  });

server.listen(3000, () => {
    console.log("Listening on *:3000")
});