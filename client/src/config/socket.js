import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'http://raspberry.mshome.net:3000';

const socket = io(URL, {
  autoConnect: false,
  transports: ['websocket','polling']// prefer ws
});

export default socket;