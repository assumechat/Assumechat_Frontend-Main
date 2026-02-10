"use client"
import React from 'react';

const steps = [
  {
    number: 1,
    title: "Join The Community",
    description: "Join the community and start your gaming journey."
  },
  {
    number: 2,
    title: "Stake Crypto Coins",
    description: "Stake crypto coins securely before entering the match."
  },
  {
    number: 3,
    title: "Match With A Player",
    description: "Get paired instantly with a competing online player."
  },
  {
    number: 4,
    title: "Trust Or Betray",
    description: "Decide your move carefully: trust them or betray."
  },
  {
    number: 5,
    title: "Win Or Lose Coins",
    description: "Experience real outcomes: win coins or lose stakes."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-42 px-6 bg-[#FCFBFB]">
      <div className="max-w-6xl mx-auto">
        {/* Header Text */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            What Is the <span className="text-[#B30738]">Trust Game?</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            A strategic mind game where trust and betrayal decide your final rewards.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`
                bg-[#B30738] rounded-[40px] p-8 w-full sm:w-[340px] min-h-[280px] 
                flex flex-col items-start transition-transform hover:scale-105 duration-300
                shadow-xl
              `}
            >
              {/* Number Badge */}
              <div className="bg-white rounded-2xl w-14 h-14 flex items-center justify-center mb-8">
                <span className="text-black text-2xl font-bold">{step.number}</span>
              </div>

              {/* Content */}
              <h3 className="text-white text-2xl font-bold mb-4 leading-tight">
                {step.title}
              </h3>
              <p className="text-red-100 text-lg leading-relaxed opacity-90">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}