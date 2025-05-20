
// src/store/socketSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { getQueueSocket, getChatSocket } from '@/Services/socketService';
import { Message } from "@/types/Chat"
// Types for queue events
interface QueueUpdate {
  position: number | null;
  waiting: number;
  online: number;
}

// Types for matched event
interface MatchedInfo {
  roomId: string;
  peer: string;
}


// Redux slice state
interface SocketState {
  connected: boolean;
  position: number | null;
  waiting: number;
  online: number;
  matched: MatchedInfo | null;
  chatConnected: boolean;
  messages: Message[];
}

const initialState: SocketState = {
  connected: false,
  position: null,
  waiting: 0,
  online: 0,
  matched: null,
  chatConnected: false,
  messages: [],
};

// Thunk: initialize sockets and set up listeners
export const initSockets = createAsyncThunk<void, void, { state: RootState }>(
  'socket/init',
  async (_, { dispatch }) => {
    if (typeof window === 'undefined') return;

    const queueSocket = getQueueSocket();
    queueSocket.on('connect', () => dispatch(socketConnected(true)));
    queueSocket.on('disconnect', () => dispatch(socketConnected(false)));
    queueSocket.on('queueUpdate', (data: QueueUpdate) => dispatch(queueUpdate(data)));
    queueSocket.on('matched', (info: MatchedInfo) => {
      dispatch(matched(info));
      const chatSocket = getChatSocket();
      // Remove all old handlers for 'message'
      chatSocket.off('message');
      chatSocket.on('message', (msg: Message) => dispatch(addMessage(msg)));
      chatSocket.emit('joinRoom', { roomId: info.roomId });
    });
  }
);

// Thunk: join queue
export const joinQueue = createAsyncThunk<void, void, { state: RootState }>(
  'socket/joinQueue',
  async () => {
    const socket = getQueueSocket();
    socket.emit('joinQueue');
  }
);

// Thunk: leave queue
export const leaveQueue = createAsyncThunk<void, void, { state: RootState }>(
  'socket/leaveQueue',
  async () => {
    const socket = getQueueSocket();
    socket.emit('leaveQueue');
  }
);

// Thunk: send chat message
export const sendMessage = createAsyncThunk<void, string, { state: RootState }>(
  'socket/sendMessage',
  async (content, { dispatch, getState }) => {
    const info = getState().socket.matched;
    if (!info) return;
    const socket = getChatSocket();
    // Provide full backend shape:
    const msg: Message = {
      roomId: info.roomId,
      senderId: socket.id || "",
      peerId: info.peer,
      content,
      timestamp: Date.now(),
    };
    socket.emit('message', msg);
    //dispatch(addMessage(msg));
  }
);

// Create slice
const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    socketConnected(state, action: PayloadAction<boolean>) {
      state.connected = action.payload;
    },
    queueUpdate(state, action: PayloadAction<QueueUpdate>) {
      const { position, waiting, online } = action.payload;
      state.position = position;
      state.waiting = waiting;
      state.online = online;
    },
    matched(state, action: PayloadAction<MatchedInfo>) {
      state.matched = action.payload;
    },
    chatConnected(state, action: PayloadAction<boolean>) {
      state.chatConnected = action.payload;
    },
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
  },
});

export const { socketConnected, queueUpdate, matched, chatConnected, addMessage } = socketSlice.actions;
export default socketSlice.reducer;