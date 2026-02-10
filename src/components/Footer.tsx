'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export function FooterSection() {
    const router = useRouter();

    return (
        <div className=" bg-[#FFF5F5] mt-56  w-full">
            {/* --- 1. CTA SECTION (Top Part) --- */}
            <section className="bg-[#FFF5F5] pt-24 pb-20 px-4 text-center relative z-0">
                <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                    Try <span className="text-[#B30738]">AssumeChat</span> For Free
                </h2>
                <p className="mt-6 text-gray-700 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                    Experience Powerful AI Conversations Instantly<br />
                    Without Paying Anything To Start.
                </p>
                <button 
                    onClick={() => router.push('/community')}
                    className="mt-10 bg-[#B30738] hover:bg-red-800 text-white px-10 py-4 rounded-xl text-xl font-bold transition-all shadow-lg"
                >
                    Join Community
                </button>
            </section>

            {/* --- 2. THE WAVE SVG (The Transition) --- */}
            {/* We give this a relative z-index so it sits behind the footer but above the CTA */}
            <div className="relative w-full overflow-hidden leading-[0] z-10">
                <svg 
                    viewBox="0 0 1494 357" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto bg-[#FFF5F5] transform translate-y-4" // slight nudge down
                >
                    <circle cx="173.941" cy="178.269" r="119.423" fill="#B30738"/>
                    <circle cx="476.83" cy="178.27" r="147.981" fill="#B30738"/>
                    <circle cx="1134.52" cy="178.269" r="178.269" fill="#B30738"/>
                    <circle cx="910.384" cy="180" r="121.154" fill="#B30738"/>
                    <circle cx="306.347" cy="178.27" r="78.75" fill="#B30738"/>
                    <circle cx="644.713" cy="177.406" r="54.5192" fill="#B30738"/>
                    <circle cx="54.5192" cy="177.406" r="54.5192" fill="#B30738"/>
                    <circle cx="748.558" cy="159.231" r="72.6923" fill="#B30738"/>
                    <circle cx="1309.33" cy="159.231" r="72.6923" fill="#B30738"/>
                    <circle cx="1420.96" cy="159.231" r="72.6923" fill="#B30738"/>
                </svg>
            </div>

            {/* --- 3. DARK FOOTER (The Overlay) --- */}
            {/* -mt-[15%] pulls the footer UP to cover half of the circles */}
            <footer className="relative bg-[#1E0006] px-6 md:px-20 pb-16 pt-10 -mt-[10vw] z-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-white">
                    
                    {/* Brand Column */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#B30738] font-bold italic">A</div>
                            <span className="text-2xl font-bold text-[#B30738]">AssumeChat</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                            <Mail className="w-5 h-5 text-[#B30738]" />
                            <span className="text-sm">Help@Frybix.Com</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                            <Phone className="w-5 h-5 text-[#B30738]" />
                            <span className="text-sm">+1 234 456 678 89</span>
                        </div>
                    </div>

                    {/* Links Column */}
                    <div>
                        <h4 className="text-xl font-bold mb-6">Links</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">How It Work</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">FAQ&apos;s</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Review</Link></li>
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div>
                        <h4 className="text-xl font-bold mb-6">Legal</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><Link href="#" className="hover:text-white transition-colors">Terms Of Use</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>

                    {/* Product Column */}
                    <div>
                        <h4 className="text-xl font-bold mb-6">Product</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><Link href="#" className="hover:text-white transition-colors">Take Tour</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Live Chat</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Reviews</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom Line */}
                <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-800 text-center">
                    <p className="text-gray-500 text-xs">
                        Copyright 2022 Assumechat Inc. All Rights Reserved
                    </p>
                </div>
            </footer>
        </div>
    );
}