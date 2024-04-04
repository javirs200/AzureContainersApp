import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'http://raspberry.mshome.net:3000';

const socket = io(URL, {
  autoConnect: false,
  transports: ['websocket','polling']// prefer ws
});

socket.on("connect_error", () => {
  // revert to classic upgrade
  console.log("socket conect error , socker obj -> ",socket);
  socket.io.opts.transports = ["polling", "websocket"];
});

socket.on('connect', () => {
    console.log('Socket connected');
    socket.emit('my_message', 'Hello server from client');
});

socket.on('my_response', (data) => {
  console.log('server response ',data);
});

export default socket;