window.onload = ()=>{
    let socket = io();

    let chatForm = document.getElementById("chatForm");
    let chatInput = document.getElementById("chatInput");

    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (chatInput.value) {
            socket.emit('chat message', chatInput.value);
            chatInput.value = '';
        }
    });

    socket.on('chat message', function(msg) {
        let item = document.createElement('div');
        item.classList.add("bubble", "recipient")
        item.textContent = msg;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });
};

