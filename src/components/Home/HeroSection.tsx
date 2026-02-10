"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Herosvg from '@/../public/herosvg';
import RewardModal from '../RewardModal';
export default function HeroSection() {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const [showRewardModal, setShowRewardModal] = React.useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        setShowRewardModal(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);
  return (
    <div className="relative h-full pt-80 w-full bg-[#FCFBFB]  flex flex-col">
      {/* --- Main Hero Content --- */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 z-10 -mt-20">
        <h1 className="text-5xl md:text-8xl font-black text-black leading-tight tracking-tight">
          Play the <span className="text-[#B30738]">Trust Game.</span><br />
          Stake. Win. Repeat.
        </h1>

        <p className="mt-6 text-gray-700 text-lg md:text-xl font-medium max-w-2xl">
          A community-powered game where trust decides your rewards.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => isAuthenticated ? router.push("/game") : router.push("/game")}
            className="px-10 py-4 border-2 border-[#B30738] text-[#B30738] rounded-xl text-xl font-bold hover:bg-red-50 transition-all"
          >
            Start Playing
          </button>
          <button
            onClick={() => router.push("/community")}
            className="px-10 py-4 bg-[#B30738] text-white rounded-xl text-xl font-bold shadow-lg hover:bg-red-800 transition-all"
          >
            Join Community
          </button>
        </div>
      </main>

      {/* --- Bottom Wavy Graphics --- */}
      <div className="">
        <Herosvg className="w-full h-full" />
      </div>
      <RewardModal isOpen={showRewardModal} onClose={() => setShowRewardModal(false)} onConnect={() => {
        setShowRewardModal(false);
        router.push("/game");
      }} />
    </div>
  );
}