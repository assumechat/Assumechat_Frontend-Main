'use client';
import Image from 'next/image';

const teamMembers = [
    {
        name: 'Aarav Mehta',
        role: 'Founder & CEO',
        image: 'https://source.unsplash.com/featured/?man,ceo',
        bio: 'Visionary leader driving product innovation and team growth.'
    },
    {
        name: 'Priya Sharma',
        role: 'Head of Design',
        image: 'https://source.unsplash.com/featured/?woman,designer',
        bio: 'Designs intuitive interfaces and delightful experiences.'
    },
    {
        name: 'Karan Patel',
        role: 'Lead Engineer',
        image: 'https://source.unsplash.com/featured/?man,developer',
        bio: 'Architects scalable systems and writes clean, efficient code.'
    },
    {
        name: 'Neha Verma',
        role: 'Marketing Manager',
        image: 'https://source.unsplash.com/featured/?woman,marketer',
        bio: 'Crafts compelling brand stories and builds user community.'
    },
];

export default function TeamPage() {
    return (
        <div className="relative min-h-screen bg-white pt-20 px-4 md:px-16 overflow-hidden">
            {/* Background SVGs */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4">
                    <svg width="227" height="283" viewBox="0 0 227 283" fill="none" className="w-[150px] h-[187px]">
                        <g filter="url(#filter0_f_380_154550)">
                            <circle cx="85.973" cy="141.973" r="105.473" stroke="#B30738" />
                            <circle cx="85.4798" cy="141.48" r="78.9798" stroke="#B30738" />
                            <circle cx="85.9865" cy="141.987" r="52.4865" stroke="#B30738" />
                            <circle cx="85.5" cy="141.5" r="137" stroke="#B30738" />
                        </g>
                    </svg>
                </div>
                <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4">
                    <svg width="361" height="396" viewBox="0 0 361 396" fill="none" className="w-[240px] h-[263px]">
                        <g filter="url(#filter0_f_380_154529)">
                            <circle cx="197.518" cy="197.518" r="149.018" stroke="#B30738" />
                            <circle cx="198.139" cy="198.139" r="111.639" stroke="#B30738" />
                            <circle cx="197.759" cy="197.759" r="74.2591" stroke="#B30738" />
                            <circle cx="198" cy="198" r="193.5" stroke="#B30738" />
                        </g>
                    </svg>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-5xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-[#B30738] mb-4">Meet Our Team</h1>
                <p className="text-gray-600 mb-12">The people behind the vision, design, and execution of BizzSocial.</p>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {teamMembers.map(member => (
                    <div
                        key={member.name}
                        className="bg-white rounded-lg shadow-md p-4 text-center border border-gray-100"
                    >
                        <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                            <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                        <p className="text-sm text-[#B30738] font-medium">{member.role}</p>
                        <p className="text-sm text-gray-600 mt-2">{member.bio}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
