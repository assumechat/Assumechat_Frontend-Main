'use client';

import { usePathname } from 'next/navigation';
import { Eye, PlayCircle, Gamepad2, University, MessageSquare, Film, Heart, Bookmark, History } from 'lucide-react';
import Link from 'next/link';
import React, { useState, ReactNode, Children } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useDisclosure } from '@chakra-ui/react';
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Button } from '@chakra-ui/react';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/lib/logout';
import { logout } from '@/store/slices/userSlice';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { position, waiting, online } = useAppSelector(s => s.socket);
    const pathname = usePathname();
    const isAuthenticated = useSelector((state: { user: any }) => state.user.isAuthenticated);
    const isActive = (href: string) => pathname === href;
    const currentTab = pathname.split('/')[3] || 'reels';


    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await logoutUser();
        dispatch(logout());
        router.push('/');
    };

    const mainTabs = [
        { id: 'reels', icon: Film, label: 'Reels' },
        { id: 'minigames', icon: Gamepad2, label: 'Mini Games' },
        { id: 'unispace', icon: University, label: 'Uni Space' },
        { id: 'assumer', icon: MessageSquare, label: 'Assumer' }
    ];

    const getSubTabs = () => {
        switch (currentTab) {
            case 'reels':
                return [
                    { id: 'my-reels', icon: Film, label: 'My Reels' },
                    { id: 'liked-reels', icon: Heart, label: 'Liked Reels' }
                ];
            case 'minigames':
                return [
                    { id: 'saved-games', icon: Bookmark, label: 'Saved Games' }
                ];
            case 'unispace':
                return [
                    { id: 'overview', icon: Eye, label: 'Overview' },
                    { id: 'universities', icon: University, label: 'Universities' }
                ];
            case 'assumer':
                return [
                    { id: 'chat-history', icon: History, label: 'Chat History' },
                    { id: 'chat1', icon: MessageSquare, label: 'Chat 1' },
                ];
            default:
                return [];
        }
    };
    return (
        <>
            <header className="w-full fixed px-4 md:px-20 py-4 flex items-center justify-between bg-white z-50">
                {/* Logo */}
                <div className="text-2xl font-bold text-[#B30738]">
                    <Link href="/">AssumeChat</Link>
                </div>

                {/* Mobile Menu Button */}
                <button

                    className="md:hidden text-gray-700 "

                    onClick={isOpen ? onClose : onOpen}
                >
                    {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>

                {/* Desktop Nav */}
                <nav className="hidden md:flex font-medium space-x-14 text-md">
                    {isAuthenticated ? (
                        [
                            { label: 'Waiting Room', href: '/waitingRoom' },
                            { label: 'Profile', href: '/ComingSoon' },
                        ].map(({ label, href }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`py-2 ${isActive(href)
                                    ? 'text-[#B30738] border-b-2 border-[#B30738]'
                                    : 'text-gray-700 hover:text-[#B30738]'
                                    } transition`}
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
                                className={`py-2 ${isActive(href)
                                    ? 'text-[#B30738] border-b-2 border-[#B30738]'
                                    : 'text-gray-700 hover:text-[#B30738]'
                                    } transition`}
                            >
                                {label}
                            </Link>
                        ))
                    )}
                </nav>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center space-x-3">
                    {isAuthenticated ? (
                        <Link
                            href="/signin"
                            onClick={handleLogout}
                            className={`px-6 md:px-12 py-2 border border-[#B30738] rounded-lg ${isActive('/signin')
                                ? 'bg-gray-300 text-black'
                                : 'bg-white text-[#B30738] hover:bg-gray-100'
                                } transition`}
                        >
                            Log Out
                        </Link>
                    ) : (
                        <>
                            <Link
                                href="/signin"
                                className={`px-6 md:px-12 py-2 border border-[#B30738] rounded-lg ${isActive('/signin')
                                    ? 'bg-gray-300 text-black'
                                    : 'bg-white text-[#B30738] hover:bg-gray-100'
                                    } transition`}
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/signup"
                                className={`px-6 md:px-12 py-2 rounded-lg ${isActive('/signup')
                                    ? 'bg-red-800 text-white'
                                    : 'bg-[#B30738] text-white hover:bg-[#95052c]'
                                    } transition`}
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </header>
            {/* Mobile Menu */}
            <Drawer isOpen={isOpen} placement="left" onClose={onClose} >
                <DrawerOverlay />

                <DrawerContent
                    maxW="70vw"
                    w={{ base: "70vw", md: "400px" }}
                    transition="width 0.3s ease"
                >
                    <DrawerCloseButton />
                    <DrawerBody >
                        <div className="h-screen overflow-y-auto relative top-12 left-0 right-0 bg-white  bg-opacity-95 backdrop-blur-lg z-40 md:hidden border-b border-gray-200">
                            <nav className="flex flex-col py-4 px-1 space-y-4">
                                <div className="bg-white border border-[#B30738] rounded-lg py-3 px-1 mr-4  flex items-center justify-between">
                                    <div className="flex items-center">
                                        <svg className='mx-2' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.75 2.5C12.1398 2.5 10.7594 3.91875 10 6.08203C9.24062 3.91875 7.86016 2.5 6.25 2.5C3.79688 2.5 1.875 5.79453 1.875 10C1.875 14.2055 3.79688 17.5 6.25 17.5C7.86016 17.5 9.24062 16.0812 10 13.918C10.7594 16.0812 12.1398 17.5 13.75 17.5C16.2031 17.5 18.125 14.2055 18.125 10C18.125 5.79453 16.2031 2.5 13.75 2.5ZM8.35312 14.5617C7.76797 15.6344 7.00156 16.25 6.25 16.25C5.49844 16.25 4.73203 15.6344 4.14688 14.5617C3.76859 13.8443 3.49898 13.0747 3.34687 12.2781C3.72764 12.4502 4.14547 12.5241 4.56217 12.4931C4.97887 12.4621 5.38115 12.3271 5.73222 12.1005C6.0833 11.8739 6.37198 11.5629 6.57188 11.196C6.77177 10.829 6.87651 10.4179 6.87651 10C6.87651 9.58215 6.77177 9.17096 6.57188 8.80402C6.37198 8.43709 6.0833 8.12611 5.73222 7.89951C5.38115 7.67292 4.97887 7.53794 4.56217 7.5069C4.14547 7.47587 3.72764 7.54978 3.34687 7.72187C3.49898 6.92526 3.76859 6.15566 4.14688 5.43828C4.73203 4.36563 5.49844 3.75 6.25 3.75C7.00156 3.75 7.76797 4.36563 8.35312 5.43828C9.01172 6.64609 9.375 8.26641 9.375 10C9.375 11.7336 9.01172 13.3539 8.35312 14.5617ZM3.125 10C3.125 9.75277 3.19831 9.5111 3.33566 9.30554C3.47301 9.09998 3.66824 8.93976 3.89665 8.84515C4.12505 8.75054 4.37639 8.72579 4.61886 8.77402C4.86134 8.82225 5.08407 8.9413 5.25888 9.11612C5.4337 9.29093 5.55275 9.51366 5.60098 9.75614C5.64921 9.99861 5.62446 10.2499 5.52985 10.4784C5.43524 10.7068 5.27502 10.902 5.06946 11.0393C4.8639 11.1767 4.62223 11.25 4.375 11.25C4.04348 11.25 3.72554 11.1183 3.49112 10.8839C3.2567 10.6495 3.125 10.3315 3.125 10ZM15.8531 14.5617C15.268 15.6344 14.5016 16.25 13.75 16.25C12.9984 16.25 12.232 15.6344 11.6469 14.5617C11.2686 13.8443 10.999 13.0747 10.8469 12.2781C11.2276 12.4502 11.6455 12.5241 12.0622 12.4931C12.4789 12.4621 12.8811 12.3271 13.2322 12.1005C13.5833 11.8739 13.872 11.5629 14.0719 11.196C14.2718 10.829 14.3765 10.4179 14.3765 10C14.3765 9.58215 14.2718 9.17096 14.0719 8.80402C13.872 8.43709 13.5833 8.12611 13.2322 7.89951C12.8811 7.67292 12.4789 7.53794 12.0622 7.5069C11.6455 7.47587 11.2276 7.54978 10.8469 7.72187C10.999 6.92526 11.2686 6.15566 11.6469 5.43828C12.232 4.36563 12.9984 3.75 13.75 3.75C14.5016 3.75 15.268 4.36563 15.8531 5.43828C16.5117 6.64609 16.875 8.26641 16.875 10C16.875 11.7336 16.5117 13.3539 15.8531 14.5617ZM10.625 10C10.625 9.75277 10.6983 9.5111 10.8357 9.30554C10.973 9.09998 11.1682 8.93976 11.3966 8.84515C11.6251 8.75054 11.8764 8.72579 12.1189 8.77402C12.3613 8.82225 12.5841 8.9413 12.7589 9.11612C12.9337 9.29093 13.0528 9.51366 13.101 9.75614C13.1492 9.99861 13.1245 10.2499 13.0299 10.4784C12.9352 10.7068 12.775 10.902 12.5695 11.0393C12.3639 11.1767 12.1222 11.25 11.875 11.25C11.5435 11.25 11.2255 11.1183 10.9911 10.8839C10.7567 10.6495 10.625 10.3315 10.625 10Z" fill="#B30738" />
                                        </svg>
                                        <span className="text-sm font-medium">{online || 0} Users Online</span>
                                    </div>
                                </div>
                                <div className="bg-white border border-[#B30738] rounded-lg py-3 px-1 mr-4  flex items-center justify-between">
                                    <div className="flex items-center">
                                        <svg className='mx-2' width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.625 4.40938V1.625C11.625 1.29348 11.4933 0.975537 11.2589 0.741116C11.0245 0.506696 10.7065 0.375 10.375 0.375H1.625C1.29348 0.375 0.975537 0.506696 0.741116 0.741116C0.506696 0.975537 0.375 1.29348 0.375 1.625V4.4375C0.375422 4.63148 0.420789 4.82273 0.50754 4.99623C0.594292 5.16973 0.720068 5.32077 0.875 5.4375L4.95859 8.5L0.875 11.5625C0.720068 11.6792 0.594292 11.8303 0.50754 12.0038C0.420789 12.1773 0.375422 12.3685 0.375 12.5625V15.375C0.375 15.7065 0.506696 16.0245 0.741116 16.2589C0.975537 16.4933 1.29348 16.625 1.625 16.625H10.375C10.7065 16.625 11.0245 16.4933 11.2589 16.2589C11.4933 16.0245 11.625 15.7065 11.625 15.375V12.5906C11.6246 12.3974 11.5796 12.2069 11.4935 12.0338C11.4075 11.8608 11.2827 11.7099 11.1289 11.593L7.03672 8.5L11.1289 5.40625C11.2828 5.28952 11.4076 5.13882 11.4937 4.9659C11.5797 4.79298 11.6247 4.60252 11.625 4.40938ZM1.625 1.625H10.375V4.40938L9.92422 4.75H2.04141L1.625 4.4375V1.625ZM6 7.71875L3.70859 6H8.27109L6 7.71875ZM10.375 15.375H1.625V12.5625L5.375 9.75V11.625C5.375 11.7908 5.44085 11.9497 5.55806 12.0669C5.67527 12.1842 5.83424 12.25 6 12.25C6.16576 12.25 6.32473 12.1842 6.44194 12.0669C6.55915 11.9497 6.625 11.7908 6.625 11.625V9.75625L10.375 12.5906V15.375Z" fill="#B30738" />
                                        </svg>
                                        <span className="text-sm font-medium">{position || 0} In Queue</span>
                                    </div>
                                </div>
                                <div className="bg-white border border-[#B30738] rounded-lg py-3 px-1 mr-4  flex items-center justify-between">
                                    <div className="flex items-center">
                                        <svg className='mx-2' width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.625 4.40938V1.625C11.625 1.29348 11.4933 0.975537 11.2589 0.741116C11.0245 0.506696 10.7065 0.375 10.375 0.375H1.625C1.29348 0.375 0.975537 0.506696 0.741116 0.741116C0.506696 0.975537 0.375 1.29348 0.375 1.625V4.4375C0.375422 4.63148 0.420789 4.82273 0.50754 4.99623C0.594292 5.16973 0.720068 5.32077 0.875 5.4375L4.95859 8.5L0.875 11.5625C0.720068 11.6792 0.594292 11.8303 0.50754 12.0038C0.420789 12.1773 0.375422 12.3685 0.375 12.5625V15.375C0.375 15.7065 0.506696 16.0245 0.741116 16.2589C0.975537 16.4933 1.29348 16.625 1.625 16.625H10.375C10.7065 16.625 11.0245 16.4933 11.2589 16.2589C11.4933 16.0245 11.625 15.7065 11.625 15.375V12.5906C11.6246 12.3974 11.5796 12.2069 11.4935 12.0338C11.4075 11.8608 11.2827 11.7099 11.1289 11.593L7.03672 8.5L11.1289 5.40625C11.2828 5.28952 11.4076 5.13882 11.4937 4.9659C11.5797 4.79298 11.6247 4.60252 11.625 4.40938ZM1.625 1.625H10.375V4.40938L9.92422 4.75H2.04141L1.625 4.4375V1.625ZM6 7.71875L3.70859 6H8.27109L6 7.71875ZM10.375 15.375H1.625V12.5625L5.375 9.75V11.625C5.375 11.7908 5.44085 11.9497 5.55806 12.0669C5.67527 12.1842 5.83424 12.25 6 12.25C6.16576 12.25 6.32473 12.1842 6.44194 12.0669C6.55915 11.9497 6.625 11.7908 6.625 11.625V9.75625L10.375 12.5906V15.375Z" fill="#B30738" />
                                        </svg>
                                        <span className="text-sm font-medium">{waiting || 0} User Waiting</span>
                                    </div>
                                </div>
                                <div className="space-y-1 py-2 px-0  mr-4">
                                    {mainTabs.map((tab) => (
                                        <Link
                                            key={tab.id}
                                            href={`/waitingRoom/tabs/${tab.id}`}
                                            className={`flex items-center p-3 rounded-lg transition-colors ${currentTab === tab.id
                                                ? 'bg-[#B30738] text-white'
                                                : 'hover:bg-gray-100 text-gray-700'
                                                }`}
                                        >
                                            <div className={`w-1 h-6 rounded-full  ${currentTab === tab.id ? 'bg-white' : 'bg-transparent'
                                                }`} />
                                            <div className='bg-[#B30738] mr-3 p-2 flex justify-center rounded-lg items-center'>
                                                <tab.icon color={currentTab === tab.id ? 'white' : "white"} size={20} />
                                            </div>
                                            <span className="font-medium">{tab.label}</span>
                                        </Link>
                                    ))}
                                </div>

                                <hr className="my-2 border-gray-200  " />
                                <div className="p-2">
                                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                                        {currentTab === 'reels' ? 'Reels' :
                                            currentTab === 'minigames' ? 'Games' :
                                                currentTab === 'unispace' ? 'Uni Space' : 'Chats'}
                                    </h3>
                                    <div className="space-y-1 py-3 px-1 mr-6 ml-3">
                                        {getSubTabs().map((tab) => (
                                            <Link
                                                key={tab.id}
                                                href={'/ComingSoon'}
                                                className={`flex items-center p-3 rounded-lg text-sm transition-colors ${pathname.includes(tab.id)
                                                    ? 'bg-[#B30738]/10 text-[#B30738]'
                                                    : 'hover:bg-gray-100 text-gray-700'
                                                    }`}
                                            >

                                                <div className='bg-[#B30738] mr-3 p-2 flex justify-center rounded-lg items-center'>
                                                    <tab.icon color={currentTab === tab.id ? 'white' : "white"} size={20} />
                                                </div>
                                                <span className="font-medium">{tab.label}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
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
                                <div className="flex flex-col space-y-3 pt-2 mr-4">
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
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};
// { children }: { children: React.ReactNode }
const Sidebar = ({ Children }: { Children: ReactNode }) => {
    const pathname = usePathname();
    const currentTab = pathname.split('/')[3] || 'reels';
    const { position, waiting, online } = useAppSelector(s => s.socket);
    const mainTabs = [
        { id: 'reels', icon: Film, label: 'Reels' },
        { id: 'minigames', icon: Gamepad2, label: 'Mini Games' },
        { id: 'unispace', icon: University, label: 'Uni Space' },
        { id: 'assumer', icon: MessageSquare, label: 'Assumer' }
    ];

    const getSubTabs = () => {
        switch (currentTab) {
            case 'reels':
                return [
                    { id: 'my-reels', icon: Film, label: 'My Reels' },
                    { id: 'liked-reels', icon: Heart, label: 'Liked Reels' }
                ];
            case 'minigames':
                return [
                    { id: 'saved-games', icon: Bookmark, label: 'Saved Games' }
                ];
            case 'unispace':
                return [
                    { id: 'overview', icon: Eye, label: 'Overview' },
                    { id: 'universities', icon: University, label: 'Universities' }
                ];
            case 'assumer':
                return [
                    { id: 'chat-history', icon: History, label: 'Chat History' },
                    { id: 'chat1', icon: MessageSquare, label: 'Chat 1' },
                ];
            default:
                return [];
        }
    };

    return (
        <div className="flex w-full h-screen">
            <Header />
            {/* Fixed sidebar container */}

            <div className="hidden md:flex flex-col  h-full w-72  bg-white fixed pt-28">
                {/* Online Users Card */}
                <div className="p-4 border-b space-y-2">
                    <div className="bg-white border border-[#B30738] rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center">
                            <svg className='mx-2' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.75 2.5C12.1398 2.5 10.7594 3.91875 10 6.08203C9.24062 3.91875 7.86016 2.5 6.25 2.5C3.79688 2.5 1.875 5.79453 1.875 10C1.875 14.2055 3.79688 17.5 6.25 17.5C7.86016 17.5 9.24062 16.0812 10 13.918C10.7594 16.0812 12.1398 17.5 13.75 17.5C16.2031 17.5 18.125 14.2055 18.125 10C18.125 5.79453 16.2031 2.5 13.75 2.5ZM8.35312 14.5617C7.76797 15.6344 7.00156 16.25 6.25 16.25C5.49844 16.25 4.73203 15.6344 4.14688 14.5617C3.76859 13.8443 3.49898 13.0747 3.34687 12.2781C3.72764 12.4502 4.14547 12.5241 4.56217 12.4931C4.97887 12.4621 5.38115 12.3271 5.73222 12.1005C6.0833 11.8739 6.37198 11.5629 6.57188 11.196C6.77177 10.829 6.87651 10.4179 6.87651 10C6.87651 9.58215 6.77177 9.17096 6.57188 8.80402C6.37198 8.43709 6.0833 8.12611 5.73222 7.89951C5.38115 7.67292 4.97887 7.53794 4.56217 7.5069C4.14547 7.47587 3.72764 7.54978 3.34687 7.72187C3.49898 6.92526 3.76859 6.15566 4.14688 5.43828C4.73203 4.36563 5.49844 3.75 6.25 3.75C7.00156 3.75 7.76797 4.36563 8.35312 5.43828C9.01172 6.64609 9.375 8.26641 9.375 10C9.375 11.7336 9.01172 13.3539 8.35312 14.5617ZM3.125 10C3.125 9.75277 3.19831 9.5111 3.33566 9.30554C3.47301 9.09998 3.66824 8.93976 3.89665 8.84515C4.12505 8.75054 4.37639 8.72579 4.61886 8.77402C4.86134 8.82225 5.08407 8.9413 5.25888 9.11612C5.4337 9.29093 5.55275 9.51366 5.60098 9.75614C5.64921 9.99861 5.62446 10.2499 5.52985 10.4784C5.43524 10.7068 5.27502 10.902 5.06946 11.0393C4.8639 11.1767 4.62223 11.25 4.375 11.25C4.04348 11.25 3.72554 11.1183 3.49112 10.8839C3.2567 10.6495 3.125 10.3315 3.125 10ZM15.8531 14.5617C15.268 15.6344 14.5016 16.25 13.75 16.25C12.9984 16.25 12.232 15.6344 11.6469 14.5617C11.2686 13.8443 10.999 13.0747 10.8469 12.2781C11.2276 12.4502 11.6455 12.5241 12.0622 12.4931C12.4789 12.4621 12.8811 12.3271 13.2322 12.1005C13.5833 11.8739 13.872 11.5629 14.0719 11.196C14.2718 10.829 14.3765 10.4179 14.3765 10C14.3765 9.58215 14.2718 9.17096 14.0719 8.80402C13.872 8.43709 13.5833 8.12611 13.2322 7.89951C12.8811 7.67292 12.4789 7.53794 12.0622 7.5069C11.6455 7.47587 11.2276 7.54978 10.8469 7.72187C10.999 6.92526 11.2686 6.15566 11.6469 5.43828C12.232 4.36563 12.9984 3.75 13.75 3.75C14.5016 3.75 15.268 4.36563 15.8531 5.43828C16.5117 6.64609 16.875 8.26641 16.875 10C16.875 11.7336 16.5117 13.3539 15.8531 14.5617ZM10.625 10C10.625 9.75277 10.6983 9.5111 10.8357 9.30554C10.973 9.09998 11.1682 8.93976 11.3966 8.84515C11.6251 8.75054 11.8764 8.72579 12.1189 8.77402C12.3613 8.82225 12.5841 8.9413 12.7589 9.11612C12.9337 9.29093 13.0528 9.51366 13.101 9.75614C13.1492 9.99861 13.1245 10.2499 13.0299 10.4784C12.9352 10.7068 12.775 10.902 12.5695 11.0393C12.3639 11.1767 12.1222 11.25 11.875 11.25C11.5435 11.25 11.2255 11.1183 10.9911 10.8839C10.7567 10.6495 10.625 10.3315 10.625 10Z" fill="#B30738" />
                            </svg>
                            <span className="text-sm font-medium">{online || 0} Users Online</span>
                        </div>
                    </div>
                    <div className="bg-white border border-[#B30738] rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center">
                            <svg className='mx-2' width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.625 4.40938V1.625C11.625 1.29348 11.4933 0.975537 11.2589 0.741116C11.0245 0.506696 10.7065 0.375 10.375 0.375H1.625C1.29348 0.375 0.975537 0.506696 0.741116 0.741116C0.506696 0.975537 0.375 1.29348 0.375 1.625V4.4375C0.375422 4.63148 0.420789 4.82273 0.50754 4.99623C0.594292 5.16973 0.720068 5.32077 0.875 5.4375L4.95859 8.5L0.875 11.5625C0.720068 11.6792 0.594292 11.8303 0.50754 12.0038C0.420789 12.1773 0.375422 12.3685 0.375 12.5625V15.375C0.375 15.7065 0.506696 16.0245 0.741116 16.2589C0.975537 16.4933 1.29348 16.625 1.625 16.625H10.375C10.7065 16.625 11.0245 16.4933 11.2589 16.2589C11.4933 16.0245 11.625 15.7065 11.625 15.375V12.5906C11.6246 12.3974 11.5796 12.2069 11.4935 12.0338C11.4075 11.8608 11.2827 11.7099 11.1289 11.593L7.03672 8.5L11.1289 5.40625C11.2828 5.28952 11.4076 5.13882 11.4937 4.9659C11.5797 4.79298 11.6247 4.60252 11.625 4.40938ZM1.625 1.625H10.375V4.40938L9.92422 4.75H2.04141L1.625 4.4375V1.625ZM6 7.71875L3.70859 6H8.27109L6 7.71875ZM10.375 15.375H1.625V12.5625L5.375 9.75V11.625C5.375 11.7908 5.44085 11.9497 5.55806 12.0669C5.67527 12.1842 5.83424 12.25 6 12.25C6.16576 12.25 6.32473 12.1842 6.44194 12.0669C6.55915 11.9497 6.625 11.7908 6.625 11.625V9.75625L10.375 12.5906V15.375Z" fill="#B30738" />
                            </svg>
                            <span className="text-sm font-medium">{position || 0} In Queue</span>
                        </div>
                    </div>
                    <div className="bg-white border border-[#B30738] rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center">
                            <svg className='mx-2' width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.625 4.40938V1.625C11.625 1.29348 11.4933 0.975537 11.2589 0.741116C11.0245 0.506696 10.7065 0.375 10.375 0.375H1.625C1.29348 0.375 0.975537 0.506696 0.741116 0.741116C0.506696 0.975537 0.375 1.29348 0.375 1.625V4.4375C0.375422 4.63148 0.420789 4.82273 0.50754 4.99623C0.594292 5.16973 0.720068 5.32077 0.875 5.4375L4.95859 8.5L0.875 11.5625C0.720068 11.6792 0.594292 11.8303 0.50754 12.0038C0.420789 12.1773 0.375422 12.3685 0.375 12.5625V15.375C0.375 15.7065 0.506696 16.0245 0.741116 16.2589C0.975537 16.4933 1.29348 16.625 1.625 16.625H10.375C10.7065 16.625 11.0245 16.4933 11.2589 16.2589C11.4933 16.0245 11.625 15.7065 11.625 15.375V12.5906C11.6246 12.3974 11.5796 12.2069 11.4935 12.0338C11.4075 11.8608 11.2827 11.7099 11.1289 11.593L7.03672 8.5L11.1289 5.40625C11.2828 5.28952 11.4076 5.13882 11.4937 4.9659C11.5797 4.79298 11.6247 4.60252 11.625 4.40938ZM1.625 1.625H10.375V4.40938L9.92422 4.75H2.04141L1.625 4.4375V1.625ZM6 7.71875L3.70859 6H8.27109L6 7.71875ZM10.375 15.375H1.625V12.5625L5.375 9.75V11.625C5.375 11.7908 5.44085 11.9497 5.55806 12.0669C5.67527 12.1842 5.83424 12.25 6 12.25C6.16576 12.25 6.32473 12.1842 6.44194 12.0669C6.55915 11.9497 6.625 11.7908 6.625 11.625V9.75625L10.375 12.5906V15.375Z" fill="#B30738" />
                            </svg>
                            <span className="text-sm font-medium">{waiting || 0} Users Waiting</span>
                        </div>
                    </div>
                </div>

                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto">
                    {/* Main Tabs */}
                    <div className="space-y-1 p-2">
                        {mainTabs.map((tab) => (
                            <Link
                                key={tab.id}
                                href={`/waitingRoom/tabs/${tab.id}`}
                                className={`flex items-center p-3 rounded-lg transition-colors ${currentTab === tab.id
                                    ? 'bg-[#B30738] text-white'
                                    : 'hover:bg-gray-100 text-gray-700'
                                    }`}
                            >
                                <div className={`w-1 h-6 rounded-full mr-3 ${currentTab === tab.id ? 'bg-white' : 'bg-transparent'
                                    }`} />
                                <div className='bg-[#B30738] mr-3 p-2 flex justify-center rounded-lg items-center'>
                                    <tab.icon color={currentTab === tab.id ? 'white' : "white"} size={20} />
                                </div>
                                <span className="font-medium">{tab.label}</span>
                            </Link>
                        ))}
                    </div>

                    <hr className="my-2 border-gray-200" />

                    {/* Sub Tabs */}
                    <div className="p-2">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                            {currentTab === 'reels' ? 'Reels' :
                                currentTab === 'minigames' ? 'Games' :
                                    currentTab === 'unispace' ? 'Uni Space' : 'Chats'}
                        </h3>
                        <div className="space-y-1">
                            {getSubTabs().map((tab) => (
                                <Link
                                    key={tab.id}
                                    href={'/ComingSoon'}
                                    className={`flex items-center p-3 rounded-lg text-sm transition-colors ${pathname.includes(tab.id)
                                        ? 'bg-[#B30738]/10 text-[#B30738]'
                                        : 'hover:bg-gray-100 text-gray-700'
                                        }`}
                                >

                                    <div className='bg-[#B30738] mr-3 p-2 flex justify-center rounded-lg items-center'>
                                        <tab.icon color={currentTab === tab.id ? 'white' : "white"} size={20} />
                                    </div>
                                    <span className="font-medium">{tab.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content area (scrollable) */}
            <div className="flex-1 w-full overflow-y-auto md:ml-72 ">
                {Children}
            </div>
        </div>
    );
};

export default Sidebar;