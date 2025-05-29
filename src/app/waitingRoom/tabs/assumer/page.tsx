'use client';

import { useState, useRef, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';
import Image from 'next/image';
import { toast } from 'sonner';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  sendMessage,
  skipMatch,
  clearMessages,
  matched,
  leaveQueue,
  joinQueue,
} from '@/store/slices/socketSlice';
import { getChatSocket } from '@/Services/socketService';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ChatSystem = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.socket.messages);
  const chatConnected = useAppSelector((state) => state.socket.chatConnected);
  const matchedState = useAppSelector((state) => state.socket.matched);
  const { position, waiting, online } = useAppSelector((s) => s.socket);

  const [inputValue, setInputValue] = useState('');
  const [isMatching, setIsMatching] = useState(!matchedState);
  const [userSkipped, setUserSkipped] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router=useRouter();

  const suggestions = [
    'Assume something about me',
    'Take a wild guess...',
    "What's your first impression of me?",
  ];

  // Sync isMatching with Redux state
  useEffect(() => {
    setIsMatching(!matchedState);
  }, [matchedState]);

  // Auto scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle peer disconnection
  useEffect(() => {
    const chatSocket = getChatSocket();

    const onPeerLeft = () => {
      dispatch(clearMessages());
      dispatch(matched(null));
      toast.info('The other user skipped. Looking for a new match...');
    };

    chatSocket.on('peerLeft', onPeerLeft);
    return () => {
      chatSocket.off('peerLeft', onPeerLeft);
    };
  }, [dispatch]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = inputValue.trim();
    if (text && matchedState) {
      dispatch(sendMessage(text));
      setInputValue('');
    }
  };

  const handleRetry = () => {
    dispatch(clearMessages());
    dispatch(matched(null));
    dispatch(leaveQueue());
    dispatch(joinQueue());
    toast('Searching again…');
  };

  const handleSkip = () => {
    if (isMatching) return; 
    setUserSkipped(true);
    dispatch(clearMessages());
    dispatch(skipMatch());
    dispatch(matched(null));
    setIsMatching(true);
    router.push("/waitingRoom/tabs/assumer/feedback");
  };

  if (isMatching ) {
    return (
      <div className="flex flex-col items-center justify-center h-full pt-24 text-center">
        <svg className="animate-spin h-8 w-8 text-[#B30738] mb-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <p className="text-gray-600">Online users: {online}</p>
        <p className="text-gray-600">Queue Position: {position}</p>
        <p className="text-gray-800 font-medium mt-2">Matching you with someone...</p>
        <button
          onClick={handleRetry}
          className="mt-6 px-4 py-2 bg-[#B30738] text-white rounded hover:bg-[#901e36] transition"
        >
          Find someone else
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen md:pt-20 mt-12">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto pb-32 p-4 space-y-4">
        {messages.map((m) => {
          const isPeer = m.peerId === matchedState?.peer;
          return (
            <div key={m.timestamp} className={`flex ${isPeer ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start max-w-xs md:max-w-md lg:max-w-lg ${isPeer ? 'flex-row-reverse' : ''}`}>
                <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden">
                  <Image
                    src={
                      isPeer
                        ? 'https://res.cloudinary.com/dipywb0lr/image/upload/v1746702005/image_jmhhxy.png'
                        : 'https://res.cloudinary.com/dipywb0lr/image/upload/v1746702005/image_qkwdzs.jpg'
                    }
                    alt="User avatar"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div
                  className={`mx-2 px-4 py-2 rounded-lg ${
                    isPeer
                      ? 'bg-[#B30738] text-white rounded-tr-none'
                      : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
        <div className="fixed md:ml-72 bottom-0 left-0 right-0 bg-white">
          {messages.length === 0 && (
            <div className="px-4 py-1 grid md:grid-cols-3 w-full gap-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setInputValue(s)}
                  className="text-sm md:text-lg border border-gray-400 px-3 py-2 w-full hover:bg-gray-200 rounded-full text-gray-700 transition"
                  disabled={isMatching}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <div className="p-4 flex flex-col md:flex-row items-center gap-2">
            <form
              onSubmit={handleSend}
              className="flex flex-1 border border-gray-300 rounded-lg items-center"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 px-4 py-2"
                disabled={isMatching}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isMatching}
                className="px-4 py-2 disabled:opacity-50"
              >
                <FiSend color="#B30738" size={20} />
              </button>
            </form>
            <button
              onClick={handleSkip}
              disabled={isMatching}
              className="px-4 py-2 bg-[#B30738] rounded text-white disabled:opacity-50"
            >
              Skip User
            </button>
          </div>
        </div>
    </div>
  );
};

export default ChatSystem;
