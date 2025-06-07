import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'; // Adjust to your Dialog import
import { ChatIcon, EyeIcon, HeartIcon } from '@/components/Icons/eye'; // Or your custom icons
import { VisuallyHidden } from '@chakra-ui/react';

type MatchDialogProps = {
    open: boolean;
    onClose: () => void;
    user: { name: string };
    peerInfo: { userName: string };
};

export default function MatchDialog({ open, onClose, user, peerInfo }: MatchDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl p-0 overflow-hidden bg-white rounded-2xl shadow-xl">
                <div className="min-h-[600px] bg-white flex flex-col items-center justify-center text-center px-4 py-12 relative overflow-hidden">
                    {/* Top-left SVG */}
                    <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 sm:-translate-x-1/3 sm:-translate-y-1/3">
                        <svg
                            width="227"
                            height="283"
                            viewBox="0 0 227 283"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-[150px] h-[187px] sm:w-[227px] sm:h-[283px]"
                        >
                            <g filter="url(#filter0_f_380_154550)">
                                <circle cx="85.973" cy="141.973" r="105.473" stroke="#B30738" />
                                <circle cx="85.4798" cy="141.48" r="78.9798" stroke="#B30738" />
                                <circle cx="85.9865" cy="141.987" r="52.4865" stroke="#B30738" />
                                <circle cx="85.5" cy="141.5" r="137" stroke="#B30738" />
                            </g>
                        </svg>
                    </div>

                    {/* Bottom-right SVG */}
                    <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 sm:translate-x-1/3 sm:translate-y-1/3">
                        <svg
                            width="361"
                            height="396"
                            viewBox="0 0 361 396"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-[240px] h-[263px] sm:w-[361px] sm:h-[396px]"
                        >
                            <g filter="url(#filter0_f_380_154529)">
                                <circle cx="197.518" cy="197.518" r="149.018" stroke="#B30738" />
                                <circle cx="198.139" cy="198.139" r="111.639" stroke="#B30738" />
                                <circle cx="197.759" cy="197.759" r="74.2591" stroke="#B30738" />
                                <circle cx="198" cy="198" r="193.5" stroke="#B30738" />
                            </g>
                        </svg>
                    </div>
                    <VisuallyHidden>
                        <DialogTitle >Hii</DialogTitle>
                    </VisuallyHidden>

                    {/* Heading */}
                    <h1 className="text-4xl font-bold text-black mb-2 z-10">You Just Got Matched!</h1>
                    <p className="text-gray-600 mb-8 z-10">
                        You're now chatting with <span className="text-rose-700 font-semibold">{peerInfo?.userName}</span>.{" "}
                        <span className="text-black">Hang out or skip when you're ready.</span>
                    </p>

                    {/* Orbit Avatars */}
                    <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] z-10">
                        {/* Rotating Ellipses */}
                        <svg viewBox="0 0 509 509" className="absolute w-full h-full animate-spin-slow" style={{ transform: 'rotate(175deg)' }}>
                            <ellipse cx="254.5" cy="254.5" rx="253.5" ry="125" stroke="#B30738" strokeWidth="1" fill="none" />
                        </svg>
                        <svg viewBox="0 0 509 509" className="absolute w-full h-full animate-spin-slow" style={{ transform: 'rotate(25deg)' }}>
                            <ellipse cx="254.5" cy="254.5" rx="253.5" ry="125" stroke="#B30738" strokeWidth="1" fill="none" />
                        </svg>

                        {/* Avatar 1 */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-[60px] -translate-y-[40px]">
                            <Image
                                src="https://res.cloudinary.com/dipywb0lr/image/upload/v1746702005/image_qkwdzs.jpg"
                                alt="User Avatar"
                                width={60}
                                height={60}
                                className="rounded-full border-2 shadow-lg"
                            />
                        </div>

                        {/* Avatar 2 */}
                        <div className="absolute top-1/2 left-1/2 translate-x-[10px] -translate-y-[50px]">
                            <Image
                                src="https://res.cloudinary.com/dipywb0lr/image/upload/v1746702005/image_jmhhxy.png"
                                alt="Peer Avatar"
                                width={60}
                                height={60}
                                className="rounded-full border-2 shadow-lg"
                            />
                        </div>

                        {/* Orbit Icons */}
                        <div className="absolute" style={{ top: '20%', left: '50%', transform: 'translate(-50%, -50%) rotate(-15deg)' }}>
                            <div className="bg-white rounded-full shadow-md p-2 hover:scale-110 transition">
                                <ChatIcon />
                            </div>
                        </div>

                        <div className="absolute" style={{ top: '50%', left: '93%', transform: 'translate(-50%, -50%) rotate(15deg)' }}>
                            <div className="bg-white rounded-full shadow-md p-2 hover:scale-110 transition">
                                <EyeIcon />
                            </div>
                        </div>

                        <div className="absolute" style={{ top: '70%', left: '10%', transform: 'translate(-50%, -50%) rotate(-15deg)' }}>
                            <div className="bg-white rounded-full shadow-md p-2 hover:scale-110 transition">
                                <HeartIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
