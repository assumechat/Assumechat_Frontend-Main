'use client';

import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { FaUserFriends, FaGamepad } from 'react-icons/fa';
import { gametypes } from '@/types/Game.type';
import retroGames from '@/Data/Games';

const EyeIcon = () => (
  <svg width="23" height="23" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5 3.7572C14.5678 3.7572 12.9113 5.4597 12 8.05564C11.0887 5.4597 9.43219 3.7572 7.5 3.7572C4.55625 3.7572 2.25 7.71064 2.25 12.7572C2.25 17.8038 4.55625 21.7572 7.5 21.7572C9.43219 21.7572 11.0887 20.0547 12 17.4588C12.9113 20.0547 14.5678 21.7572 16.5 21.7572C19.4438 21.7572 21.75 17.8038 21.75 12.7572C21.75 7.71064 19.4438 3.7572 16.5 3.7572ZM10.0237 18.2313C9.32156 19.5185 8.40188 20.2572 7.5 20.2572C6.59812 20.2572 5.67844 19.5185 4.97625 18.2313C4.52231 17.3704 4.19878 16.4469 4.01625 15.491C4.47317 15.6975 4.97457 15.7862 5.47461 15.7489C5.97464 15.7117 6.45737 15.5497 6.87867 15.2778C7.29996 15.0059 7.64638 14.6327 7.88625 14.1924C8.12613 13.7521 8.25181 13.2586 8.25181 12.7572C8.25181 12.2558 8.12613 11.7624 7.88625 11.322C7.64638 10.8817 7.29996 10.5085 6.87867 10.2366C6.45737 9.9647 5.97464 9.80272 5.47461 9.76549C4.97457 9.72825 4.47317 9.81694 4.01625 10.0235C4.19878 9.06751 4.52231 8.144 4.97625 7.28314C5.67844 5.99595 6.59812 5.2572 7.5 5.2572C8.40188 5.2572 9.32156 5.99595 10.0237 7.28314C10.8141 8.73251 11.25 10.6769 11.25 12.7572C11.25 14.8375 10.8141 16.7819 10.0237 18.2313ZM3.75 12.7572C3.75 12.4605 3.83797 12.1705 4.0028 11.9238C4.16762 11.6772 4.40189 11.4849 4.67597 11.3714C4.95006 11.2579 5.25166 11.2281 5.54264 11.286C5.83361 11.3439 6.10088 11.4868 6.31066 11.6965C6.52044 11.9063 6.6633 12.1736 6.72118 12.4646C6.77906 12.7555 6.74935 13.0571 6.63582 13.3312C6.52229 13.6053 6.33003 13.8396 6.08336 14.0044C5.83668 14.1692 5.54667 14.2572 5.25 14.2572C4.85218 14.2572 4.47064 14.0992 4.18934 13.8179C3.90804 13.5366 3.75 13.155 3.75 12.7572ZM19.0238 18.2313C18.3216 19.5185 17.4019 20.2572 16.5 20.2572C15.5981 20.2572 14.6784 19.5185 13.9762 18.2313C13.5223 17.3704 13.1988 16.4469 13.0162 15.491C13.4732 15.6975 13.9746 15.7862 14.4746 15.7489C14.9746 15.7117 15.4574 15.5497 15.8787 15.2778C16.3 15.0059 16.6464 14.6327 16.8863 14.1924C17.1261 13.7521 17.2518 13.2586 17.2518 12.7572C17.2518 12.2558 17.1261 11.7624 16.8863 11.322C16.6464 10.8817 16.3 10.5085 15.8787 10.2366C15.4574 9.9647 14.9746 9.80272 14.4746 9.76549C13.9746 9.72825 13.4732 9.81694 13.0162 10.0235C13.1988 9.06751 13.5223 8.144 13.9762 7.28314C14.6784 5.99595 15.5981 5.2572 16.5 5.2572C17.4019 5.2572 18.3216 5.99595 19.0238 7.28314C19.8141 8.73251 20.25 10.6769 20.25 12.7572C20.25 14.8375 19.8141 16.7819 19.0238 18.2313ZM12.75 12.7572C12.75 12.4605 12.838 12.1705 13.0028 11.9238C13.1676 11.6772 13.4019 11.4849 13.676 11.3714C13.9501 11.2579 14.2517 11.2281 14.5426 11.286C14.8336 11.3439 15.1009 11.4868 15.3107 11.6965C15.5204 11.9063 15.6633 12.1736 15.7212 12.4646C15.7791 12.7555 15.7494 13.0571 15.6358 13.3312C15.5223 13.6053 15.33 13.8396 15.0834 14.0044C14.8367 14.1692 14.5467 14.2572 14.25 14.2572C13.8522 14.2572 13.4706 14.0992 13.1893 13.8179C12.908 13.5366 12.75 13.155 12.75 12.7572Z" fill="#B30738" />
  </svg>
);

const GameOnePage = () => {
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const id = searchParams.get("game");
  const [Game, Setgame] = useState<gametypes>();
  const [isgameplaying, SetisGameplaying] = useState<boolean>(false);

  useEffect(() => {
    const currentgame = retroGames.find((game) => game.id === Number(id));
    Setgame(currentgame);
  }, [id]);

  const loadEmulator = useCallback((romUrl: string) => {
    // Clear previous emulator if exists
    if (window.EJS_ready) {
      window.EJS_ready = false;
      const oldScript = document.getElementById('loader-script');
      if (oldScript) oldScript.remove();
    }

    // Set configuration
    window.EJS_player = '#game-container';
    window.EJS_core = 'nes';
    window.EJS_pathtodata = 'https://cdn.emulatorjs.org/latest/data/';
    window.EJS_gameUrl = romUrl;

    // Load the emulator script
    const script = document.createElement('script');
    script.id = 'loader-script';
    script.src = 'https://cdn.emulatorjs.org/latest/data/loader.js';
    document.body.appendChild(script);
  }, []);

  const handlePlay = () => {
    if (Game?.nesUrl) {
      loadEmulator(Game.nesUrl);
      SetisGameplaying(true);
    }
  };

  const handleStop = () => {
    if (window.EJS_ready) window.EJS_ready = false;
    const script = document.getElementById('loader-script');
    if (script) script.remove();
    SetisGameplaying(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-20">
      {/* Game Banner */}
      {isgameplaying ? (
        <div className="mb-6">
          <div id="game-container" className="w-full min-h-[480px] bg-black rounded-xl overflow-hidden">
            <div id="game" className="w-full h-full"></div>
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleStop}
              className="bg-[#B30738] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#8a052b] transition"
            >
              Stop Playing
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden mb-6">
          <Image
            src={Game?.imgUrl || "/game/game1.png"}
            alt={Game?.name || ""}
            width={1000}
            height={200}
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Title & Play Button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-[#B30738]">{Game?.name}</h1>
        {!isgameplaying && (
          <button
            onClick={handlePlay}
            className="bg-[#B30738] text-white px-12 py-2 rounded-xl font-bold hover:bg-[#8a052b] transition"
            disabled={!Game?.nesUrl}
          >
            {Game?.nesUrl ? 'Play' : 'Coming Soon'}
          </button>
        )}
      </div>

      {!isgameplaying && (
        <div className="flex items-center space-x-6 mb-4 text-gray-600 font-bold">
          <div className="flex items-center space-x-2">
            <div className="inline-block p-2.5 border-2 border-gray-500 rounded-xl">
              <FaUserFriends />
            </div>
            <span>{Game?.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="inline-block p-1.5 border-2 border-gray-500 rounded-xl">
              <EyeIcon />
            </div>
            <span>{Game?.quote}</span>
          </div>
        </div>
      )}

      {/* Description */}
      <p className="text-gray-700 leading-relaxed mb-6">
        {Game?.description}
      </p>

      {/* Keyboard Controls */}
      {isgameplaying && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-bold text-[#B30738] mb-3">Keyboard Controls</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Movement:</p>
              <div className="flex space-x-2 mt-2">
                <span className="bg-gray-200 px-3 py-1 rounded">Arrow Keys</span>
              </div>
            </div>
            <div>
              <p className="font-semibold">Actions:</p>
              <div className="flex space-x-2 mt-2">
                <span className="bg-[#B30738] text-white px-3 py-1 rounded">Z</span>
                <span className="bg-[#B30738] text-white px-3 py-1 rounded">X</span>
                <span className="bg-gray-200 px-3 py-1 rounded">Enter</span>
                <span className="bg-gray-200 px-3 py-1 rounded">Space</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameOnePage;