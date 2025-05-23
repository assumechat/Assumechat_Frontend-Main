'use client';
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { FaUserFriends, FaGamepad } from 'react-icons/fa';
import { gametypes } from '@/types/Game.type';
import retroGames from '@/Data/Games';
import EyeIcon from '@/components/Icons/eye'
import { useRouter } from 'next/navigation';

const GameOnePage = () => {
  const [game, setGame] = useState<gametypes>();
  const Router = useRouter();
  // grab `?game=ID` from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('game');
    if (id) {
      const current = retroGames.find(g => g.id === Number(id));
      setGame(current);
    }
  }, []);

  const handlePlay = () => {
    Router.push(`/waitingRoom/tabs/minigames/games/playing?game=${game?.id}`)
  };


  return (
    <div className="max-w-4xl mx-auto p-4 mt-16">
      {/* Emulator / Banner */}
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

      {/* Title & Controls */}
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
    </div>
  );
};

export default GameOnePage;