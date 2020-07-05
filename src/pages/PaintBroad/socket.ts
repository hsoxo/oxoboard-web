import io from 'socket.io-client'
const HOST = 'ws://localhost:8081/'

export const socketPB = io(HOST)
