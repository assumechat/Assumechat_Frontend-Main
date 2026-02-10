"use client"
import React from 'react';
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";

interface RewardModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConnect: () => void;
}

export default function RewardModal({ isOpen, onClose, onConnect }: RewardModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[550px] rounded-[40px] p-10 outline-none border-none shadow-2xl">
                <div className="flex flex-col items-center text-center">
                    
                    {/* --- 1. Gold Coins Graphic --- */}
                    <div className="mb-6 animate-bounce duration-[2000ms]">
                        {/* You can replace this src with your specific coin image path */}
                        <img 
                            src="https://res.cloudinary.com/dyktjldc4/image/upload/v1770737002/Rectangle_240652901_zvqpqc.png" 
                            alt="Gold Coins" 
                            className="w-32 h-32 object-contain"
                        />
                    </div>

                    {/* --- 2. Headline --- */}
                    <h2 className="text-3xl font-black text-black leading-tight">
                        Get <span className="text-[#B30738]">50 wallet coins for free</span> by logging into your account
                    </h2>

                    {/* --- 3. Subtext --- */}
                    <p className="mt-4 text-gray-500 text-sm font-medium leading-relaxed">
                        We&apos;ve sent a verification code to your email address.<br/>
                        Please enter the code below to continue.
                    </p>

                    {/* --- 4. Action Button --- */}
                    <button 
                        onClick={onConnect}
                        className="w-full mt-10 bg-[#B30738] hover:bg-red-800 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg active:scale-95"
                    >
                        Connect Wallet
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}