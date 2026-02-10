"use client"
import React, { useState } from 'react';
import {
    Video, Phone, MoreHorizontal, Smile,
    Paperclip, Send, Gamepad2, MessageSquare
} from 'lucide-react';
import GameResultModal from '@/components/GameResultModal';

// --- Sub-Components ---

const VideoSidebar = ({ setShowWinner }: { setShowWinner: (show: boolean) => void }) => (
    <aside className="w-1/4 h-screen bg-[#FFF5F5] border-r border-red-100 flex flex-col p-6 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-white border-2 border-[#B30738] rounded-full flex items-center justify-center text-[#B30738] font-bold italic text-sm">A</div>
            <span className="text-2xl font-bold text-[#B30738]">AssumeChat</span>
        </div>
        <hr className="border-red-200 mb-8" />

        {/* Video Feeds */}
        <div className="space-y-4 flex-grow">
            {/* Feed 1 */}
            <div className="relative aspect-[16/9] rounded-[32px] overflow-hidden border-4 border-white shadow-xl">
                <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=400&h=500"
                    alt="User" className="w-full h-full object-cover"
                />
            </div>
            {/* Feed 2 */}
            <div className="relative aspect-[16/9] rounded-[32px] overflow-hidden border-4 border-white shadow-xl">
                <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=400&h=500"
                    alt="User" className="w-full h-full object-cover"
                />
            </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-6">
            <button onClick={() => setShowWinner(true)} className="bg-[#B30738] text-white py-4 rounded-2xl font-bold text-lg hover:bg-red-800 transition-all">SPLIT</button>
            <button onClick={() => setShowWinner(true)} className="bg-[#B30738] text-white py-4 rounded-2xl font-bold text-lg hover:bg-red-800 transition-all">STEAL</button>
        </div>
    </aside>
);

const ChatHeader = ({ view, setView }: { view: string, setView: (v: string) => void }) => (
    <header className="h-[80px] border-b border-gray-100 flex items-center justify-between px-8 bg-white shrink-0">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0B1A28] rounded-full" />
            <div>
                <h3 className="font-bold text-black">Name</h3>
                <p className="text-xs text-gray-400">27 members, <span className="text-[#B30738]">9 online</span></p>
            </div>
        </div>

        <div className="flex items-center gap-4">
            {/* Switch View Toggle */}
            <button
                onClick={() => setView(view === 'chat' ? 'game' : 'chat')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-bold hover:bg-gray-200 transition-all"
            >
                {view === 'chat' ? <Gamepad2 size={18} /> : <MessageSquare size={18} />}
                {view === 'chat' ? 'Switch to Game' : 'Switch to Chat'}
            </button>

            <div className="flex items-center gap-2 text-gray-400">
                <button className="p-2 hover:bg-gray-50 rounded-lg"><Video size={20} /></button>
                <button className="p-2 hover:bg-gray-50 rounded-lg"><Phone size={20} /></button>
                <button className="p-2 hover:bg-gray-50 rounded-lg"><MoreHorizontal size={20} /></button>
            </div>
        </div>
    </header>
);

const GameInterface = () => (
    <div className="flex-grow flex flex-col items-center justify-center bg-[#0B1A28] text-white p-12 animate-in fade-in duration-500">
        <div className="text-center">
            <h2 className="text-5xl font-black mb-4">Game in Progress</h2>
            <p className="text-gray-400 mb-8">Trust is the only currency here.</p>
            <div className="w-[600px] h-[400px] bg-gray-800 rounded-3xl border-4 border-gray-700 flex items-center justify-center">
                <span className="text-gray-500 italic">Game Engine Loading...</span>
            </div>
        </div>
    </div>
);

const ChatMessages = () => (
    <div className="flex-grow overflow-y-auto p-8 flex flex-col gap-6 animate-in fade-in duration-500">
        {/* Sent Message */}
        <div className="flex flex-col items-end">
            <p className="text-xs text-gray-400 mb-1 font-bold">You, <span className="font-normal">11:45 AM</span></p>
            <div className="bg-[#B30738] text-white px-6 py-4 rounded-[24px] rounded-tr-none max-w-[400px]">
                Lorem ipsum dolor sit amet, consectet
            </div>
        </div>

        {/* Received Message */}
        <div className="flex flex-col items-start">
            <p className="text-xs text-gray-400 mb-1 font-bold">Name, <span className="font-normal">11:49 AM</span></p>
            <div className="bg-white border border-gray-100 text-gray-800 px-6 py-4 rounded-[24px] rounded-tl-none shadow-sm max-w-[400px]">
                Lorem ipsum dolor sit amet,
            </div>
        </div>

        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">WS</div>
            <div className="bg-white border border-gray-100 px-6 py-4 rounded-[24px] shadow-sm">
                Lorem ipsum dolor sit amet, <span className="text-[#B30738] font-bold">@Name</span>
            </div>
        </div>

        {/* Image Placeholder */}
        <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[#0B1A28] rounded-full mt-auto" />
            <div className="w-64 h-80 bg-orange-200 rounded-[32px] rounded-bl-none" />
        </div>
    </div>
);

// --- Main Page Component ---

export default function Interface() {
    const [view, setView] = useState('chat'); // 'chat' or 'game'
    const [showwinner, setShowWinner] = useState(false);
    return (
        <div className="flex h-screen bg-white overflow-hidden">
            {/* Persistent Sidebar */}
            <VideoSidebar setShowWinner={setShowWinner} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen">
                {/* Persistent Top Bar */}
                <ChatHeader view={view} setView={setView} />

                {/* Dynamic Content: Chat or Game */}
                <div className="flex-1 flex flex-col overflow-hidden relative">
                    {view === 'chat' ? (
                        <>
                            <ChatMessages />
                            {/* Message Input - Only visible in Chat */}
                            <div className="p-8 shrink-0">
                                <div className="max-w-4xl mx-auto relative">
                                    <input
                                        type="text"
                                        placeholder="Type your message..."
                                        className="w-full pl-6 pr-32 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-1 focus:ring-[#B30738]"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3 text-orange-400">
                                        <button className="hover:scale-110 transition-transform"><Smile size={20} /></button>
                                        <button className="hover:scale-110 transition-transform"><Paperclip size={20} /></button>
                                        <button className="text-[#B30738] hover:scale-110 transition-transform"><Send size={20} /></button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <GameInterface />
                    )}
                </div>
            </div>
            <GameResultModal isOpen={showwinner} onClose={() => setShowWinner(false)} onPlayAgain={() => setShowWinner(false)} />
        </div>
    );
}