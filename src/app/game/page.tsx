"use client"
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Copy, ChevronDown, Check } from 'lucide-react';
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import Link from 'next/link';

export default function HostGameUI() {
    const [participants] = useState(new Array(8).fill("Christian Bale"));
    const [date, setDate] = useState<Date | undefined>(new Date(2026, 0, 2));
    const [time, setTime] = useState("23:59");
    const [copied, setCopied] = useState(false);

    const sessionCode = "12322JSS";

    const handleCopy = () => {
        navigator.clipboard.writeText(sessionCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative min-h-screen w-full bg-[#FCFBFB] flex flex-row overflow-x-hidden">
            
            {/* --- Main Content Area --- */}
            {/* md:pr-80 ensures the content doesn't go under the fixed sidebar */}
            <main className="flex-grow w-full flex  justify-start px-6 md:px-40 py-16 z-10 transition-all">
                <div className="">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-black text-black leading-tight tracking-tight">
                            <span className="text-[#B30738]">Host games.</span> Build <br />
                            trust. Win together.
                        </h1>
                        <p className="mt-6 text-gray-700 text-xl font-medium max-w-lg">
                            A community-powered game where trust decides your rewards.
                        </p>
                    </div>

                    <div className="mt-12 space-y-8 max-w-xl">
                        {/* Host session until */}
                        <div className="flex items-center justify-between gap-4">
                            <label className="text-lg font-bold text-gray-800">Host session until</label>
                            <div className="relative w-64">
                                <select className="w-full appearance-none border border-[#B30738] rounded-xl px-4 py-3 bg-white text-gray-700 focus:outline-none cursor-pointer font-semibold shadow-sm">
                                    <option>Scheduled Time</option>
                                    <option>Immediate Start</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                        </div>

                        {/* Scheduled Time */}
                        <div className="flex items-center justify-between gap-4">
                            <label className="text-lg font-bold text-gray-800">Scheduled Time</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            " justify-start py-6 text-left font-semibold border-[#B30738] rounded-xl hover:bg-red-50 shadow-sm",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-3 h-5 w-5 text-[#B30738]" />
                                        {date ? (
                                            `${time} ${format(date, "MM/dd/yyyy")}`
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0 rounded-2xl shadow-2xl border-none" align="end">
                                    <div className="p-4 w-full justify-between border-b border-gray-100 flex items-center bg-gray-50 rounded-t-2xl">
                                        <span className="text-sm font-bold text-[#B30738]">Set Time</span>
                                        <input 
                                            type="time" 
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                            className="border rounded-lg px-3 py-1 text-sm outline-none focus:ring-2 focus:ring-[#B30738]"
                                        />
                                    </div>
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        
                                        className="w-64"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Number of players */}
                        <div className="flex items-center justify-between gap-4">
                            <label className="text-lg font-bold text-gray-800">Number of players</label>
                            <Input
                                type="number"
                                defaultValue="500"
                                className="w-32 py-6 border-[#B30738] rounded-xl text-center font-bold text-lg focus-visible:ring-[#B30738] shadow-sm"
                            />
                        </div>

                        {/* Code for session */}
                        <div className="flex items-center justify-between gap-4">
                            <label className="text-lg font-bold text-gray-800">Code for session</label>
                            <div className="flex items-center justify-between border border-[#B30738] rounded-xl px-6 py-3 bg-white text-gray-700 w-44 shadow-sm">
                                <span className="text-md font-black tracking-widest">{sessionCode}</span>
                                <button 
                                    onClick={handleCopy}
                                    className="text-[#B30738] hover:scale-125 transition-transform"
                                >
                                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <Link href="/chatscreen" className="bg-[#B30738] hover:bg-red-800 text-white font-black py-4 px-14 rounded-2xl text-xl transition-all shadow-xl mt-6 active:scale-95">
                            Start Game
                        </Link>
                    </div>
                </div>
            </main>

            {/* --- THE SIDEBAR (Fixed Right) --- */}
            <aside className="hidden md:flex flex-col mt-20 fixed right-0 top-0 h-screen w-1/3 bg-[#FFF8F9] border-l border-red-100 p-10 z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.02)] overflow-y-auto">
                <h2 className="text-2xl font-black text-[#B30738] leading-tight">People in this hosted game</h2>
                <p className="text-gray-400 text-sm mt-1 font-bold">52/500 have joined</p>

                <div className="mt-12 space-y-8">
                    {participants.map((name, i) => (
                        <div key={i} className="flex items-center gap-4 group cursor-pointer">
                            <div className="relative">
                                <div className="w-14 h-14 bg-[#1E272E] rounded-full overflow-hidden transition-transform group-hover:scale-110 shadow-lg" />
                                <div className="absolute top-0 right-0 w-4 h-4 bg-[#44BD32] border-2 border-white rounded-full shadow-sm" />
                            </div>
                            <span className="text-lg font-bold text-gray-800 group-hover:text-[#B30738] transition-colors">{name}</span>
                        </div>
                    ))}
                </div>
            </aside>

            {/* --- Bottom Wavy Graphics --- */}
            {/* Added relative and z-index to stay behind content but visible */}
            <div className="fixed bottom-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none z-0">
                <svg viewBox="0 0 1412 153" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full opacity-100">
                    <circle cx="91.9407" cy="178.269" r="119.423" fill="#B30738" />
                    <circle cx="394.83" cy="178.27" r="147.981" fill="#B30738" />
                    <circle cx="1052.52" cy="178.269" r="178.269" fill="#B30738" />
                    <circle cx="828.384" cy="180" r="121.154" fill="#B30738" />
                    <circle cx="224.348" cy="178.27" r="78.75" fill="#B30738" />
                    <circle cx="562.713" cy="177.406" r="54.5192" fill="#B30738" />
                    <circle cx="-27.4808" cy="177.406" r="54.5192" fill="#B30738" />
                    <circle cx="666.558" cy="159.231" r="72.6923" fill="#B30738" />
                    <circle cx="1227.33" cy="159.231" r="72.6923" fill="#B30738" />
                    <circle cx="1338.96" cy="159.231" r="72.6923" fill="#B30738" />
                </svg>
            </div>
        </div>
    );
}