// src/services/socketService.ts
import { io, Socket } from 'socket.io-client';

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL || '';
// e.g. NEXT_PUBLIC_API_URL="http://localhost:3000" in your .env

let queueSocket: Socket | null = null;
let chatSocket: Socket | null = null;

export function getQueueSocket(): Socket {
  if (!queueSocket) {
    queueSocket = io(`${BASE}queue`, {
      transports: ['websocket'],
      // you can also set path, auth, etc here
    });
  }
  return queueSocket;
}

export function getChatSocket(): Socket {
  if (!chatSocket) {
    chatSocket = io(`${BASE}chat`, {
      transports: ['websocket'],
    });
  }
  return chatSocket;
}
