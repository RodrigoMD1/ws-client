import { connectToServer } from './socket-client'
import './style.css'

// import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>

    <h2>Websocket - Client</h2>

    <input id="jwt-token" placeholder="Json Web Token" />

    <button id="btn-connect">Connect</button>




    <br/>
    <span id="server-status">offline</span>

    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input placeholder="message" id="message-input" />
    </form>


    <h3>Messages</h3>
    <ul id="messages-ul"></ul>


  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)


//connectToServer();
// esto va a ser que se conecte despues de estar validado con el jwt
//* cuidado con el ! que se pone al final que capaz se puede olvidar 
const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {

  if (jwtToken.value.trim().length <= 0) return alert('enter a valid jwt')
  connectToServer(jwtToken.value);

})