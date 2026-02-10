"use client"
import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqData = [
    {
        question: "What is AssumeChat?",
        answer: "AssumeChat is a “reverse social-media” platform—think of it as an exclusive Omegle just for your campus where you meet new people first and let existing friends shape your online identity later."
    },
    {
        question: "How is it different from the social apps I already use?",
        answer: "Traditional networks start with people you know and reward self-promotion. AssumeChat flips both ideas: you’re paired anonymously with classmates you haven’t met, and only others can add posts or “assumptions” to your profile."
    },
    {
        question: "Who can join?",
        answer: "Early releases focus on college communities. Launch campaigns match incoming students the summer before classes begin so everyone arrives with a few ice-breaking chats under their belt."
    },
    {
        question: "Why can’t I post about myself?",
        answer: "The core experiment is to hear how others actually see you. By outsourcing posts to friends and strangers, AssumeChat exposes blind spots and unspoken perceptions you’d never discover on a standard profile."
    },
    {
        question: "Is it safe?",
        answer: "Conversations are AI-moderated for harassment and self-harm signals. You can block, report, or instantly end a chat. Because profiles are built by others, no private photos or personal contact info are ever required."
    }
];

export default function FnQsection() {
    return (
        <section className="py-24 px-6 md:px-16 bg-[#FFF5F5]"> {/* Theme Light Pink Background */}
            <div className="max-w-5xl mx-auto">
                
                {/* --- Heading Section --- */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold text-black mb-4">
                        Frequently Asked <span className="text-[#B30738]">Questions</span>
                    </h2>
                    <p className="text-gray-600 text-lg md:text-xl font-medium">
                        Don&apos;t Take It From Us Take It From the Ones Who Assumed.
                    </p>
                </div>

                {/* --- Accordion Section --- */}
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqData.map((faq, index) => (
                        <AccordionItem 
                            key={index} 
                            value={`item-${index}`}
                            className="border-b border-red-200 data-[state=open]:bg-[#B30738] data-[state=open]:rounded-[40px] data-[state=open]:border-none transition-all duration-300 px-8"
                        >
                            <AccordionTrigger className="text-left text-lg md:text-2xl font-bold text-gray-900 data-[state=open]:text-white hover:no-underline py-8">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-white text-lg md:text-xl pb-8 leading-relaxed opacity-90">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                
            </div>
        </section>
    );
}