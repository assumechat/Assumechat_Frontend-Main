"use client"
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { setUser } from '@/store/slices/userSlice';
import { toast } from 'sonner';
import axios from 'axios';
import Link from 'next/link';
import { Mail, ArrowRight } from 'lucide-react';
import { RootState } from '@/store';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const dispatch = useDispatch();
    const router = useRouter();
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/waitingRoom");
        }
    }, [isAuthenticated, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}Auth/login`;
            const res = await axios.post(apiUrl, { email, password });
            
            localStorage.setItem('refreshToken', res.data.data.refreshToken);
            dispatch(setUser({
                accessToken: res.data.data.accessToken,
                user: res.data.data.user,
            }));

            toast.success('Login Successful!');
            router.push('/waitingRoom');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* --- Minimal Header --- */}
            <header className="px-6 md:px-16 py-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white border-2 border-[#B30738] rounded-full flex items-center justify-center text-[#B30738] font-bold italic text-sm">
                        A
                    </div>
                    <span className="text-2xl font-bold text-[#B30738]">AssumeChat</span>
                </Link>
                <button 
                    onClick={() => router.push('/play')}
                    className="bg-[#EF233C] text-white px-8 py-2.5 rounded-xl font-bold hover:bg-red-700 transition-all"
                >
                    Play Now
                </button>
            </header>

            {/* --- Main Content --- */}
            <main className="flex-grow flex flex-col lg:flex-row items-center justify-center px-6 md:px-20 gap-16 lg:gap-32">
                
                {/* Left Side: Hero Text */}
                <div className="max-w-md text-center lg:text-left">
                    <h1 className="text-5xl md:text-7xl font-black text-[#0B1A28] leading-tight">
                        Choose your Entry
                    </h1>
                    <p className="mt-4 text-gray-500 text-xl font-medium">
                        Fast, Secure & Anonymous.
                    </p>
                </div>

                {/* Right Side: Login Options */}
                <div className="w-full max-w-[420px] flex flex-col">
                    
                    {/* Recommended: Wallet */}
                    <div className="space-y-2">
                        <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Recommended</span>
                        <button className="w-full py-4 border-2 border-[#B30738] text-[#B30738] rounded-xl font-bold text-lg hover:bg-red-50 transition-all">
                            Connect Wallet
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative my-10 flex items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-sm font-bold">OR</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    {/* Email Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase ml-1">Email</span>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B30738]" />
                                <input 
                                    type="email"
                                    placeholder="yourname@university.edu"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-gray-200 outline-none transition-all text-gray-800"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field (Styled to match the new look) */}
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase ml-1">Password</span>
                            <input 
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-4 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-gray-200 outline-none transition-all text-gray-800"
                                required
                            />
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#EF233C] text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-md mt-2"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-[#B30738] text-xs font-bold tracking-tight">
                            Earn 10 <span className="text-gray-400 font-normal">free i2i practice coins</span>
                        </p>
                        <p className="mt-8 text-sm text-gray-500">
                            Don't have an account?{' '}
                            <Link href="/" className="text-[#B30738] font-bold hover:underline">Sign Up</Link>
                        </p>
                    </div>
                </div>

            </main>
        </div>
    );
}