'use client';

import Image from 'next/image';
import Link from 'next/link';

const MiniGamesSection = () => {
    const featuredGames = [
        {
            id: 1,
            title: 'Trivia Challenge',
            description: 'Test your knowledge with fun questions',
            image: 'https://res.cloudinary.com/dipywb0lr/image/upload/v1746699219/Rectangle_5_1_omilr8.png',
            players: '1.2k playing'
        },
        {
            id: 2,
            title: 'Word Puzzle',
            description: 'Unscramble letters to form words',
            image: 'https://res.cloudinary.com/dipywb0lr/image/upload/v1746699065/Rectangle_19_hlla3r.png',
            players: '850 playing'
        },
        {
            id: 3,
            title: 'Quick Math',
            description: 'Solve math problems against time',
            image: 'https://res.cloudinary.com/dipywb0lr/image/upload/v1746699064/Rectangle_6_t3hb8u.png',
            players: '2.1k playing'
        },
        {
            id: 12,
            title: 'Trivia Challenge',
            description: 'Test your knowledge with fun questions',
            image: 'https://res.cloudinary.com/dipywb0lr/image/upload/v1746699219/Rectangle_5_1_omilr8.png',
            players: '1.2k playing'
        },
        {
            id: 22,
            title: 'Word Puzzle',
            description: 'Unscramble letters to form words',
            image: 'https://res.cloudinary.com/dipywb0lr/image/upload/v1746699065/Rectangle_19_hlla3r.png',
            players: '850 playing'
        },
        {
            id: 33,
            title: 'Quick Math',
            description: 'Solve math problems against time',
            image: 'https://res.cloudinary.com/dipywb0lr/image/upload/v1746699064/Rectangle_6_t3hb8u.png',
            players: '2.1k playing'
        }
    ];

    const trendingGames = [
        {
            id: 4,
            title: 'Memory Cards',
            description: 'Match pairs and test your memory',
            image: '/games/memory.jpg',
            players: '3.5k playing'
        },
        {
            id: 5,
            title: 'Sudoku',
            description: 'Classic number placement puzzle',
            image: '/games/sudoku.jpg',
            players: '1.8k playing'
        },
        {
            id: 6,
            title: 'Tic Tac Toe',
            description: 'Play against friends or AI',
            image: '/games/tictactoe.jpg',
            players: '1.1k playing'
        }
    ];

    return (
        <div className="flex mt-12 flex-col md:mt-28 justify-start w-full bg-white overflow-hidden px-4 sm:px-6 lg:px-8 py-8">
            {/* Featured Games Section */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Games</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredGames.map((game) => (
                        <div key={game.id} className="border-1 border-black rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                            <Link href={`/waitingRoom/tabs/minigames/games/${game.id}`}>
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={game.image}
                                        alt={game.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                {/**
                 <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1">{game.title}</h3>
                  <p className="text-gray-600 mb-2">{game.description}</p>
                  <p className="text-sm text-gray-500">{game.players}</p>
                </div>
                 */}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trending Games Section */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending Games</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trendingGames.map((game) => (
                        <div key={game.id} className="border-1 border-black rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                            <Link href={`/games/${game.id}`}>
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={game.image}
                                        alt={game.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                {/**
                 <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1">{game.title}</h3>
                  <p className="text-gray-600 mb-2">{game.description}</p>
                  <p className="text-sm text-gray-500">{game.players}</p>
                </div>
                 */}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MiniGamesSection;