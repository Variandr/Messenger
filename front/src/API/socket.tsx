import io from "socket.io-client"

const socket = io('http://localhost:5000', {
    extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
})
export default socket