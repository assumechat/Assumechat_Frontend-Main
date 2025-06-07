'use client';
import { useAppSelector } from '@/store/hooks';
import { Eye, PlayCircle, Gamepad2, University } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function WaitingRoom() {
    const router = useRouter();
    const { position, waiting, online } = useAppSelector(s => s.socket);
    return (
        <div className="relative min-h-screen pt-24 bg-white overflow-hidden">
            {/* Red gradient blur background */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-gradient-to-r from-[#B30738]/20 to-[#B30738]/10 blur-3xl w-full max-w-2xl h-96 rounded-full" />
            </div>

            {/* Main content */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:px-6">
                {/* Header section */}
                <div className="text-center max-w-2xl mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Welcome to the Waiting Room
                    </h1>
                    <p className="text-gray-600 text-lg">
                        While we find your next curious stranger, explore the campus of AssumeChat.
                    </p>
                </div>

                {/* Online users card */}
                <div className="bg-white border-1 border-[#B30738] rounded-xl px-4 py-2 mb-10 max-w-md flex items-center justify-between">
                    <div className="flex items-center">
                        <svg className='mr-3' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.75 2.5C12.1398 2.5 10.7594 3.91875 10 6.08203C9.24062 3.91875 7.86016 2.5 6.25 2.5C3.79688 2.5 1.875 5.79453 1.875 10C1.875 14.2055 3.79688 17.5 6.25 17.5C7.86016 17.5 9.24062 16.0812 10 13.918C10.7594 16.0812 12.1398 17.5 13.75 17.5C16.2031 17.5 18.125 14.2055 18.125 10C18.125 5.79453 16.2031 2.5 13.75 2.5ZM8.35312 14.5617C7.76797 15.6344 7.00156 16.25 6.25 16.25C5.49844 16.25 4.73203 15.6344 4.14688 14.5617C3.76859 13.8443 3.49898 13.0747 3.34687 12.2781C3.72764 12.4502 4.14547 12.5241 4.56217 12.4931C4.97887 12.4621 5.38115 12.3271 5.73222 12.1005C6.0833 11.8739 6.37198 11.5629 6.57188 11.196C6.77177 10.829 6.87651 10.4179 6.87651 10C6.87651 9.58215 6.77177 9.17096 6.57188 8.80402C6.37198 8.43709 6.0833 8.12611 5.73222 7.89951C5.38115 7.67292 4.97887 7.53794 4.56217 7.5069C4.14547 7.47587 3.72764 7.54978 3.34687 7.72187C3.49898 6.92526 3.76859 6.15566 4.14688 5.43828C4.73203 4.36563 5.49844 3.75 6.25 3.75C7.00156 3.75 7.76797 4.36563 8.35312 5.43828C9.01172 6.64609 9.375 8.26641 9.375 10C9.375 11.7336 9.01172 13.3539 8.35312 14.5617ZM3.125 10C3.125 9.75277 3.19831 9.5111 3.33566 9.30554C3.47301 9.09998 3.66824 8.93976 3.89665 8.84515C4.12505 8.75054 4.37639 8.72579 4.61886 8.77402C4.86134 8.82225 5.08407 8.9413 5.25888 9.11612C5.4337 9.29093 5.55275 9.51366 5.60098 9.75614C5.64921 9.99861 5.62446 10.2499 5.52985 10.4784C5.43524 10.7068 5.27502 10.902 5.06946 11.0393C4.8639 11.1767 4.62223 11.25 4.375 11.25C4.04348 11.25 3.72554 11.1183 3.49112 10.8839C3.2567 10.6495 3.125 10.3315 3.125 10ZM15.8531 14.5617C15.268 15.6344 14.5016 16.25 13.75 16.25C12.9984 16.25 12.232 15.6344 11.6469 14.5617C11.2686 13.8443 10.999 13.0747 10.8469 12.2781C11.2276 12.4502 11.6455 12.5241 12.0622 12.4931C12.4789 12.4621 12.8811 12.3271 13.2322 12.1005C13.5833 11.8739 13.872 11.5629 14.0719 11.196C14.2718 10.829 14.3765 10.4179 14.3765 10C14.3765 9.58215 14.2718 9.17096 14.0719 8.80402C13.872 8.43709 13.5833 8.12611 13.2322 7.89951C12.8811 7.67292 12.4789 7.53794 12.0622 7.5069C11.6455 7.47587 11.2276 7.54978 10.8469 7.72187C10.999 6.92526 11.2686 6.15566 11.6469 5.43828C12.232 4.36563 12.9984 3.75 13.75 3.75C14.5016 3.75 15.268 4.36563 15.8531 5.43828C16.5117 6.64609 16.875 8.26641 16.875 10C16.875 11.7336 16.5117 13.3539 15.8531 14.5617ZM10.625 10C10.625 9.75277 10.6983 9.5111 10.8357 9.30554C10.973 9.09998 11.1682 8.93976 11.3966 8.84515C11.6251 8.75054 11.8764 8.72579 12.1189 8.77402C12.3613 8.82225 12.5841 8.9413 12.7589 9.11612C12.9337 9.29093 13.0528 9.51366 13.101 9.75614C13.1492 9.99861 13.1245 10.2499 13.0299 10.4784C12.9352 10.7068 12.775 10.902 12.5695 11.0393C12.3639 11.1767 12.1222 11.25 11.875 11.25C11.5435 11.25 11.2255 11.1183 10.9911 10.8839C10.7567 10.6495 10.625 10.3315 10.625 10Z" fill="#B30738" />
                        </svg>
                        <span className="font-medium text-gray-800">{online} Users Online</span>
                    </div>
                </div>

                {/* Activity cards */}
                <div className="flex justify-center items-center flex-wrap gap-6 w-full  mb-10">
                    {/* Watch Reels card */}
                    <div onClick={() => router.push("waitingRoom/tabs/reels")} className="bg-white  p-5 rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-auto rounded-xl flex items-center justify-center">
                            <Image
                                className='w-full mb-4 h-full object-contain'
                                alt='Loading...'
                                height={500}
                                width={500}
                                src={"https://res.cloudinary.com/dipywb0lr/image/upload/v1746624614/Frame_22_oetb3k.png"}
                            />
                        </div>
                        <div className="">
                            <h3 className="font-bold text-md mb-2">Watch Reels</h3>
                            <p className="text-gray-600 ">
                                Short videos from students around the world
                            </p>
                        </div>
                    </div>

                    {/* Mini Games card */}
                    <div onClick={() => router.push("waitingRoom/tabs/minigames")} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md p-5 transition-shadow">
                        <div className="h-auto  rounded-xl  flex items-center justify-center">
                            <Image
                                className='w-full mb-4 h-full object-contain'
                                alt='Loading...'
                                height={500}
                                width={500}
                                src={"https://res.cloudinary.com/dipywb0lr/image/upload/v1746624613/Frame_22_1_zv9xvj.png"}
                            />
                        </div>
                        <div className="">
                            <h3 className="font-bold text-md mb-2">Mini Games</h3>
                            <p className="text-gray-600 ">
                                Quick games to pass the time while waiting
                            </p>
                        </div>
                    </div>

                    {/* Uni Space card */}
                    <div onClick={() => router.push("waitingRoom/tabs/unispace")} className="bg-white p-5 rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-auto  rounded-xl  flex items-center justify-center">
                            <Image
                                className='w-full mb-4 h-full object-contain'
                                alt='Loading...'
                                height={500}
                                width={500}
                                src={"https://res.cloudinary.com/dipywb0lr/image/upload/v1746624613/Frame_22_2_b3vjav.png"}
                            />
                        </div>
                        <div className="">
                            <h3 className="font-bold text-md mb-2">Uni Space</h3>
                            <p className="text-gray-600 ">
                                Connect with students from your university
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer text */}
                <div className="text-center max-w-2xl">
                    <p className="text-[#B30738] font-medium ">
                        We'll pull you into a chat as soon as we find a match.In the meantime, enjoy the campus vibes.
                    </p>
                </div>
            </div>
        </div>
    );
}