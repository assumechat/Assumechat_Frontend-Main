'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { CheckCircle } from 'lucide-react';

export default function ThankYouPage() {
    const router = useRouter();

    return (
        <div className="relative min-h-screen pt-16 md:pt-10 overflow-hidden bg-white">
            {/* Background layer with absolute positioned SVGs */}
            <div className="fixed md:mr-30 md:ml-20 md:my-40 my-30 inset-0 pointer-events-none">
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
            </div>

            {/* Main content layer */}
            <div className="relative px-4 md:px-16 z-10 min-h-screen flex flex-col">
                {/* Center content */}
                <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
                    <div className="w-full max-w-md mx-auto flex flex-col items-center text-center">
                        {/* Checkmark icon */}
                        <div className="mb-6 p-4 rounded-full bg-green-100 text-green-600">
                            <CheckCircle className="w-16 h-16" />
                        </div>

                        {/* Thank you message */}
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Coming soon...</h1>


                        {/* Action button */}
                        <button
                            onClick={() => router.push("/")}
                            className="w-full max-w-xs py-3 px-6 rounded-lg font-medium text-white bg-[#B30738] hover:bg-[#9a0630] transition-colors"
                        >
                            Go to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}