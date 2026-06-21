import { io } from 'socket.io-client';

// create a Socket.IO client connection from your frontend to your backend server.
export const socket = io('http://13.239.247.231');