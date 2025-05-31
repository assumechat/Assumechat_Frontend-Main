'use client';

import { useState, useRef, useEffect } from 'react';
import { FiInfo, FiSend } from 'react-icons/fi';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { sendMessage, skipMatch, clearMessages, matched, leaveQueue, joinQueue } from '@/store/slices/socketSlice';
import { toast } from "sonner"
import { getChatSocket } from '@/Services/socketService';
import { ChatEvent } from '@/types/Chat';
import { LogOutIcon } from 'lucide-react';


const ChatSystem = () => {
    const dispatch = useAppDispatch();
    const messages = useAppSelector(state => state.socket.messages);
    const chatConnected = useAppSelector(state => state.socket.chatConnected);
    const matchedState = useAppSelector(state => state.socket.matched);
    const { position, waiting, online } = useAppSelector(s => s.socket);
    const [inputValue, setInputValue] = useState('');
    const [isMatching, setIsMatching] = useState(!matchedState); // Manual state for UI sync
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [peerInfo, setPeerInfo] = useState<{ userId: string; userName?: string } | null>(null);
    // Listen for peer skip/leave events (handled below with getChatSocket)

    // Watch for own match updates (Redux)
    useEffect(() => {
        if (matchedState) {
            setIsMatching(false);
        } else {
            setIsMatching(true);
        }
    }, [matchedState]);

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const chatSocket = getChatSocket();

        function onPeerHandshake(payload: { userId: string; userName?: string }) {
            toast(`${payload.userName ?? 'Peer'} has joined the room!`);
            // you can also store these in Redux if you want
            setPeerInfo(payload);
        }

        chatSocket.on(ChatEvent.HANDSHAKE, onPeerHandshake);
        return () => {
            chatSocket.off(ChatEvent.HANDSHAKE, onPeerHandshake);
        };
    }, [dispatch]);

    // Send a chat message
    const handleSend = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const text = inputValue.trim();
        if (text && matchedState) {
            dispatch(sendMessage(text));
            setInputValue('');
        }
    };

    // Skip to next user
    const handleSkip = () => {
        setIsMatching(true);
        dispatch(clearMessages());
        dispatch(skipMatch());
        toast.success('Skipped user, searching for a new match...');
        handleRetry();
    };


    const handleRetry = () => {
        // clear any stale chat state
        dispatch(clearMessages());
        dispatch(matched(null));
        // leave & rejoin the queue
        dispatch(leaveQueue());
        dispatch(joinQueue());
        toast('Searching again…');
    };

    useEffect(() => {
        const chatSocket = getChatSocket();
        function onPeerLeft() {
            dispatch(clearMessages());
            dispatch(matched(null));
            toast.info('The other user skipped. Looking for a new match...');
        }
        chatSocket.on('peerLeft', onPeerLeft);
        return () => {
            chatSocket.off('peerLeft', onPeerLeft);
        };
    }, [dispatch]);
    // Show loader while matching
    if (isMatching) {
        return (
            <div className="flex flex-col items-center justify-center h-full pt-24">
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

    const suggestions = [
        'Assume something about me',
        'Take a wild guess...',
        "What's your first impression of me?"
    ];

    return (
        <div className="flex flex-col md:mt-20 h-screen rounded-2xl border-4 bg-gray-200">
            {/* Top Bar - Sticky */}
            <div className="sticky top-0 z-10 m-4 p-4 bg-white rounded-3xl flex items-center justify-between border-b border-gray-300">
                <div className="flex items-center space-x-3">
                    {peerInfo && (
                        <>
                            <div className="h-12 w-12 rounded-full overflow-hidden">
                                <Image
                                    src="https://res.cloudinary.com/dipywb0lr/image/upload/v1746702005/image_qkwdzs.jpg"
                                    alt="User avatar"
                                    width={100}
                                    height={100}
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h2 className="font-semibold text-[#B30738]">{peerInfo.userName ?? peerInfo.userId}</h2>
                            </div>
                        </>
                    )}
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleSkip}
                        disabled={isMatching}
                        className="p-2 border-[#B30738] border-1 rounded-xl text-gray-600 hover:text-gray-900"
                    >
                        <LogOutIcon color='#B30738' size={20} />
                    </button>
                    <button className="p-2 border-[#B30738] border-1 rounded-xl text-gray-600 hover:text-gray-900">
                        <FiInfo color='#B30738' size={20} />
                    </button>
                </div>
            </div>

            {/* Chat Area - Flexible Space */}
            <div className="flex-1 overflow-y-auto p-6 pb-32">
                {/* Messages */}
                <div className="space-y-4">
                    {messages.map((m, idx) => (
                        <div
                            key={m.timestamp}
                            className={`flex ${m.peerId === matchedState?.peer ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex items-start max-w-xs md:max-w-md lg:max-w-lg ${m.peerId === matchedState?.peer ? 'flex-row-reverse' : ''}`}>
                                <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden">
                                    <Image
                                        src={m.peerId === matchedState?.peer ? 'https://res.cloudinary.com/dipywb0lr/image/upload/v1746702005/image_jmhhxy.png' : 'https://res.cloudinary.com/dipywb0lr/image/upload/v1746702005/image_qkwdzs.jpg'}
                                        alt="User avatar"
                                        width={32}
                                        height={32}
                                        className="object-cover"
                                    />
                                </div>
                                <div className={`mx-2 px-4 py-2 rounded-lg ${m.peerId === matchedState?.peer
                                    ? 'bg-[#B30738] text-white rounded-tr-none'
                                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                                    }`}
                                >
                                    {m.content}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            {/* Input Area - Fixed Bottom */}
            <div className="sticky bottom-0 border-t border-gray-300 p-3 bg-gray-200">
                {messages.length === 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-24 w-full ">
                        {suggestions.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => setInputValue(s)}
                                className="text-xs md:text-sm border border-gray-400 px-3 py-1.5 hover:bg-gray-100 rounded-full text-gray-700 transition"
                                disabled={isMatching}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                )}
                <form onSubmit={handleSend} className="flex mt-3 border border-gray-700 rounded-lg items-center max-w-5xl mx-auto">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your message here..."
                        className="flex-1 px-4 py-2  rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#B30738]"
                        disabled={isMatching}
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim() || isMatching}
                        className="px-4 py-2  text-white rounded-r-lg disabled:opacity-50"
                    >
                        <FiSend size={20} color='#B30738' />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatSystem;