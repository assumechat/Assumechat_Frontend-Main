'use client';

import { Circle, CheckCircle2 } from 'lucide-react';

interface StepTwoProps {
    selectedOption: string | null;
    setSelectedOption: (option: string | null) => void;
    options: { id: string; label: string }[];
    handleSelect: (id: string) => void;
}

export default function StepThree({
    selectedOption,
    options,
    handleSelect
}: StepTwoProps) {
    return (
        <>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 text-center sm:text-left">
                Choose Who You Chat With
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8 text-center sm:text-left">
                Pick the kind of people you'd like to meet.
            </p>

            {/* Selection options - Vertical layout with responsive width */}
            <div className="w-full mb-8 sm:mb-12">
                <div className="flex flex-col items-center gap-4 w-full">
                    {options.map((option) => (
                        <div key={option.id} className="flex items-center gap-3 w-full max-w-2xl">
                            {selectedOption === option.id ? (
                                <CheckCircle2 className="text-[#B30738] flex-shrink-0" size={24} />
                            ) : (
                                <Circle className="text-[#B30738] flex-shrink-0" size={24} />
                            )}
                            <button
                                type="button"
                                onClick={() => handleSelect(option.id)}
                                className={`flex-1 p-4 rounded-lg border-2 transition-all w-full text-left ${selectedOption === option.id
                                    ? 'border-[#B30738] bg-[#B30738] text-white'
                                    : 'border-gray-200 hover:border-gray-300 bg-white'
                                    }`}
                            >
                                <span className={`font-medium ${selectedOption === option.id ? 'text-white' : 'text-gray-700'
                                    }`}>
                                    {option.label}
                                </span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}