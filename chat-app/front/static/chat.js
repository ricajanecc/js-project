window.onload = () => {
    let socket = io();
    let nickName = "";

    let chatForm = document.getElementById("chatForm");
    let chatInput = document.getElementById("chatInput");
    let nickForm = document.getElementById("nickForm");
    let nickInput = document.getElementById("nickInput");

    nickForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (nickInput.value) {
            nickName = nickInput.value;
            document.getElementById("nickContainer").style.display = "none";
            document.getElementById("chatContainer").style.display = "";
        }
    })

    chatForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (chatInput.value) {
            socket.emit('chat message', {
                text: chatInput.value,
                author: nickName,
                date: new Date()
            });
            chatInput.value = '';
        }
    });

    socket.on('chat message', function (msg) {
        const messages = document.getElementById("messages");
        let item = document.createElement('div');
        item.classList.add("bubble")
        if (msg.author === null){
            item.classList.add("system");
        } else {
            if (msg.author === nickName) {
                item.classList.add("recipient");
            }else{
                item.classList.add("sender");
            }
        }
        item.innerHTML = `<span class="author"></span>
        <span class="date"></span>
        <span class="text"></span>`;
        item.querySelector(".author").innerText=msg.author;
        item.querySelector(".date").innerText=new Date(msg.date).toLocaleTimeString();
        item.querySelector(".text").innerText=msg.text;
        messages.appendChild(item);
        messages.scrollTop = messages.scrollHeight; //scroll down automatically when someone sends messages
    });
};