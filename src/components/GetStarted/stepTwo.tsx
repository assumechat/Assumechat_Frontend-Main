'use client';

import { LucideIcon } from 'lucide-react';

type Interest = {
    id: string;
    name: string;
    icon: LucideIcon;
};

type InterestSelectionProps = {
    toggleInterest: (id: string) => void;
    selectedInterests: string[];
    interests: Interest[];
};

export default function StepTwo({
    toggleInterest,
    selectedInterests,
    interests,
}: InterestSelectionProps) {
    return (
        <>
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 text-center ">
                Tell Us What You're Into — So We Can <br className="hidden sm:block" /> Assume Less and Match More.
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8 text-center ">
                Choose the topics you care about. We'll use them to connect you with students who get it.
            </p>

            {/* Interest cards - Responsive grid */}
            <div className="w-full mb-8 sm:mb-12">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 px-2">
                    {interests.map(({ id, name, icon: Icon }) => (
                        <button
                            key={id}
                            type="button"
                            onClick={() => toggleInterest(id)}
                            className={`p-3 sm:p-4 rounded-lg border-2 flex flex-col items-center transition-all h-40 justify-center ${selectedInterests.includes(id)
                                    ? 'border-[#B30738] bg-[#B30738] bg-opacity-10'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                        >
                            <Icon
                                size={40}
                                color={selectedInterests.includes(id) ? '#ffffff' : '#B30738'}
                                className="mb-2"
                            />
                            <span className={`text-sm sm:text-base font-medium ${selectedInterests.includes(id) ? 'text-white' : 'text-gray-900'
                                }`}>
                                {name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}