'use client'
import { useCallback, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { FaUserFriends, FaGamepad } from 'react-icons/fa';
import { gametypes } from '@/types/Game.type';
import retroGames from '@/Data/Games';
import EyeIcon from '@/components/Icons/eye';
import { FiLoader } from 'react-icons/fi';

// Extend Window interface for EmulatorJS properties
declare global {
  interface Window {
    EJS_ready?: boolean;
    EJS_gameRunning?: boolean;
    EJS_player?: string;
    EJS_core?: string;
    EJS_pathtodata?: string;
    EJS_gameUrl?: string;
    EJS_audioContext?: AudioContext;
    EJS_gameInterval?: NodeJS.Timeout;
    EJS_gameTimeout?: NodeJS.Timeout;
    webkitAudioContext?: typeof AudioContext;
    gc?: () => void;
    next?: {
      router?: {
        events?: {
          on: (event: string, handler: () => void) => void;
          off: (event: string, handler: () => void) => void;
        };
      };
    };
  }
}

export default function EmulatorPage() {
  const [game, setGame] = useState<gametypes>();
  const cleanupRef = useRef<(() => void) | null>(null);
  const isEmulatorLoadingRef = useRef(false);
  const router = useRouter();
  const pathname = usePathname();
  const isCleanedUpRef = useRef(false);

  // Complete emulator cleanup function
  const cleanupEmulator = useCallback(() => {
    // Prevent multiple cleanups
    if (isCleanedUpRef.current) {
      return;
    }
    isCleanedUpRef.current = true;

    try {
      console.log('🛑 Starting comprehensive emulator cleanup...');

      // Comprehensive audio cleanup
      if (typeof window !== 'undefined') {
        // 1. Stop all HTML5 audio elements
        const audioElements = document.querySelectorAll('audio, video');
        console.log(`Found ${audioElements.length} audio/video elements to clean`);
        audioElements.forEach(element => {
          try {
            const mediaElement = element as HTMLMediaElement;
            mediaElement.pause();
            mediaElement.currentTime = 0;
            mediaElement.src = '';
            mediaElement.load();
            // Remove the element
            if (mediaElement.parentNode) {
              mediaElement.parentNode.removeChild(mediaElement);
            }
          } catch (e) {
            console.warn('Error stopping media element:', e);
          }
        });

        // 2. Stop Web Audio API contexts
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          const audioContexts: AudioContext[] = [];

          // Find EmulatorJS audio context
          if (window.EJS_audioContext) {
            audioContexts.push(window.EJS_audioContext);
          }

          // Find all audio contexts in global scope
          Object.keys(window).forEach(prop => {
            try {
              const windowProp = (window as any)[prop];
              if (windowProp &&
                typeof windowProp.close === 'function' &&
                windowProp.constructor &&
                (windowProp.constructor.name === 'AudioContext' ||
                  windowProp.constructor.name === 'webkitAudioContext')) {
                audioContexts.push(windowProp);
              }
            } catch (e) {
              // Ignore errors when checking properties
            }
          });

          console.log(`Found ${audioContexts.length} audio contexts to close`);

          // Close all found audio contexts
          audioContexts.forEach(ctx => {
            try {
              // Stop all audio nodes
              if (ctx.destination) {
                ctx.destination.disconnect();
              }

              // Close the context
              if (ctx.state !== 'closed') {
                ctx.close();
              }
            } catch (e) {
              console.warn('Error closing audio context:', e);
            }
          });
        }

        // 3. Stop any Web Audio oscillators or audio worklets
        try {
          // Clear any global audio variables that might exist
          (window as any).audioContext = null;
          (window as any).emulatorAudio = null;
          (window as any).gameAudio = null;
        } catch (e) {
          console.warn('Error clearing audio variables:', e);
        }

        // 4. Stop any running intervals/timeouts
        if (window.EJS_gameInterval) {
          clearInterval(window.EJS_gameInterval);
          window.EJS_gameInterval = undefined;
        }

        if (window.EJS_gameTimeout) {
          clearTimeout(window.EJS_gameTimeout);
          window.EJS_gameTimeout = undefined;
        }

        // 5. Clear all intervals and timeouts (aggressive cleanup)
        // Get the highest timeout/interval ID and clear them all
        const highestTimeoutId = setTimeout(() => { }, 0) as unknown as number;
        for (let i = 0; i <= highestTimeoutId; i++) {
          clearTimeout(i);
          clearInterval(i);
        }

        // 6. Reset emulator state
        window.EJS_ready = false;
        window.EJS_gameRunning = false;

        // 7. Clear any emulator-specific variables
        window.EJS_player = undefined;
        window.EJS_core = undefined;
        window.EJS_pathtodata = undefined;
        window.EJS_gameUrl = undefined;
        window.EJS_audioContext = undefined;

        // 8. Remove and destroy the emulator script
        const script = document.getElementById('loader-script');
        if (script) {
          // Remove any event listeners
          script.onload = null;
          script.onerror = null;
          script.remove();
        }

        // 9. Completely clear and reset the game container
        const gameContainer = document.getElementById('game');
        if (gameContainer) {
          // Stop any canvas contexts
          const canvases = gameContainer.querySelectorAll('canvas');
          canvases.forEach(canvas => {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
          });

          // Clear all content
          gameContainer.innerHTML = '';

          // Remove all event listeners by cloning
          const newGameContainer = gameContainer.cloneNode(false) as HTMLElement;
          gameContainer.parentNode?.replaceChild(newGameContainer, gameContainer);
        }

        // 10. Clear the entire game-container if it exists
        const gameContainerParent = document.getElementById('game-container');
        if (gameContainerParent) {
          const gameDiv = gameContainerParent.querySelector('#game');
          if (gameDiv) {
            gameDiv.innerHTML = '';
          }
        }

        // 11. Force stop any remaining audio sources
        try {
          // Stop all audio sources in the document
          const allAudioSources = document.querySelectorAll('[src*=".mp3"], [src*=".wav"], [src*=".ogg"], [data-audio], [audio]');
          allAudioSources.forEach(source => {
            try {
              (source as any).pause && (source as any).pause();
              (source as any).src = '';
            } catch (e) {
              // Ignore individual source errors
            }
          });

          // Mute the entire page temporarily
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const gainNode = audioContext.createGain();
          gainNode.gain.value = 0;
          gainNode.connect(audioContext.destination);
          setTimeout(() => {
            try {
              audioContext.close();
            } catch (e) {
              // Ignore close errors
            }
          }, 100);
        } catch (e) {
          console.warn('Error with additional audio cleanup:', e);
        }

        // 12. Force garbage collection hint if available
        if (window.gc) {
          window.gc();
        }
      }

      console.log('✅ Emulator cleanup completed successfully');
    } catch (error) {
      console.error('❌ Error during emulator cleanup:', error);
    } finally {
      // Reset cleanup flag after a delay to allow for re-cleanup if needed
      setTimeout(() => {
        isCleanedUpRef.current = false;
      }, 1000);
    }
  }, []);

  // Get ?game=ID from URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('game');
      if (id) {
        const current = retroGames.find(g => g.id === Number(id));
        setGame(current);
      }
    }
  }, []);

  const loadEmulator = useCallback((romUrl: string) => {
    // Prevent multiple simultaneous loads
    if (isEmulatorLoadingRef.current) {
      console.log('Emulator already loading, skipping...');
      return;
    }

    if (typeof window === 'undefined') return;

    isEmulatorLoadingRef.current = true;

    // Complete cleanup before loading new game
    cleanupEmulator();

    // Wait a bit for cleanup to complete
    setTimeout(() => {
      try {
        // Set configuration
        window.EJS_player = '#game';
        window.EJS_core = 'nes';
        window.EJS_pathtodata = 'https://cdn.emulatorjs.org/latest/data/';
        window.EJS_gameUrl = romUrl;

        // Load the emulator script
        const script = document.createElement('script');
        script.id = 'loader-script';
        script.src = 'https://cdn.emulatorjs.org/latest/data/loader.js';

        script.onload = () => {
          console.log('Emulator script loaded successfully');
          isEmulatorLoadingRef.current = false;
        };

        script.onerror = () => {
          console.error('Failed to load emulator script');
          isEmulatorLoadingRef.current = false;
        };

        document.body.appendChild(script);

        // Store cleanup function reference
        cleanupRef.current = cleanupEmulator;
      } catch (error) {
        console.error('Error loading emulator:', error);
        isEmulatorLoadingRef.current = false;
      }
    }, 100);
  }, [cleanupEmulator]);

  // Load ROM on mount
  useEffect(() => {
    const list = [
      {
        id: 1,
        nesUrl: "https://res.cloudinary.com/dipywb0lr/raw/upload/v1747842295/Super_Mario_Bros_E_zuwm1w.nes"
      },
      {
        id: 2,
        nesUrl: "https://res.cloudinary.com/dipywb0lr/raw/upload/v1747912657/Legend_of_Zelda_The_U_PRG1_e1e66m.nes"
      },
      {
        id: 3,
        nesUrl: "https://res.cloudinary.com/dipywb0lr/raw/upload/v1747912656/Pacman_Bros_SMB1_Hack_dourwz.nes"
      },
      {
        id: 4,
        nesUrl: "https://res.cloudinary.com/dipywb0lr/raw/upload/v1747912655/Tetris_U_u1sx1k.nes"
      },
      {
        id: 5,
        nesUrl: "https://res.cloudinary.com/dipywb0lr/raw/upload/v1747912655/Contra_U_mzqikg.nes"
      },
      {
        id: 6,
        nesUrl: "https://res.cloudinary.com/dipywb0lr/raw/upload/v1747913835/Street_Fighter_3_g9khje.nes"
      },
    ];

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('game');
      const index = id !== null ? Number(id) - 1 : 0;
      const romUrl = game?.nesUrl || list[index]?.nesUrl || list[0].nesUrl;

      if (romUrl) {
        loadEmulator(romUrl);
      }
    }

    // Cleanup function for this effect
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [loadEmulator, game]);

  // Handle page visibility change (tab switching, minimizing)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, pause/mute audio
        if (window.EJS_audioContext && window.EJS_audioContext.state === 'running') {
          window.EJS_audioContext.suspend();
        }
      } else {
        // Page is visible again, resume audio
        if (window.EJS_audioContext && window.EJS_audioContext.state === 'suspended') {
          window.EJS_audioContext.resume();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Enhanced cleanup for page unload/refresh/navigation with Next.js support
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleBeforeUnload = () => {
      console.log('🔄 Page unloading - cleaning up emulator');
      cleanupEmulator();
    };

    const handleUnload = () => {
      console.log('🔄 Page unloaded - cleaning up emulator');
      cleanupEmulator();
    };

    const handlePopState = () => {
      console.log('🔄 Browser navigation - cleaning up emulator');
      cleanupEmulator();
    };

    // Next.js specific route change detection
    const handleRouteChange = () => {
      console.log('🔄 Next.js route change - cleaning up emulator');
      cleanupEmulator();
    };

    // Multiple event listeners for different scenarios
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);
    window.addEventListener('popstate', handlePopState);

    // Next.js App Router - listen for route changes
    // Since we're using app router, we need to detect navigation differently
    let isNavigating = false;

    // Override the native navigation methods
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      if (!isNavigating) {
        isNavigating = true;
        console.log('🔄 History pushState - cleaning up emulator');
        cleanupEmulator();
        setTimeout(() => { isNavigating = false; }, 100);
      }
      return originalPushState.apply(history, args);
    };

    history.replaceState = function (...args) {
      if (!isNavigating) {
        isNavigating = true;
        console.log('🔄 History replaceState - cleaning up emulator');
        cleanupEmulator();
        setTimeout(() => { isNavigating = false; }, 100);
      }
      return originalReplaceState.apply(history, args);
    };

    // Handle clicks on Next.js Link components
    const handleLinkClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && (link.href.startsWith('/') || link.href.includes(window.location.origin))) {
        console.log('🔄 Link navigation detected - cleaning up emulator');
        cleanupEmulator();
      }
    };

    document.addEventListener('click', handleLinkClick, true);

    return () => {
      console.log('🧹 Cleaning up event listeners and emulator');
      cleanupEmulator();

      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleLinkClick, true);

      // Restore original history methods
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, [cleanupEmulator]);

  // Watch for pathname changes (Next.js App Router)
  useEffect(() => {
    const currentPath = pathname;
    console.log('📍 Pathname changed to:', currentPath);

    // If we're not on the game page anymore, cleanup
    if (!currentPath.includes('/playing')) {
      console.log('⚡ Left game page - cleaning up emulator');
      cleanupEmulator();
    }

    return () => {
      // Cleanup when pathname changes
      if (!pathname.includes('/playing')) {
        console.log('⚡ Pathname cleanup - cleaning up emulator');
        cleanupEmulator();
      }
    };
  }, [pathname, cleanupEmulator]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      loadEmulator(url);
    }
  };

  const loadDefault = () => {
    const defaultUrl = 'https://cdn.jsdelivr.net/gh/bfirsh/jsnes-roms@master/Super_Mario_Bros.nes';
    loadEmulator(defaultUrl);
  };

  // Force cleanup on component unmount
  useEffect(() => {
    return () => {
      cleanupEmulator();
    };
  }, [cleanupEmulator]);

  return (
    <div style={{
      background: '#ffffff',
      color: '#fff',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      margin: 0,
    }}>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="file"
          id="file-input"
          accept=".nes"
          onChange={handleFileChange}
          style={{ padding: '6px 12px', fontSize: '1rem', marginRight: '8px' }}
        />
        <button
          onClick={loadDefault}
          style={{ padding: '6px 12px', fontSize: '1rem', marginRight: '8px' }}
        >
          Load Default ROM
        </button>
      </div>
      <div id="game-container" style={{ width: 'full', height: '480px', maxWidth: '100%', margin: '0 auto' }}>
        <div id="game" style={{ width: '100%', height: '100%' }}></div>
      </div>
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-bold text-[#B30738] mb-3">
          Keyboard Controls
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Movement:</p>
            <div className="flex space-x-2 mt-2">
              <span className="bg-black px-3 py-1 rounded">Arrow Keys</span>
            </div>
          </div>
          <div>
            <p className="font-semibold">Actions:</p>
            <div className="flex space-x-2 mt-2">
              {['Z', 'X', 'Enter', 'Space'].map((key) => (
                <span
                  key={key}
                  className={`px-3 py-1 rounded ${['Z', 'X'].includes(key)
                    ? 'bg-[#B30738] text-white'
                    : 'bg-black'
                    }`}
                >
                  {key}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}