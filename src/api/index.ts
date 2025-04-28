import { io } from "socket.io-client"

export const api = 'https://nest-project-angular-craft.onrender.com'
//export const api = 'http://localhost:3000'
export const socket = io(api)


