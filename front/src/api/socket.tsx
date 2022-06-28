import lookup from 'socket.io-client';

const socket = lookup('http://localhost:5000', {
  extraHeaders: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
  autoConnect: false,
});
export default socket;
