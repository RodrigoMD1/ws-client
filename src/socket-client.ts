import { Manager, Socket } from "socket.io-client"

let socket: Socket;

export const connectToServer = (token: string) => {

    // !npm install socket.io-client esto se tiene que instalar en la terminal que es el socket pero para el cliente  , revisar que el cliente y servidor tengan la misma version sino no funciona 

    // http://localhost:3000/socket.io/socket.io.js

    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
        extraHeaders: {
            hola: 'holiss',
            authentication: token
        }
    });

    socket?.removeAllListeners();
    socket = manager.socket('/'); // por defecto se conecta al route 
    // manager.socket('/productos '); este es otro por ejemplo 


    addListeners()
}

// TODO  averiguar para poder guardar los ultimos mensajes que se escribieron por ejemplo los ultimos 10 mensajes del chat 



const addListeners = () => {

    // esto son los eventos que voy a estar escuchando y emitiendo 
    const serverStatusLabel = document.querySelector('#server-status')!;
    const clientsUl = document.querySelector('#clients-ul')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;



    ////////////////////////////////////////////////////////////////////////////////
    // si quiero escuchar eventos que vienen del servidor es socket.on
    // si quiero hablar con el servidor o emitir al servidor es socket.emit

    socket.on('connect', () => {
        serverStatusLabel.innerHTML = 'connected'
    })

    socket.on('disconnect', () => {
        serverStatusLabel.innerHTML = 'disconnected'
    })

    ////////////////////////////////////////////////////////////////////////////////

    // este es el evento que permite escuchar al servidor y mostrar quien esta conectado 
    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = '';
        clients.forEach(clientId => {
            clientsHtml += `
                <li>${clientId}</li>
            `
        });
        clientsUl.innerHTML = clientsHtml;
    });

    ////////////////////////////////////////////////////////////////////////////////

    // este es el evento que envia al servidor lo que uno escribio 
    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (messageInput.value.trim().length <= 0) return;


        socket.emit('message-from-client', {
            id: 'YO',
            message: messageInput.value
        });

        messageInput.value = '';

    });
    ////////////////////////////////////////////////////////////////////////////////

    // este es el evento que permite escuchar del servidor los datos osea se envia info al server el lo recibe despues lo tiene que enviar devuelta bueno esta parte cuando vuelva la info del server es esta :) 

    socket.on('message-from-server', (payload: { fullName: string, message: string }) => {
        const newMessage = `
            <li>
                <strong>${payload.fullName}</strong>
                <span>${payload.message}</span>
            </li>
        `;
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.append(li);


    })

    ////////////////////////////////////////////////////////////////////////////////



}