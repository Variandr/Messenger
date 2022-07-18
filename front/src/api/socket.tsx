import lookup from 'socket.io-client';
import { createContext } from 'react';

export const socket = lookup('http://localhost:5000', {
  extraHeaders: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
  autoConnect: false,
});
export const SocketContext = createContext(socket);
