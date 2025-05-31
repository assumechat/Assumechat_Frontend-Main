'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaUserFriends } from 'react-icons/fa';
import EyeIcon from '@/components/Icons/eye';
import { gametypes } from '@/types/Game.type';
import retroGames from '@/Data/Games';
import EmulatorContainer from '@/components/Games/EmulatorContainer'; // adjust path if needed

export default function GameOnePage() {
  const [game, setGame] = useState<gametypes>();
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [romUrl, setRomUrl] = useState<string>('');
  const router = useRouter();

  // On mount, pick up ?game=ID
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('game');
    if (id) {
      const current = retroGames.find(g => g.id === Number(id));
      setGame(current);
      if (current?.nesUrl) {
        setRomUrl(current.nesUrl);
      }
    }
  }, []);

  const handlePlay = () => {
    // When clicking “Play”, show the <iframe> with romUrl
    setIsGameRunning(true);
  };

  const handleStop = () => {
    // Simply unmount the EmulatorContainer (iframe)
    setIsGameRunning(false);
    setRomUrl(''); // optional, clear out old URL
    // No further cleanup needed—removing the iframe kills audio/loops automatically
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-16">
      {!isGameRunning ? (
        <>
          {/* ▶️ BANNER & PLAY UI */}
          <div className="mb-6">
            <div className="w-full overflow-hidden rounded-xl">
              <Image
                src={game?.imgUrl || '/game/game1.png'}
                alt={game?.name || 'Game banner'}
                width={1000}
                height={200}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
            <h1 className="text-2xl md:text-3xl font-bold text-[#B30738]">
              {game?.name}
            </h1>
            <div className="flex space-x-4">
              <button
                onClick={handlePlay}
                disabled={!game?.nesUrl}
                className="bg-[#B30738] disabled:opacity-50 text-white px-6 py-2 rounded-xl font-bold hover:bg-[#8a052b] transition"
              >
                {game?.nesUrl ? 'Play' : 'Coming Soon'}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center text-gray-600 font-bold mb-6 space-x-6">
            <div className="flex items-center space-x-2">
              <div className="p-2.5 border-2 border-gray-500 rounded-xl">
                <FaUserFriends />
              </div>
              <span>{game?.type || 'Single Player'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="p-1.5 border-2 border-gray-500 rounded-xl">
                <EyeIcon />
              </div>
              <span>{game?.quote}</span>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">{game?.description}</p>
        </>
      ) : (
        <>
          {/* 🎮 EMBEDDED EMULATOR (iframe) */}
          <div className="w-full h-[480px] bg-black rounded-xl overflow-hidden">
            {/* Only render EmulatorContainer if romUrl is set */}
            {romUrl && <EmulatorContainer romUrl={romUrl} />}
          </div>

          {/* 🛑 STOP BUTTON */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleStop}
              className="bg-gray-800 text-white px-6 py-2 rounded-xl font-bold hover:bg-gray-600 transition"
            >
              Stop Game
            </button>
          </div>
        </>
      )}
    </div>
  );
}
