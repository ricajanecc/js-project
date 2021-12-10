window.onload = () => {
    //initialiserar socket och nickName som tom 
    let socket;
    let nickName = "";
    //selekterar inputs och form 
    let chatForm = document.getElementById("chatForm");
    let chatInput = document.getElementById("chatInput");
    let nickForm = document.getElementById("nickForm");
    let nickInput = document.getElementById("nickInput");
    //när nickForm är skickad
    nickForm.addEventListener('submit', function (e) {
        e.preventDefault(); //förhindar webbläsaren att tillkalla server 
        if (nickInput.value) { //om nickInput.value är inte tom 
            socket = io(); //initialiseras webb socket 
            nickName = nickInput.value; //läggs nickInput till nickName
            startMessages();
            socket.emit('nickname', nickName); //skickas nickName till servern 
            document.getElementById("nickContainer").style.display = "none"; //nickForm är gömms  
            document.getElementById("chatContainer").style.display = ""; //visar upp chat appen
        }
    })

    function startMessages(){
        //när användaren skickar en meddelande 
        chatForm.addEventListener('submit', function (e) {
            e.preventDefault(); 
            if (chatInput.value) { //om fältet är inte tom 
                const msg = { //skapas message objekt 
                    text: chatInput.value,
                    author: nickName,
                    date: new Date()
                }
                socket.emit('chat message', msg); //skickas meddelande till server 
                drawMessage(msg); //skriver ut msg i webbläsaren
                chatInput.value = ''; //tilldelar input till en tom sträng 
                socket.emit('typing end'); //anropar server för att informera att användaren har slutat skriva
            }
        });
        //när användaren skriver 
        chatInput.addEventListener("input", ()=>{
            if(chatInput.value === ""){ //när användaren har raderat meddelande 
                socket.emit('typing end'); //skickar typing end till server
            }else{
                socket.emit('typing start'); //annars skickas typing start för att informera att användaren håller på att skriva 
            }
        })
        socket.on('chat message', function (msg) {
            drawMessage(msg); //när klient får msg, skriver ut det för att användaren ska se 
        });
        //när klient tar emot users list 
        socket.on("users",(users)=>{
            const container = document.getElementById("users-container"); //selekterar users-container 
            container.innerHTML = ""; //raderar vad container har
            for (let index = 0; index < users.length; index++) { //loopar igen users 
                const user = users[index];
                const div = document.createElement("div"); //skapar en tom div taggen 
                div.innerHTML=`
                <span class="ball">&#9679;</span>
                <span class="name"></span>
                <span class="typing"></span>
                `; //skapade en struktur 
                div.querySelector(".name").innerText = user.name; //sätter namnet av användaren som anslutar
                div.querySelector(".typing").innerText = user.typing?" typing...":""; //tilsätter typing om användaren håller på att skriva 
                container.appendChild(div); //tillsätter div taggen till container 
            }
        })
    }
    //funktionen skriver ut en meddelande till html 
    function drawMessage(msg){
        const messages = document.getElementById("messages"); //selekterar messages 
        let item = document.createElement('div'); //skapar en tom div taggen 
        item.classList.add("bubble"); //tillsätter en klass som är bubble till div-taggen
        if (msg.author === null){
            item.classList.add("system"); //om author är null, tillsättas class system till div 
        } else { 
            if (msg.author === nickName) {
                item.classList.add("recipient"); //om author är lika med nickName, tillsättas class recipient till div 
            }else{
                item.classList.add("sender"); //annars tillsättas class sender 
            }
        }
        //struktur till div 
        item.innerHTML = `<span class="author"></span>
        <span class="date"></span>
        <span class="text"></span>`;
        //sätter msg properties till div taggen 
        item.querySelector(".author").innerText=msg.author; 
        item.querySelector(".date").innerText=new Date(msg.date).toLocaleTimeString();
        item.querySelector(".text").innerText=msg.text;
        messages.appendChild(item); //tillsätter div taggen till container
        messages.scrollTop = messages.scrollHeight; //scroll ner när användaren skickar nya meddelande
    
    }
};