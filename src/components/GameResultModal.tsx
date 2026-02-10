"use client"
import React from 'react';
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";

interface GameResultModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPlayAgain: () => void;
}

export default function GameResultModal({ isOpen, onClose, onPlayAgain }: GameResultModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[480px] rounded-[40px] p-8 border-2 border-[#B30738] outline-none shadow-2xl">
                
                {/* --- Top Header Section --- */}
                <div className="flex justify-between items-start w-full">
                    <div>
                        <h2 className="text-2xl font-black text-black flex items-center gap-2">
                            Split or Steal
                            <span className="w-2.5 h-2.5 bg-[#44BD32] rounded-full"></span>
                        </h2>
                        <p className="text-gray-500 text-sm font-medium">Trust game with real stakes</p>
                    </div>
                    
                    <div className="flex gap-2">
                        <span className="bg-[#E2F5ED] text-[#27AE60] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Sepolia
                        </span>
                        <span className="bg-[#FFE4E9] text-[#B30738] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            5.0 121
                        </span>
                    </div>
                </div>

                {/* --- Main Result Content --- */}
                <div className="flex flex-col items-center text-center mt-4">
                    {/* Confetti Animation Placeholder */}
                    <div className="text-6xl mb-4 animate-bounce">
                        🎉
                    </div>

                    <h1 className="text-4xl font-black text-black">Both Win!</h1>
                    <p className="text-gray-600 font-medium mt-1">Mutual cooperation pays off!</p>

                    {/* --- Scoreboard Grid --- */}
                    <div className="grid grid-cols-2 w-full mt-10 gap-8">
                        {/* You Column */}
                        <div className="flex flex-col items-center">
                            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">You</span>
                            <span className="text-5xl font-black text-black my-2">+3</span>
                            <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                🤝 <span className="text-gray-600">Split</span>
                            </div>
                        </div>

                        {/* Opponent Column */}
                        <div className="flex flex-col items-center">
                            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Opponent</span>
                            <span className="text-5xl font-black text-black my-2">+3</span>
                            <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                🤝 <span className="text-gray-600">Split</span>
                            </div>
                        </div>
                    </div>

                    {/* --- Action Button --- */}
                    <button 
                        onClick={onPlayAgain}
                        className="w-full mt-12 bg-[#B30738] hover:bg-red-800 text-white py-4 rounded-2xl font-bold text-xl transition-all shadow-lg active:scale-95"
                    >
                        Play Again
                    </button>
                </div>

            </DialogContent>
        </Dialog>
    );
}