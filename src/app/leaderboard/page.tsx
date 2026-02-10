"use client"
import React from 'react';
import Link from 'next/link';

// --- Sub-Components ---

const Crown = ({ color }: { color: string }) => (
  <svg 
    className="absolute -top-2 -left-2 w-6 h-6 drop-shadow-sm" 
    viewBox="0 0 24 24" 
    fill={color} 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5Z" />
    <circle cx="12" cy="18" r="1" fill="white" />
  </svg>
);

const LeaderboardItem = ({ name, rank, isOnline }: { name: string, rank: number, isOnline?: boolean }) => {
  // Rank display logic
  const getRankText = (r: number) => {
    if (r === 1) return "1st";
    if (r === 2) return "2nd";
    if (r === 3) return "3rd";
    return "";
  };

  const getCrown = (r: number) => {
    if (r === 1) return <Crown color="#FFD700" />; // Gold
    if (r === 2) return <Crown color="#C0C0C0" />; // Silver
    if (r === 3) return <Crown color="#CD7F32" />; // Bronze
    return null;
  };

  const rankColor = rank <= 3 ? "text-[#B30738]" : "text-transparent";

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-4">
        <div className="relative">
          {/* Avatar */}
          <div className="w-12 h-12 bg-[#2D3436] rounded-full flex items-center justify-center overflow-visible shadow-md">
            {getCrown(rank)}
          </div>
          {/* Status Indicator */}
          {isOnline && (
            <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#44BD32] border-2 border-white rounded-full" />
          )}
        </div>
        <span className="text-lg font-bold text-gray-800">{name}</span>
      </div>
      
      <span className={`text-lg font-bold ${rankColor}`}>
        {getRankText(rank)}
      </span>
    </div>
  );
};

// --- Main Page Component ---

export default function LeaderboardPage() {
  const players = [
    { name: "Christian Bale", isOnline: true },
    { name: "Christian Bale", isOnline: true },
    { name: "Christian Bale", isOnline: true },
    { name: "Christian Bale", isOnline: true },
    { name: "Christian Bale", isOnline: true },
    { name: "Christian Bale", isOnline: true },
  ];

  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col overflow-x-hidden">
      
      {/* --- Header --- */}
      <header className="w-full px-6 md:px-16 py-6 flex items-center justify-between border-b border-red-50 z-20">
        <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white border-2 border-[#B30738] rounded-full flex items-center justify-center text-[#B30738] font-bold italic text-sm">A</div>
            <span className="text-2xl font-bold text-[#B30738]">AssumeChat</span>
        </Link>
      </header>

      {/* --- Title Section --- */}
      <main className="flex-grow flex flex-col items-center pt-16 px-6 z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-black">
            Leaderboard
          </h1>
          <p className="mt-4 text-gray-500 text-lg font-medium">
            A community-powered game where trust decides your rewards.
          </p>
        </div>

        {/* --- Leaderboard Card --- */}
        <div className="w-full max-w-lg bg-white border border-[#B30738] rounded-[32px] p-8 md:p-12 shadow-xl mb-24">
          <h2 className="text-2xl font-black text-black mb-8">Top 10</h2>
          
          <div className="flex flex-col gap-2">
            {players.map((player, index) => (
              <LeaderboardItem 
                key={index} 
                name={player.name} 
                rank={index + 1} 
                isOnline={player.isOnline} 
              />
            ))}
          </div>
        </div>
      </main>

      {/* --- Bottom Wavy Graphics --- */}
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