'use client';
import { useEffect } from 'react';

declare global {
  interface Window {
    EJS_player?: string;
    EJS_core?: string;
    EJS_gameUrl?: string;
    EJS_pathtodata?: string;
    EJS_startOnLoaded?: boolean;
    EJS_controls?: any;
    EJS_ready?: boolean;
  }
}

export default function Emulator() {
  useEffect(() => {
    // Configure EmulatorJS
    window.EJS_player = '#game-container';
    window.EJS_core = 'nes';
    window.EJS_gameUrl = '/games/mario.nes';
    window.EJS_pathtodata = '/emulatorjs/data/';
    window.EJS_startOnLoaded = true;
    window.EJS_controls = {
      disableUI: false
    };

    // Load the EmulatorJS script
    const script = document.createElement('script');
    script.src = '/emulatorjs/data/loader.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
      if (window.EJS_ready) {
        window.EJS_ready = false;
      }
    };
  }, []);

  return (
    <div className="w-full h-full">
      <div
        id="game-container"
        style={{
          width: '640px',
          height: '480px',
          margin: '0 auto'
        }}
      ></div>
    </div>
  );
}