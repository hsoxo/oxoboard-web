import io from 'socket.io-client'
const HOST = `${process.env.WS_BASE}/chat`

export const socketCR = io(HOST)
