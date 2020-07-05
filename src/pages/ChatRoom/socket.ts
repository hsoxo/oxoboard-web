import io from 'socket.io-client'
const HOST = 'ws://localhost:8080/'

export const socketCR = io(HOST)
