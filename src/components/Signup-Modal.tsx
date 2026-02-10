"use client"
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

type SignupStep = 'FORM' | 'OTP' | 'PROFILE' | 'WALLET';

export default function SignupModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [step, setStep] = useState<SignupStep>('FORM');
    const [loading, setLoading] = useState(false);
    
    // Form States
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', password: '',
        otp: '', username: '', gender: '', avatar: ''
    });

    const nextStep = () => {
        if (step === 'FORM') setStep('OTP');
        else if (step === 'OTP') setStep('PROFILE');
        else if (step === 'PROFILE') setStep('WALLET');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const avatars = [1, 2, 3, 4, 5]; // Placeholder for avatar selection

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] rounded-[40px] p-10 outline-none border-red-100">
                
                {/* --- STEP 0: CREATE ACCOUNT --- */}
                {step === 'FORM' && (
                    <div className="animate-in fade-in duration-300">
                        <DialogHeader className="text-center">
                            <DialogTitle className="text-4xl font-bold text-black">Create an Account</DialogTitle>
                            <p className="text-sm text-gray-600 mt-2">
                                If you have already an account <span className="text-[#B30738] font-bold cursor-pointer hover:underline">Sign in</span>
                            </p>
                        </DialogHeader>
                        <div className="space-y-4 mt-8">
                            <div className="space-y-1">
                                <label className="text-sm font-bold">First Name</label>
                                <input name="firstName" placeholder="Enter First name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-1 focus:ring-[#B30738] outline-none" onChange={handleInputChange} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-bold">Last Name</label>
                                <input name="lastName" placeholder="Enter last name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-1 focus:ring-[#B30738] outline-none" onChange={handleInputChange} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-bold">Email ID</label>
                                <input name="email" type="email" placeholder="Enter email id" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-1 focus:ring-[#B30738] outline-none" onChange={handleInputChange} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-bold">Set Your Password</label>
                                <input name="password" type="password" placeholder="Enter Your Password" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-1 focus:ring-[#B30738] outline-none" onChange={handleInputChange} />
                            </div>
                            <button onClick={nextStep} className="w-full bg-[#B30738] text-white py-4 rounded-full font-bold text-lg mt-6 hover:bg-red-800 transition-all">Sign Up</button>
                        </div>
                    </div>
                )}

                {/* --- STEP 1: VERIFY EMAIL (OTP) --- */}
                {step === 'OTP' && (
                    <div className="animate-in slide-in-from-right-4 duration-300 text-center">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-bold">Verify Your Email Address</DialogTitle>
                            <p className="text-gray-500 mt-4 text-sm leading-relaxed px-6">
                                We've sent a verification code to your email address.<br/>Please enter the code below to continue.
                            </p>
                        </DialogHeader>
                        
                        <div className="flex flex-col items-center mt-12">
                            <p className="text-sm font-medium mb-6">Enter Verification code send to email</p>
                            <InputOTP maxLength={6} value={formData.otp} onChange={(v) => setFormData({...formData, otp: v})}>
                                <InputOTPGroup className="gap-3">
                                    {[0,1,2,3,4,5].map(i => (
                                        <InputOTPSlot key={i} index={i} className="w-12 h-14 rounded-xl border-gray-300 text-xl font-bold" />
                                    ))}
                                </InputOTPGroup>
                            </InputOTP>
                            <p className="mt-8 text-sm text-gray-600">
                                If you not receive a code <span className="text-[#B30738] font-bold cursor-pointer">Resend</span>
                            </p>
                        </div>
                        <button onClick={nextStep} className="w-full bg-[#B30738] text-white py-4 rounded-full font-bold text-lg mt-10">Verify</button>
                    </div>
                )}

                {/* --- STEP 2: USERNAME & AVATAR --- */}
                {step === 'PROFILE' && (
                    <div className="animate-in slide-in-from-right-4 duration-300">
                        <DialogHeader className="text-center">
                            <DialogTitle className="text-3xl font-bold">Select Username & Avatar</DialogTitle>
                            <p className="text-gray-500 mt-2">Create your identity for the community</p>
                        </DialogHeader>
                        <div className="space-y-6 mt-10">
                            <div className="space-y-2">
                                <label className="text-sm font-bold">Username</label>
                                <input name="username" placeholder="Enter username" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold">Gender</label>
                                <select name="gender" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none appearance-none" onChange={handleInputChange}>
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="space-y-4">
                                <label className="text-sm font-bold">Avatar</label>
                                <div className="flex justify-between gap-2">
                                    {avatars.map(a => (
                                        <div key={a} className="w-14 h-14 rounded-full border border-[#B30738] bg-gray-50 cursor-pointer hover:bg-red-50 transition-colors" />
                                    ))}
                                </div>
                            </div>
                            <button onClick={nextStep} className="w-full bg-[#B30738] text-white py-4 rounded-full font-bold text-lg mt-4">Continue</button>
                        </div>
                    </div>
                )}

                {/* --- STEP 3: WALLET CONNECTION --- */}
                {step === 'WALLET' && (
                    <div className="animate-in slide-in-from-right-4 duration-300 text-center">
                        <DialogHeader>
                            <DialogTitle className="text-4xl font-bold">Connect your wallet</DialogTitle>
                            <p className="text-gray-500 mt-2 text-sm">Securely link your wallet to begin.</p>
                        </DialogHeader>
                        <div className="mt-10 space-y-3">
                            {['Rainbow', 'MetaMask', 'Gnosis Safe', 'Argent'].map((wallet) => (
                                <button key={wallet} className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200">
                                    <span className="font-bold text-gray-800">{wallet}</span>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </button>
                            ))}
                        </div>
                        <button className="text-[#B30738] text-sm font-medium mt-8 underline underline-offset-4 decoration-[#B30738]">
                            View QR code instead
                        </button>
                        <button onClick={onClose} className="w-full bg-[#B30738] text-white py-4 rounded-full font-bold text-lg mt-10">Connect</button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}