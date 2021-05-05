const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('ding.mp3');

const userName = prompt("Enter Your Name to Join");
socket.emit('new-user-joined', userName);

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left')
        audio.play();
}


socket.on('user-joined', name =>{
    append(`<-- ${name} joined the chat -->`, 'left');
})

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})


socket.on('receive', data => {
    append(`${data.name} : ${data.message}`, 'left');
})

socket.on('leave', name => {
    append(`<-- ${name} left the chat. -->`, 'left');
})