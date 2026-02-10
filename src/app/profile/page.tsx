"use client"
import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import Link from 'next/link';

// --- Sub-Components ---

const UserDropdown = () => {
    const [isOpen, setIsOpen] = useState(true); // Open by default to match screenshot

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md active:scale-95 transition-all"
            >
                <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?fit=crop&w=100&h=100"
                    alt="User Profile"
                    className="w-full h-full object-cover"
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl py-3 z-50 animate-in fade-in zoom-in-95 duration-200 border border-gray-50">
                    <ul className="flex flex-col">
                        <li className="px-6 py-2 hover:bg-gray-50 cursor-pointer text-gray-800 font-medium">My profile</li>
                        <li className="px-6 py-2 hover:bg-gray-50 cursor-pointer text-gray-800 font-medium">My Rewards</li>
                        <Link href="/leaderboard" className="px-6 py-2 hover:bg-gray-50 cursor-pointer text-gray-800 font-medium">Leaderboard</Link>
                        <li className="px-6 py-2 hover:bg-gray-50 cursor-pointer text-gray-800 font-medium">Settings</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

const TaskCard = ({ description, coins, isCompleted }: { description: string, coins: string, isCompleted?: boolean }) => (
    <div className="w-full max-w-3xl bg-[#FCFBFB] border border-red-50/50 rounded-2xl p-6 flex items-center justify-between shadow-sm mb-4">
        <p className="text-lg font-medium text-gray-800">
            {description} to earn <span className="text-[#B30738] font-bold">{coins} wallet coins</span>
        </p>

        {isCompleted ? (
            <button className="flex items-center gap-2 bg-[#FFE4E9] text-[#B30738] px-6 py-3 rounded-xl font-bold transition-all cursor-default">
                <Check size={18} />
                Task Completed
            </button>
        ) : (
            <button className="bg-[#B30738] hover:bg-red-800 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95">
                Complete Task
            </button>
        )}
    </div>
);

// --- Main Page Component ---

export default function ProfilePage() {
    return (
        <div className="relative min-h-screen w-full bg-white flex flex-col overflow-x-hidden">

            {/* --- Header --- */}
            <header className="w-full px-6 md:px-16 py-4 flex items-center justify-between border-b border-red-50 z-20">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white border-2 border-[#B30738] rounded-full flex items-center justify-center text-[#B30738] font-bold italic text-sm">A</div>
                    <span className="text-2xl font-bold text-[#B30738]">AssumeChat</span>
                </Link>
                <UserDropdown />
            </header>

            {/* --- Main Content --- */}
            <main className="flex-grow flex flex-col items-center pt-20 px-6 z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-black leading-tight">
                        Complete task to <span className="text-[#B30738]">earn <br /> more wallet coins</span>
                    </h1>
                    <p className="mt-6 text-gray-500 text-lg font-medium">
                        A community-powered game where trust decides your rewards.
                    </p>
                </div>

                {/* --- Task List --- */}
                <div className="w-full flex flex-col items-center">
                    <TaskCard description="Complete signup" coins="50" />
                    <TaskCard description="Complete signup" coins="50" isCompleted />
                </div>
            </main>

            {/* --- Bottom Wavy Graphics (SVG from previous steps) --- */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none z-0">
                <svg viewBox="0 0 1412 153" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <circle cx="91.9407" cy="178.269" r="119.423" fill="#B30738" />
                    <circle cx="394.83" cy="178.27" r="147.981" fill="#B30738" />
                    <circle cx="1052.52" cy="178.269" r="178.269" fill="#B30738" />
                    <circle cx="828.384" cy="180" r="121.154" fill="#B30738" />
                    <circle cx="224.348" cy="178.27" r="78.75" fill="#B30738" />
                    <circle cx="562.713" cy="177.406" r="54.5192" fill="#B30738" />
                    <circle cx="-27.4808" cy="177.406" r="54.5192" fill="#B30738" />
                    <circle cx="666.558" cy="159.231" r="72.6923" fill="#B30738" />
                    <circle cx="1227.33" cy="159.231" r="72.6923" fill="#B30738" />
                    <circle cx="1338.96" cy="159.231" r="72.6923" fill="#B30738" />
                </svg>
            </div>

        </div>
    );
}