"use client"
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import axios from 'axios';
import { setUser } from '@/store/slices/userSlice';
import { BsGoogle, BsGooglePlay } from 'react-icons/bs';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToSignup: () => void;
}

export default function LoginModal({ isOpen, onClose, onSwitchToSignup }: LoginModalProps) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
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
            onClose();
            router.push('/waitingRoom');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] rounded-[40px] p-10 outline-none border-red-100">
                <DialogHeader className="text-center">
                    <DialogTitle className="text-4xl font-bold text-black">Login to your account</DialogTitle>
                    <p className="text-sm text-gray-600 mt-2">
                        Don't have an account?{" "}
                        <button onClick={onSwitchToSignup} className="text-[#B30738] font-bold hover:underline">
                            Sign up
                        </button>
                    </p>
                </DialogHeader>

                <form onSubmit={handleLogin} className="space-y-6 mt-8">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-black ml-1">Email ID</label>
                        <input
                            type="email"
                            placeholder="Enter email id"
                            className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-1 focus:ring-[#B30738] outline-none transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-black ml-1">Set Your Password</label>
                        <input
                            type="password"
                            placeholder="Enter Your Password"
                            className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-1 focus:ring-[#B30738] outline-none transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#B30738] text-white py-4 rounded-full font-bold text-xl hover:bg-red-800 transition-all shadow-lg"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="relative my-8 flex items-center">
                    <div className="flex-grow border-t border-gray-100"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-sm">Or</span>
                    <div className="flex-grow border-t border-gray-100"></div>
                </div>

                <button className="w-full border border-gray-200 py-4 rounded-full flex items-center justify-center gap-3 hover:bg-gray-50 transition-all group">
                   <BsGoogle/>
                    <span className="font-bold text-gray-700">Continue with Google</span>
                </button>
            </DialogContent>
        </Dialog>
    );
}