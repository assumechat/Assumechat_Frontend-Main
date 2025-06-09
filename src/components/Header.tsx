'use client';
import { UserState } from '@/types/userstate';
import { RootState } from '@reduxjs/toolkit/query';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/lib/logout';
import { logout } from '@/store/slices/userSlice';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const user = useSelector((state: { user: UserState }) => state.user.user);
    const isAuthenticated = useSelector((state: { user: UserState }) => state.user.isAuthenticated);

    const router = useRouter();
    const dispatch = useDispatch();

    // helper to check active link
    const isActive = (href: string) => pathname === href;

    const handleLogout = async () => {
        await logoutUser();
        dispatch(logout());
        router.push('/');
    };
    return (
        <>
            <header className="w-full fixed px-4 md:px-20 py-4 flex items-center justify-between border-b border-gray-200 bg-opacity-30 backdrop-blur-[2px] z-50">
                {/* Logo */}
                <div className="text-2xl font-bold text-[#B30738]">
                    <Link href="/">AssumeChat</Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>

                {/* Desktop Nav */}
                <nav className="hidden md:flex font-medium space-x-14 text-md">
                    {
                        isAuthenticated ? (
                            [
                                { label: 'Waiting Room', href: '/waitingRoom' },
                                { label: 'Profile', href: '/ComingSoon' },
                            ].map(({ label, href }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`
                        py-2
                        ${isActive(href)
                                            ? 'text-[#B30738] border-b-2 border-[#B30738]'
                                            : 'text-gray-700 hover:text-[#B30738]'}
                        transition
                      `}
                                >
                                    {label}
                                </Link>
                            ))
                        ) : (
                            [
                                { label: 'How it works?', href: '/ComingSoon' },
                                { label: 'Features', href: '/ComingSoon' },
                                { label: 'About Us', href: '/ComingSoon' },
                            ].map(({ label, href }) => (
                                <Link
                                    key={`${label}-${href}`}
                                    href={href}
                                    className={`
                        py-2
                        ${isActive(href)
                                            ? 'text-[#B30738] border-b-2 border-[#B30738]'
                                            : 'text-gray-700 hover:text-[#B30738]'}
                        transition
                      `}
                                >
                                    {label}
                                </Link>
                            ))
                        )
                    }
                </nav>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center space-x-3">
                    {
                        isAuthenticated ? (
                            <Link
                                href="/signin"
                                onClick={handleLogout}
                                className={`
              px-6 md:px-12 py-2 border border-[#B30738] rounded-lg
              ${isActive('/signin')
                                        ? 'bg-gray-300 text-black'
                                        : 'bg-white text-[#B30738] hover:bg-gray-100'}
              transition
            `}
                            >
                                Log Out
                            </Link>

                        ) : (
                            <>
                                <Link
                                    href="/signin"
                                    className={`
              px-6 md:px-12 py-2 border border-[#B30738] rounded-lg
              ${isActive('/signin')
                                            ? 'bg-gray-300 text-black'
                                            : 'bg-white text-[#B30738] hover:bg-gray-100'}
              transition
            `}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/signup"
                                    className={`
              px-6 md:px-12 py-2 rounded-lg
              ${isActive('/signup')
                                            ? 'bg-red-800 text-white'
                                            : 'bg-[#B30738] text-white hover:bg-[#95052c]'}
              transition
            `}
                                >
                                    Sign Up
                                </Link>
                            </>
                        )
                    }
                </div>
            </header>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed top-16 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-lg z-40 md:hidden border-b border-gray-200">
                    <nav className="flex flex-col p-4 space-y-4">
                        {
                            isAuthenticated ? (

                                [
                                    { label: 'Waiting Room', href: '/waitingRoom' },
                                    { label: 'Profile', href: '/ComingSoon' },
                                ].map(({ label, href }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        className={`
                              py-2 px-4
                              ${isActive(href)
                                                ? 'text-[#B30738] font-bold'
                                                : 'text-gray-700 hover:text-[#B30738]'}
                            `}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {label}
                                    </Link>
                                ))

                            ) :
                                (

                                    [
                                        { label: 'How it works?', href: '/ComingSoon' },
                                        { label: 'Features', href: '/ComingSoon' },
                                        { label: 'About Us', href: '/ComingSoon' },
                                    ].map(({ label, href }) => (
                                        <Link
                                            key={`${label}-${href}`}
                                            href={href}
                                            className={`
                                  py-2 px-4
                                  ${isActive(href)
                                                    ? 'text-[#B30738] font-bold'
                                                    : 'text-gray-700 hover:text-[#B30738]'}
                                `}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {label}
                                        </Link>
                                    ))

                                )

                        }

                        <div className="flex flex-col space-y-3 pt-2">
                            {
                                isAuthenticated ? (
                                    <Link
                                        href="/"
                                        className={`
                      px-6 py-2 border border-[#B30738] rounded-lg text-center
                      ${isActive('/signin')
                                                ? 'bg-gray-300 text-black'
                                                : 'bg-white text-[#B30738] hover:bg-gray-100'}
                    `}
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        Log Out
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href="/signin"
                                            className={`
                  px-6 py-2 border border-[#B30738] rounded-lg text-center
                  ${isActive('/signin')
                                                    ? 'bg-gray-300 text-black'
                                                    : 'bg-white text-[#B30738] hover:bg-gray-100'}
                `}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href="/signup"
                                            className={`
                  px-6 py-2 rounded-lg text-center
                  ${isActive('/signup')
                                                    ? 'bg-red-800 text-white'
                                                    : 'bg-[#B30738] text-white hover:bg-[#95052c]'}
                `}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Sign Up
                                        </Link>
                                    </>
                                )
                            }
                        </div>
                    </nav >
                </div >
            )
            }
        </>
    );
}
