import io from 'socket.io-client'
const HOST = `${process.env.WS_BASE}/paint`

export const socketPB = io(HOST)
