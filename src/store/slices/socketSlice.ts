// src/store/socketSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { getQueueSocket, getChatSocket } from '@/Services/socketService';
import { Message } from '@/types/Chat';
import { ChatEvent } from '@/types/Chat';
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

// Thunk: initialize sockets and set up listeners (call this once at app start)
export const initSockets = createAsyncThunk<void, void, { state: RootState }>(
  'socket/init',
  async (_, { dispatch, getState }) => {
    if (typeof window === 'undefined') return;

    const queueSocket = getQueueSocket();
    queueSocket.on('connect', () => dispatch(socketConnected(true)));
    queueSocket.on('disconnect', () => dispatch(socketConnected(false)));
    queueSocket.on('queueUpdate', (data: QueueUpdate) => dispatch(queueUpdate(data)));

    queueSocket.on('matched', (info: MatchedInfo) => {
      // 1) Store match info
      dispatch(matched(info));

      // 2) Setup chat socket for this room
      const chatSocket = getChatSocket();

      // Track chat-namespace connection state
      chatSocket.off('connect');
      chatSocket.on('connect', () => dispatch(chatConnected(true)));
      chatSocket.off('disconnect');
      chatSocket.on('disconnect', () => dispatch(chatConnected(false)));

      // Receive messages
      chatSocket.off('message');
      chatSocket.on('message', (msg: Message) => dispatch(addMessage(msg)));

      // Handle peer leaving
      chatSocket.off('peerLeft');
      chatSocket.on('peerLeft', ({ peerId, roomId }) => {
        dispatch(clearMessages());
        dispatch(matched(null));
        dispatch(chatConnected(false));
      });

      // ─── HANDSHAKE ───

      // a) Tear down any old JOINED_ROOM listener
      chatSocket.off(ChatEvent.JOINED_ROOM);

      // b) Wait for the server to confirm you've joined…
      chatSocket.once(ChatEvent.JOINED_ROOM, ({ roomId }) => {
        // Grab your user once from the store:
        const userObj = getState().user.user;  // ← your auth slice
        if (userObj) {
          chatSocket.emit(ChatEvent.HANDSHAKE, {
            roomId,
            userId: userObj._id,
            userName: userObj.name,
          });  // ← NEW: send your metadata
        }
      });
      // Join the chat room
      chatSocket.emit('joinRoom', { roomId: info.roomId });
    });
  }
);

// Thunk: join queue
export const joinQueue = createAsyncThunk<void, void, { state: RootState }>(
  'socket/joinQueue',
  async () => {
    getQueueSocket().emit('joinQueue');
  }
);

// Thunk: leave queue
export const leaveQueue = createAsyncThunk<void, void, { state: RootState }>(
  'socket/leaveQueue',
  async () => {
    getQueueSocket().emit('leaveQueue');
  }
);

// Thunk: send chat message
export const sendMessage = createAsyncThunk<void, string, { state: RootState }>(
  'socket/sendMessage',
  async (content, { getState }) => {
    const info = getState().socket.matched;
    if (!info) return;

    const chatSocket = getChatSocket();
    const msg: Message = {
      roomId: info.roomId,
      senderId: chatSocket.id || '',
      peerId: info.peer,
      content,
      timestamp: Date.now(),
    };
    chatSocket.emit('message', msg);
  }
);

// Thunk: skip current match and rejoin queue
export const skipMatch = createAsyncThunk<void, void, { state: RootState }>(
  'socket/skipMatch',
  async (_, { dispatch, getState }) => {
    const info = getState().socket.matched;
    if (info) {
      // Notify backend
      getChatSocket().emit('leaveRoom', { roomId: info.roomId });
      dispatch(chatConnected(false));
    }

    // Leave and rejoin queue
    await dispatch(leaveQueue());
    dispatch(clearMessages());
    dispatch(matched(null));
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
      state.position = action.payload.position;
      state.waiting = action.payload.waiting;
      state.online = action.payload.online;
    },
    matched(state, action: PayloadAction<MatchedInfo | null>) {
      state.matched = action.payload;
    },
    chatConnected(state, action: PayloadAction<boolean>) {
      state.chatConnected = action.payload;
    },
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
    clearMessages(state) {
      state.messages = [];
    },
  },
});

export const {
  socketConnected,
  queueUpdate,
  matched,
  chatConnected,
  addMessage,
  clearMessages,
} = socketSlice.actions;

export default socketSlice.reducer;
