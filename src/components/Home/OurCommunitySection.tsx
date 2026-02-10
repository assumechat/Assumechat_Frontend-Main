"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

export default function CommunityStories() {
    const router = useRouter();

    return (
        <section className="py-20 px-6 md:px-16 bg-[#FFF5F5]"> {/* Light pink background */}
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">

                {/* --- Left Side: Floral Graphic --- */}
                <div className="relative w-full lg:w-1/2 ">
                    <svg width="100%" height="100%" viewBox="0 0 558 558" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0H189.897C235.496 0 272.461 36.9652 272.461 82.5641V272.461H82.5641C36.9652 272.461 0 235.496 0 189.897V0Z" fill="#B30738" />
                        <path d="M557.312 0H367.414C321.815 0 284.85 36.9652 284.85 82.5641V272.461H474.747C520.346 272.461 557.312 235.496 557.312 189.897V0Z" fill="#B30738" />
                        <path d="M284.851 284.843H474.748C520.347 284.843 557.313 321.808 557.313 367.407V557.304H367.415C321.816 557.304 284.851 520.339 284.851 474.74V284.843Z" fill="#B30738" />
                        <path d="M272.464 284.843H82.567C36.9681 284.843 0.00286865 321.808 0.00286865 367.407V557.304H189.9C235.499 557.304 272.464 520.339 272.464 474.74V284.843Z" fill="#B30738" />
                    </svg>

                </div>

                {/* --- Right Side: Content --- */}
                <div className="w-full lg:w-1/2 flex flex-col items-start">
                    <h2 className="text-5xl md:text-6xl font-bold text-black leading-tight">
                        Our <span className="text-[#B30738]">Community</span> <br /> in Stories
                    </h2>

                    <p className="mt-6 text-gray-600 text-lg md:text-xl max-w-lg leading-relaxed">
                        Real player experiences showing how trust shapes every game and outcome.
                    </p>

                    <button
                        onClick={() => router.push("/community")}
                        className="mt-8 px-8 py-3 bg-[#B30738] text-white rounded-xl text-lg font-bold shadow-md hover:bg-red-800 transition-all"
                    >
                        Join Community
                    </button>

                    {/* --- Stats Row --- */}
                    <div className="mt-16 flex flex-wrap items-center gap-8 md:gap-12">
                        {/* Stat 1 */}
                        <div className="flex flex-col">
                            <span className="text-4xl font-bold text-black">134K</span>
                            <span className="text-gray-500 text-sm mt-1">Total Players</span>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block w-[1.5px] h-12 bg-gray-300"></div>

                        {/* Stat 2 */}
                        <div className="flex flex-col">
                            <span className="text-4xl font-bold text-black">105M+</span>
                            <span className="text-gray-500 text-sm mt-1">Money Earn</span>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block w-[1.5px] h-12 bg-gray-300"></div>

                        {/* Stat 3 */}
                        <div className="flex flex-col">
                            <span className="text-4xl font-bold text-black">28k</span>
                            <span className="text-gray-500 text-sm mt-1">Players Active</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}