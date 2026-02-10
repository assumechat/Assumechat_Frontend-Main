'use client';
import { UserState } from '@/types/userstate';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/lib/logout';
import { logout } from '@/store/slices/userSlice';
import SignupModal from './Signup-Modal';
import LoginModal from './Signin-Modal';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const isAuthenticated = useSelector((state: { user: UserState }) => state.user.isAuthenticated);
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();

    const isActive = (href: string) => pathname === href;

    const handleLogout = async () => {
        await logoutUser();
        dispatch(logout());
        router.push('/');
    };
    // Helper functions to switch between them
    const openSignup = () => {
        setIsLoginOpen(false);
        setIsSignupOpen(true);
    };

    const openLogin = () => {
        setIsSignupOpen(false);
        setIsLoginOpen(true);
    };
    // Updated links based on the image
    const guestLinks = [
        { label: 'Home', href: '/' },
        { label: 'How it works', href: '#how-it-works' },
        { label: "FAQ's", href: '#faq' },
        { label: 'Review', href: '#review' },
    ];

    const authLinks = [
        { label: 'Games', href: '/game' },
        { label: 'Profile', href: '/profile' },
    ];

    const currentLinks = isAuthenticated ? authLinks : guestLinks;

    return (
        <>
            <header className="w-full fixed top-0 left-0 bg-white border-b border-gray-100 z-50">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">

                    {/* Logo: Circle icon + Text */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-white border-2 border-[#B30738] rounded-full flex items-center justify-center text-[#B30738] font-bold italic text-sm transition-colors group-hover:bg-[#B30738] group-hover:text-white">
                            A
                        </div>
                        <span className="text-2xl font-bold text-[#B30738]">AssumeChat</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-12">
                        {currentLinks.map(({ label, href }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`text-md font-medium transition-colors ${isActive(href)
                                    ? 'text-[#B30738]'
                                    : 'text-gray-400 hover:text-[#B30738]'
                                    }`}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Action Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="px-8 py-2.5 border border-[#B30738] text-[#B30738] rounded-xl font-bold hover:bg-red-50 transition-all"
                            >
                                Log Out
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={openLogin}
                                    className="px-10 py-2.5 border border-[#B30738] text-[#B30738] rounded-xl font-bold"
                                >
                                    Log In
                                </button>
                                <button
                                    onClick={openSignup}
                                    className="px-10 py-2.5 bg-[#B30738] text-white rounded-xl font-bold"
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-gray-700 p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 top-[72px] bg-white z-40 md:hidden animate-in fade-in slide-in-from-top-4">
                    <nav className="flex flex-col p-6 space-y-6">
                        {currentLinks.map(({ label, href }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`text-xl font-semibold ${isActive(href) ? 'text-[#B30738]' : 'text-gray-600'
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {label}
                            </Link>
                        ))}
                        <div className="pt-6 flex flex-col gap-4 border-t border-gray-100">
                            {isAuthenticated ? (
                                <button
                                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                    className="w-full py-4 border border-[#B30738] text-[#B30738] rounded-xl font-bold"
                                >
                                    Log Out
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={openLogin}
                                        className="px-10 py-2.5 border border-[#B30738] text-[#B30738] rounded-xl font-bold"
                                    >
                                        Log In
                                    </button>
                                    <button
                                        onClick={openSignup}
                                        className="px-10 py-2.5 bg-[#B30738] text-white rounded-xl font-bold"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            )}
            {/* Spacer to prevent content from going under the fixed header */}
            <div className="h-[72px]"></div>
            <SignupModal
                isOpen={isSignupOpen}
                onClose={() => setIsSignupOpen(false)}
            />
            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onSwitchToSignup={openSignup}
            />
        </>
    );
}