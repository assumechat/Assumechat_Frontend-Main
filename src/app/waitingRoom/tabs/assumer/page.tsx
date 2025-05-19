// src/components/ChatSystem.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { sendMessage } from '@/store/slices/socketSlice';

const ChatSystem = () => {
    const dispatch = useAppDispatch();
    const messages = useAppSelector(state => state.socket.messages);
    const chatConnected = useAppSelector(state => state.socket.chatConnected);
    const matched = useAppSelector(state => state.socket.matched);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const suggestions = [
        'Assume something about me',
        'Take a wild guess...',
        "What's your first impression of me?"
    ];

    // Scroll to bottom on new messages
    useEffect(() => {
        console.log(messages)
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Send a chat message
    const handleSend = () => {
        const text = inputValue.trim();
        if (text && matched) {
            dispatch(sendMessage(text));
            setInputValue('');
        }
    };

    // Send on Enter
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Show waiting state if not yet matched
    if (!matched) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-600">Waiting to be matched…</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen md:mt-32 mt-12">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto pb-32">
                <div className="p-4 space-y-4">
                    {messages.map((m, idx) => (
                        <div
                            key={m.timestamp}
                            className={`flex ${m.peerId === matched.peer ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex items-start max-w-xs md:max-w-md lg:max-w-lg ${m.peerId === matched.peer ? 'flex-row-reverse' : ''}`}>
                                <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden">
                                    <Image
                                        src={m.peerId === matched.peer ? 'https://res.cloudinary.com/dipywb0lr/image/upload/v1746702005/image_jmhhxy.png' : 'https://res.cloudinary.com/dipywb0lr/image/upload/v1746702005/image_qkwdzs.jpg'}
                                        alt="User avatar"
                                        width={32}
                                        height={32}
                                        className="object-cover"
                                    />
                                </div>
                                <div className={`mx-2 px-4 py-2 rounded-lg ${m.peerId === matched.peer
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

            {/* Fixed Bottom Controls */}
            <div className="fixed md:ml-72 bottom-0 left-0 right-0 bg-white">
                {/* Suggestions */}
                <div className="px-4 py-1 grid md:grid-cols-3 w-full gap-2">
                    {suggestions.map((s, i) => (
                        <button
                            key={i}
                            onClick={() => setInputValue(s)}
                            className="text-sm md:text-lg border border-gray-400 px-3 py-2 w-full hover:bg-gray-200 rounded-full text-gray-700 transition"
                        >
                            {s}
                        </button>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4">
                    <form onSubmit={handleSend} className="flex border border-gray-300 rounded-lg items-center">

                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message here..."
                            className="flex-1 px-4 py-2"
                            disabled={!chatConnected}
                        />

                        <button
                            onClick={handleSend}
                            disabled={!inputValue.trim() || !chatConnected}
                            className="px-4 py-2 disabled:opacity-50"
                        >
                            <FiSend color='#B30738' size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatSystem;
