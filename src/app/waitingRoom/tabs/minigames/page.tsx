'use client';
import Image from 'next/image';
import Link from 'next/link';
import retroGames from '@/Data/Games';

const MiniGamesSection = () => {
    return (
        <div className="flex mt-12 flex-col md:mt-28 justify-start w-full bg-white overflow-hidden px-4 sm:px-6 lg:px-8 py-8">
            {/* Featured Games Section */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Games</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {retroGames.slice(0, retroGames.length / 2).map((game) => (
                        <div key={game.name} className="border-1 border-black rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                            <Link href={`/waitingRoom/tabs/minigames/games?game=${game.id}`}>
                                <div className="relative h-60 w-full">
                                    <Image
                                        src={game.imgUrl}
                                        alt={game.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        unoptimized
                                    />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trending Games Section */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending Games</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {retroGames.slice(retroGames.length / 2,).map((game) => (
                        <div key={game.name} className="border-1 border-black rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                            <Link href={`/waitingRoom/tabs/minigames/games?game=${game.id}`}>
                                <div className="relative h-60 w-full">
                                    <Image
                                        src={game.imgUrl}
                                        alt={game.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        unoptimized
                                    />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default MiniGamesSection;