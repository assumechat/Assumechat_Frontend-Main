"use client"
import { useRef, useEffect } from 'react';
import Head from 'next/head';
import { useState } from 'react';
import Image from 'next/image';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import calculatePasswordStrength from '@/lib/PasswordStrength';
import axios from 'axios';
import { useDispatch, UseDispatch } from 'react-redux';
import { setUser } from '@/store/slices/userSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';

export default function HeroSection() {
    const reviewsRef = useRef<HTMLDivElement[]>([]);
    const iconsRef = useRef<HTMLDivElement[]>([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true); // Add this state variable
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const passwordStrength = calculatePasswordStrength(password);
    const dispatch = useDispatch();
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
    const router = useRouter();
    useEffect(() => {
        if (isAuthenticated) {
            router.push("/")
        }
    }, [isAuthenticated]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (!isLogin && password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}Auth/login`
            if (!apiUrl) {
                throw new Error("API URL is not defined in the environment variables");
            }
            const payload = { email, password };
            const res = await axios.post(apiUrl, payload);
            localStorage.setItem('refreshToken', res.data.data.refreshToken);
            dispatch(setUser({
                accessToken: res.data.data.accessToken,
                user: res.data.data.user,
            }));
            toast.success('Login Successfully Redirecting To Waiting Room ', {
                duration: 2000,
            });
            //console.log(res.data);
            router.push('/waitingRoom');
        }
        catch (error: any) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || 'Something went wrong', {
                    duration: 2000,
                });
                console.log(error);
            } else {
                toast.error('An unexpected error occurred', {
                    duration: 2000,
                });
                console.log(error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Add animation to review cards
            const animateElements = () => {
                reviewsRef.current.forEach((review, index) => {
                    const time = Date.now() * 0.001;
                    const delay = index * 0.2;

                    // Different floating patterns for different positions
                    if (index < 2) { // Top reviews
                        review.style.transform = `translateY(${Math.sin(time + delay) * 10}px)`;
                    } else if (index < 4) { // Middle reviews
                        review.style.transform = `translateX(${Math.sin(time + delay) * 15}px)`;
                    } else { // Bottom reviews
                        review.style.transform = `translateY(${Math.sin(time + delay) * 8}px) 
                                     translateX(${Math.cos(time + delay) * 12}px)`;
                    }
                });

                // Add animation to floating icons
                iconsRef.current.forEach((icon, index) => {
                    const time = Date.now() * 0.001;
                    const delay = index * 0.3;

                    // Different floating patterns for icons
                    if (index === 0) { // Middle top icon
                        icon.style.transform = `translateY(${Math.sin(time + delay) * 8}px) rotate(${Math.sin(time + delay) * 5}deg)`;
                    } else if (index === 1) { // Left of first card
                        icon.style.transform = `translateX(${Math.cos(time + delay) * 10}px) rotate(${Math.cos(time + delay) * 8}deg)`;
                    } else if (index === 2) { // Right of second row card
                        icon.style.transform = `translateY(${Math.sin(time + delay) * 6}px) rotate(${Math.sin(time + delay) * 6}deg)`;
                    } else { // Bottom row icons
                        icon.style.transform = `translateX(${Math.cos(time + delay) * 12}px) rotate(${Math.cos(time + delay) * 10}deg)`;
                    }
                });

                requestAnimationFrame(animateElements);
            };

            animateElements();
        }
    }, []);

    const addToRefs = (el: HTMLDivElement | null, index: number, type: 'review' | 'icon') => {
        if (!el) return;

        if (type === 'review' && !reviewsRef.current.includes(el)) {
            reviewsRef.current[index] = el;
        } else if (type === 'icon' && !iconsRef.current.includes(el)) {
            iconsRef.current[index] = el;
        }
    };

    const ReviewCard = ({ index, positionClass, quote, author, stars = 5 }: {
        index: number;
        positionClass: string;
        quote: string;
        author: string;
        stars?: number;
    }) => (
        <div
            ref={el => addToRefs(el, index, 'review')}
            className={`absolute ${positionClass} min-w-40 sm:min-w-48 md:w-60 flex border border-black bg-white bg-opacity-80 backdrop-blur-md p-4 rounded-lg shadow-lg transition-transform duration-300`}
        >
            <div className='mr-2'>
                <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.91016 0.74542V4.84053C5.91077 5.43275 6.1463 6.00054 6.56507 6.41931C6.98384 6.83808 7.55163 7.07361 8.14385 7.07422C8.24259 7.07422 8.33728 7.035 8.4071 6.96519C8.47691 6.89537 8.51613 6.80068 8.51613 6.70194C8.51613 6.60321 8.47691 6.50851 8.4071 6.4387C8.33728 6.36888 8.24259 6.32966 8.14385 6.32966C7.74891 6.32966 7.37014 6.17277 7.09088 5.8935C6.81161 5.61424 6.65472 5.23547 6.65472 4.84053V4.46825H9.44684C9.64431 4.46825 9.8337 4.3898 9.97333 4.25017C10.113 4.11053 10.1914 3.92115 10.1914 3.72368V0.74542C10.1914 0.547949 10.113 0.358566 9.97333 0.218933C9.8337 0.0792995 9.64431 0.000854492 9.44684 0.000854492H6.65472C6.45725 0.000854492 6.26787 0.0792995 6.12823 0.218933C5.9886 0.358566 5.91016 0.547949 5.91016 0.74542ZM1.25662 0.000854492H4.04874C4.24621 0.000854492 4.4356 0.0792995 4.57523 0.218933C4.71486 0.358566 4.79331 0.547949 4.79331 0.74542V3.72368C4.79331 3.92115 4.71486 4.11053 4.57523 4.25017C4.4356 4.3898 4.24621 4.46825 4.04874 4.46825H1.25662V4.84053C1.25662 5.23547 1.41351 5.61424 1.69278 5.8935C1.97205 6.17277 2.35081 6.32966 2.74575 6.32966C2.84449 6.32966 2.93918 6.36888 3.009 6.4387C3.07881 6.50851 3.11804 6.60321 3.11804 6.70194C3.11804 6.80068 3.07881 6.89537 3.009 6.96519C2.93918 7.035 2.84449 7.07422 2.74575 7.07422C2.15353 7.07361 1.58574 6.83808 1.16697 6.41931C0.748207 6.00054 0.512674 5.43275 0.512058 4.84053V0.74542C0.512058 0.547949 0.590503 0.358566 0.730136 0.218933C0.869769 0.0792995 1.05915 0.000854492 1.25662 0.000854492Z" fill="black" />
                </svg>
            </div>
            <div>
                <p className="text-black font-semibold text-md mt-1">{quote}</p>
                <p className="text-gray-600 text-sm mt-1">{author}</p>
                <div className='flex justify-end p-1 items-center'>
                    {Array(stars).fill(0).map((_, i) => (
                        <svg key={i} width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_383_1101)">
                                <path d="M5.22363 1.70947C5.30013 1.70947 5.37491 1.73236 5.43848 1.7749C5.48619 1.8069 5.52649 1.84901 5.55566 1.89795L5.58105 1.94873V1.94971L6.46387 4.08545L6.52148 4.22607L6.67285 4.23877L8.96094 4.42334V4.42236C9.03709 4.429 9.11002 4.45883 9.16992 4.50635C9.22978 4.55398 9.27418 4.61818 9.29785 4.69092C9.32156 4.76395 9.32339 4.84255 9.30273 4.9165C9.28208 4.99046 9.23976 5.05675 9.18164 5.10693L8.5127 5.68506V5.68408L7.43945 6.61182L7.3252 6.71045L7.36035 6.85693L7.8916 9.10889V9.10986C7.90947 9.18432 7.90535 9.26261 7.87891 9.33447C7.85242 9.40631 7.80505 9.46908 7.74316 9.51416C7.68118 9.55924 7.60686 9.5853 7.53027 9.58838C7.45377 9.59145 7.37785 9.57162 7.3125 9.53174H7.31348L5.35449 8.32666L5.22461 8.24658L5.09473 8.32666L3.13574 9.53076C3.07048 9.57036 2.99522 9.59052 2.91895 9.5874C2.84248 9.58422 2.76792 9.55824 2.70605 9.51318C2.64432 9.46815 2.59775 9.40519 2.57129 9.3335C2.55143 9.27957 2.54381 9.22231 2.54883 9.16553L2.55762 9.10986V9.10889L3.09082 6.85693L3.12598 6.71045L3.01172 6.61182L1.2666 5.10596H1.26562C1.20819 5.05595 1.16701 4.98986 1.14648 4.9165C1.12588 4.84286 1.12699 4.76469 1.15039 4.69189C1.17396 4.61895 1.21936 4.55413 1.2793 4.50635C1.33854 4.45919 1.41 4.42948 1.48535 4.42236L1.48633 4.42334L3.77441 4.23877L3.92578 4.22607L3.9834 4.08545L4.86621 1.94971V1.94873C4.89532 1.87802 4.94527 1.81749 5.00879 1.7749C5.07236 1.73234 5.14713 1.70948 5.22363 1.70947Z" fill="#FFD369" stroke="#D8AD00" strokeWidth="0.496377" />
                            </g>
                            <defs>
                                <clipPath id="clip0_383_1101">
                                    <rect width="9.92754" height="9.92754" fill="white" transform="translate(0.260742 0.840576)" />
                                </clipPath>
                            </defs>
                        </svg>
                    ))}
                </div>
            </div>
        </div>
    );

    const FloatingIcon = ({ index, positionClass, icon }: {
        index: number;
        positionClass: string;
        icon: 'eye' | 'heart' | 'chat' | 'graduation' | "chat2";
    }) => {
        const iconComponents = {
            eye: (
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.5 3.7572C14.5678 3.7572 12.9113 5.4597 12 8.05564C11.0887 5.4597 9.43219 3.7572 7.5 3.7572C4.55625 3.7572 2.25 7.71064 2.25 12.7572C2.25 17.8038 4.55625 21.7572 7.5 21.7572C9.43219 21.7572 11.0887 20.0547 12 17.4588C12.9113 20.0547 14.5678 21.7572 16.5 21.7572C19.4438 21.7572 21.75 17.8038 21.75 12.7572C21.75 7.71064 19.4438 3.7572 16.5 3.7572ZM10.0237 18.2313C9.32156 19.5185 8.40188 20.2572 7.5 20.2572C6.59812 20.2572 5.67844 19.5185 4.97625 18.2313C4.52231 17.3704 4.19878 16.4469 4.01625 15.491C4.47317 15.6975 4.97457 15.7862 5.47461 15.7489C5.97464 15.7117 6.45737 15.5497 6.87867 15.2778C7.29996 15.0059 7.64638 14.6327 7.88625 14.1924C8.12613 13.7521 8.25181 13.2586 8.25181 12.7572C8.25181 12.2558 8.12613 11.7624 7.88625 11.322C7.64638 10.8817 7.29996 10.5085 6.87867 10.2366C6.45737 9.9647 5.97464 9.80272 5.47461 9.76549C4.97457 9.72825 4.47317 9.81694 4.01625 10.0235C4.19878 9.06751 4.52231 8.144 4.97625 7.28314C5.67844 5.99595 6.59812 5.2572 7.5 5.2572C8.40188 5.2572 9.32156 5.99595 10.0237 7.28314C10.8141 8.73251 11.25 10.6769 11.25 12.7572C11.25 14.8375 10.8141 16.7819 10.0237 18.2313ZM3.75 12.7572C3.75 12.4605 3.83797 12.1705 4.0028 11.9238C4.16762 11.6772 4.40189 11.4849 4.67597 11.3714C4.95006 11.2579 5.25166 11.2281 5.54264 11.286C5.83361 11.3439 6.10088 11.4868 6.31066 11.6965C6.52044 11.9063 6.6633 12.1736 6.72118 12.4646C6.77906 12.7555 6.74935 13.0571 6.63582 13.3312C6.52229 13.6053 6.33003 13.8396 6.08336 14.0044C5.83668 14.1692 5.54667 14.2572 5.25 14.2572C4.85218 14.2572 4.47064 14.0992 4.18934 13.8179C3.90804 13.5366 3.75 13.155 3.75 12.7572ZM19.0238 18.2313C18.3216 19.5185 17.4019 20.2572 16.5 20.2572C15.5981 20.2572 14.6784 19.5185 13.9762 18.2313C13.5223 17.3704 13.1988 16.4469 13.0162 15.491C13.4732 15.6975 13.9746 15.7862 14.4746 15.7489C14.9746 15.7117 15.4574 15.5497 15.8787 15.2778C16.3 15.0059 16.6464 14.6327 16.8863 14.1924C17.1261 13.7521 17.2518 13.2586 17.2518 12.7572C17.2518 12.2558 17.1261 11.7624 16.8863 11.322C16.6464 10.8817 16.3 10.5085 15.8787 10.2366C15.4574 9.9647 14.9746 9.80272 14.4746 9.76549C13.9746 9.72825 13.4732 9.81694 13.0162 10.0235C13.1988 9.06751 13.5223 8.144 13.9762 7.28314C14.6784 5.99595 15.5981 5.2572 16.5 5.2572C17.4019 5.2572 18.3216 5.99595 19.0238 7.28314C19.8141 8.73251 20.25 10.6769 20.25 12.7572C20.25 14.8375 19.8141 16.7819 19.0238 18.2313ZM12.75 12.7572C12.75 12.4605 12.838 12.1705 13.0028 11.9238C13.1676 11.6772 13.4019 11.4849 13.676 11.3714C13.9501 11.2579 14.2517 11.2281 14.5426 11.286C14.8336 11.3439 15.1009 11.4868 15.3107 11.6965C15.5204 11.9063 15.6633 12.1736 15.7212 12.4646C15.7791 12.7555 15.7494 13.0571 15.6358 13.3312C15.5223 13.6053 15.33 13.8396 15.0834 14.0044C14.8367 14.1692 14.5467 14.2572 14.25 14.2572C13.8522 14.2572 13.4706 14.0992 13.1893 13.8179C12.908 13.5366 12.75 13.155 12.75 12.7572Z" fill="#B30738" />
                </svg>
            ),
            heart: (
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6875 4.5072C14.7516 4.5072 13.0566 5.3397 12 6.74689C10.9434 5.3397 9.24844 4.5072 7.3125 4.5072C5.77146 4.50894 4.29404 5.12188 3.20436 6.21156C2.11468 7.30124 1.50174 8.77866 1.5 10.3197C1.5 16.8822 11.2303 22.1941 11.6447 22.4135C11.7539 22.4722 11.876 22.503 12 22.503C12.124 22.503 12.2461 22.4722 12.3553 22.4135C12.7697 22.1941 22.5 16.8822 22.5 10.3197C22.4983 8.77866 21.8853 7.30124 20.7956 6.21156C19.706 5.12188 18.2285 4.50894 16.6875 4.5072ZM12 20.8947C10.2881 19.8972 3 15.3531 3 10.3197C3.00149 9.17641 3.45632 8.08038 4.26475 7.27195C5.07317 6.46352 6.16921 6.00869 7.3125 6.0072C9.13594 6.0072 10.6669 6.97845 11.3062 8.53845C11.3628 8.67601 11.4589 8.79366 11.5824 8.87647C11.7059 8.95927 11.8513 9.00348 12 9.00348C12.1487 9.00348 12.2941 8.95927 12.4176 8.87647C12.5411 8.79366 12.6372 8.67601 12.6937 8.53845C13.3331 6.97564 14.8641 6.0072 16.6875 6.0072C17.8308 6.00869 18.9268 6.46352 19.7353 7.27195C20.5437 8.08038 20.9985 9.17641 21 10.3197C21 15.3456 13.71 19.8963 12 20.8947Z" fill="#B30738" />
                </svg>

            ),
            chat: (
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.7563 18.2659C22.2746 17.191 22.5289 16.008 22.4981 14.8152C22.4673 13.6223 22.1523 12.454 21.5793 11.4073C21.0063 10.3606 20.1918 9.46574 19.2036 8.79704C18.2153 8.12833 17.0817 7.70509 15.897 7.56247C15.5028 6.64594 14.9297 5.81727 14.2112 5.12499C13.4928 4.43271 12.6434 3.89074 11.7129 3.53081C10.7823 3.17088 9.78936 3.00022 8.79206 3.02884C7.79476 3.05746 6.81319 3.28478 5.90484 3.69748C4.99649 4.11018 4.17961 4.69997 3.50204 5.43231C2.82447 6.16465 2.29982 7.02482 1.95883 7.96245C1.61784 8.90008 1.46735 9.89632 1.51619 10.8928C1.56502 11.8894 1.81219 12.8661 2.24322 13.7659L1.56165 16.0825C1.48545 16.3411 1.48035 16.6154 1.5469 16.8767C1.61345 17.138 1.74919 17.3765 1.93983 17.5671C2.13047 17.7577 2.36896 17.8935 2.63023 17.96C2.89149 18.0266 3.16586 18.0215 3.42447 17.9453L5.74103 17.2637C6.48487 17.6211 7.28236 17.8539 8.10166 17.9528C8.4997 18.8854 9.08273 19.7276 9.8155 20.4286C10.5483 21.1295 11.4156 21.6745 12.365 22.0307C13.3144 22.3869 14.3261 22.5469 15.3391 22.501C16.3521 22.4552 17.3452 22.2043 18.2585 21.7637L20.5751 22.4453C20.8336 22.5214 21.1079 22.5265 21.369 22.4599C21.6302 22.3934 21.8686 22.2578 22.0592 22.0673C22.2498 21.8768 22.3855 21.6384 22.4522 21.3773C22.5188 21.1162 22.5139 20.842 22.4379 20.5834L21.7563 18.2659ZM5.81228 15.7103C5.74061 15.7105 5.66931 15.7205 5.6004 15.7403L2.99978 16.5072L3.76572 13.9047C3.82019 13.7166 3.799 13.5148 3.70666 13.3422C3.0282 12.0733 2.82829 10.6029 3.14337 9.19903C3.45846 7.79512 4.26755 6.55118 5.42317 5.69398C6.57878 4.83678 8.00395 4.4234 9.43889 4.52919C10.8738 4.63498 12.223 5.2529 13.2404 6.27031C14.2578 7.28771 14.8757 8.63686 14.9815 10.0718C15.0873 11.5067 14.6739 12.9319 13.8167 14.0875C12.9595 15.2431 11.7156 16.0522 10.3117 16.3673C8.90775 16.6824 7.43736 16.4825 6.16853 15.804C6.05942 15.7437 5.93698 15.7114 5.81228 15.7103ZM20.2301 18.4037L20.9998 21.0072L18.3973 20.2412C18.2093 20.1867 18.0074 20.2079 17.8348 20.3003C16.4537 21.0377 14.8392 21.2066 13.3354 20.7709C11.8315 20.3352 10.5574 19.3294 9.78447 17.9678C10.8114 17.8606 11.8051 17.5424 12.7032 17.033C13.6013 16.5237 14.3845 15.8342 15.0036 15.0079C15.6227 14.1816 16.0643 13.2363 16.3008 12.2313C16.5373 11.2262 16.5636 10.1831 16.3779 9.16747C17.2726 9.37837 18.107 9.79205 18.8165 10.3766C19.5259 10.9611 20.0917 11.7008 20.4699 12.5386C20.8481 13.3765 21.0288 14.29 20.998 15.2088C20.9671 16.1275 20.7256 17.0269 20.292 17.8375C20.1986 18.0111 20.1774 18.2145 20.2329 18.4037H20.2301Z" fill="#B30738" />
                </svg>
            ),
            graduation: (
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_385_2015)">
                        <path d="M23.6025 9.09532L12.3525 3.09532C12.244 3.03754 12.1229 3.00732 12 3.00732C11.8771 3.00732 11.756 3.03754 11.6475 3.09532L0.39751 9.09532C0.277514 9.15927 0.17716 9.25464 0.107185 9.37123C0.0372091 9.48781 0.000244141 9.62123 0.000244141 9.7572C0.000244141 9.89317 0.0372091 10.0266 0.107185 10.1432C0.17716 10.2598 0.277514 10.3551 0.39751 10.4191L3.00001 11.8075V16.3469C2.99923 16.7153 3.13481 17.0709 3.38064 17.3453C4.60876 18.7131 7.36032 21.0072 12 21.0072C13.5384 21.0199 15.0653 20.7413 16.5 20.186V23.2572C16.5 23.4561 16.579 23.6469 16.7197 23.7875C16.8603 23.9282 17.0511 24.0072 17.25 24.0072C17.4489 24.0072 17.6397 23.9282 17.7803 23.7875C17.921 23.6469 18 23.4561 18 23.2572V19.4613C18.978 18.8967 19.8618 18.1828 20.6194 17.3453C20.8652 17.0709 21.0008 16.7153 21 16.3469V11.8075L23.6025 10.4191C23.7225 10.3551 23.8229 10.2598 23.8928 10.1432C23.9628 10.0266 23.9998 9.89317 23.9998 9.7572C23.9998 9.62123 23.9628 9.48781 23.8928 9.37123C23.8229 9.25464 23.7225 9.15927 23.6025 9.09532ZM12 19.5072C7.94345 19.5072 5.55751 17.5253 4.50001 16.3469V12.6072L11.6475 16.4191C11.756 16.4769 11.8771 16.5071 12 16.5071C12.1229 16.5071 12.244 16.4769 12.3525 16.4191L16.5 14.2075V18.5519C15.3188 19.1031 13.83 19.5072 12 19.5072ZM19.5 16.3431C19.0504 16.842 18.5474 17.29 18 17.6791V13.4069L19.5 12.6072V16.3431ZM17.625 11.9078L17.6044 11.8956L12.3544 9.09532C12.1792 9.00586 11.9759 8.98878 11.7883 9.04777C11.6007 9.10675 11.4437 9.23709 11.3513 9.41069C11.2588 9.58429 11.2382 9.78726 11.294 9.97588C11.3498 10.1645 11.4774 10.3237 11.6494 10.4191L16.0313 12.7572L12 14.9069L2.34376 9.7572L12 4.60751L21.6563 9.7572L17.625 11.9078Z" fill="#B30738" />
                    </g>
                    <defs>
                        <clipPath id="clip0_385_2015">
                            <rect width="24" height="24" fill="white" transform="translate(0 0.757202)" />
                        </clipPath>
                    </defs>
                </svg>
            ),
            chat2: (
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9999 3.0072C10.3166 3.00684 8.66188 3.44228 7.19679 4.27117C5.7317 5.10005 4.50616 6.29413 3.63947 7.73717C2.77277 9.18022 2.29444 10.8231 2.25104 12.5058C2.20764 14.1886 2.60065 15.8539 3.39181 17.3397L2.32774 20.5319C2.2396 20.7962 2.22681 21.0798 2.2908 21.351C2.35479 21.6221 2.49304 21.8701 2.69004 22.0671C2.88704 22.2641 3.13502 22.4023 3.40618 22.4663C3.67733 22.5303 3.96095 22.5175 4.22524 22.4294L7.41743 21.3653C8.72503 22.0608 10.1739 22.4493 11.654 22.5012C13.1342 22.5531 14.6067 22.2672 15.9598 21.6651C17.3129 21.063 18.5111 20.1605 19.4634 19.0262C20.4156 17.8918 21.097 16.5555 21.4557 15.1185C21.8144 13.6816 21.841 12.1818 21.5335 10.733C21.226 9.28421 20.5925 7.92452 19.6811 6.75712C18.7697 5.58973 17.6043 4.64531 16.2733 3.99557C14.9424 3.34582 13.481 3.00781 11.9999 3.0072ZM11.9999 21.0072C10.5496 21.0082 9.12471 20.6263 7.86931 19.9C7.77739 19.8467 7.6752 19.8135 7.56949 19.8027C7.46379 19.7919 7.357 19.8036 7.25618 19.8372L3.74993 21.0072L4.91899 17.501C4.95269 17.4002 4.9646 17.2934 4.95394 17.1877C4.94327 17.082 4.91027 16.9798 4.85712 16.8878C3.94772 15.3156 3.5826 13.4871 3.8184 11.6862C4.0542 9.88521 4.87774 8.21241 6.16126 6.92726C7.44479 5.64211 9.11655 4.81646 10.9172 4.57838C12.7179 4.3403 14.5468 4.70312 16.1202 5.61053C17.6936 6.51795 18.9236 7.91924 19.6193 9.59703C20.3151 11.2748 20.4377 13.1353 19.9681 14.8899C19.4986 16.6445 18.4632 18.1951 17.0224 19.3012C15.5817 20.4072 13.8163 21.0069 11.9999 21.0072Z" fill="#B30738" />
                </svg>

            )
        };

        return (
            <div
                ref={el => addToRefs(el, index, 'icon')}
                className={`absolute ${positionClass} p-2 bg-white bg-opacity-80 rounded-md shadow-md transition-transform duration-300`}
            >
                {iconComponents[icon]}
            </div>
        );
    };

    return (
        <>
            <div className='w-full flex md:pt-0 pt-14 md:flex-row flex-col-reverse justify-center md:px-16 items-center'>
                <div className="relative min-h-screen w-full md:w-1/2 overflow-hidden bg-white flex flex-col items-center justify-center">
                    <div className=''>
                        {/* Background SVGs */}
                        <div className="absolute pt-20 inset-0 flex items-center justify-center opacity-30">
                            <svg width="703" height="554" viewBox="0 0 703 554" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_f_380_153497)">
                                    <path d="M316.014 122.442C402.995 108.031 485.736 114.847 549.187 137.491C612.654 160.141 656.715 198.58 666.584 247.355C676.452 296.13 650.299 346.202 599.817 387.731C549.348 429.248 474.643 462.148 387.662 476.559C300.681 490.969 217.94 484.154 154.489 461.51C91.022 438.86 46.9617 400.42 37.0931 351.645C27.2246 302.87 53.3766 252.798 103.859 211.27C154.328 169.752 229.033 136.852 316.014 122.442Z" stroke="#B30738" />
                                </g>
                                <g filter="url(#filter1_f_380_153497)">
                                    <path d="M375.344 103.613C454.951 132.066 522.532 177.234 567.446 227.233C612.37 277.244 634.549 332.001 623.577 379.696C612.605 427.392 570.517 459.179 511.158 471.917C451.812 484.652 375.297 478.317 295.69 449.864C216.083 421.411 148.501 376.243 103.587 326.244C58.6632 276.233 36.4853 221.477 47.4575 173.781C58.4298 126.085 100.517 94.2985 159.876 81.5605C219.222 68.8253 295.737 75.1601 375.344 103.613Z" stroke="#B30738" />
                                </g>
                                <defs>
                                    <filter id="filter0_f_380_153497" x="30.5303" y="110.381" width="642.616" height="378.238" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                        <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_380_153497" />
                                    </filter>
                                    <filter id="filter1_f_380_153497" x="40.2002" y="70.7756" width="590.634" height="411.926" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                        <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_380_153497" />
                                    </filter>
                                </defs>
                            </svg>
                        </div>

                        {/* Floating Review Containers */}

                        <ReviewCard
                            index={3}
                            positionClass="top-20 md:top-45 w-40 md:right-2 right-2"
                            quote="We Think You’re Interesting."
                            author="But Then Again, We Assume A Lot."
                            stars={3}
                        />

                        {/* Bottom Reviews */}
                        <ReviewCard
                            index={4}
                            positionClass="top-55 md:top-40 w-40 left-1 md:left-1"
                            quote="Assume Freely"
                            author="You assumed this would be anonymous. You're right."
                            stars={3}
                        />

                        <ReviewCard
                            index={5}
                            positionClass="md:bottom-10 bottom-10 right-1/3 md:right-2/6"
                            quote="All about that chaos"
                            author="You came for the chat, stayed for the chaos."
                            stars={3}
                        />

                        {/* Floating Icons */}
                        <FloatingIcon
                            index={0}
                            positionClass="bottem-10 md:bottom-50 right-10 transform -translate-x-1/2"
                            icon="eye"
                        />

                        <FloatingIcon
                            index={1}
                            positionClass="bottom-50 left-5"
                            icon="chat2"
                        />
                        <FloatingIcon
                            index={1}
                            positionClass="top-53 left-1/2"
                            icon="heart"
                        />


                        {/* Main Content */}
                        <div className="relative pt-24 z-10 text-center px-4">
                            <h1 className=" text-xl md:text-4xl font-bold mb-2 ">
                                We've Made Some <br /> <span className='text-[#B30738]'>Bold Assumptions.</span>
                            </h1>

                            <p className="text-gray-800 text-xs max-w-2xl mx-auto ">
                                Log In and Set the Record Straight.
                            </p>
                        </div>

                    </div>
                </div>
                <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                    <div className="max-w-md w-full">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-black mb-2">Welcome Back!</h1>
                            <p className="text-gray-500">
                                {isLogin ? 'Already One of Us? Let’s Get You Back In.' : 'Sign Up and Let the Conversations Find You.'}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiMail color='#B30738' className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B30738] focus:border-transparent"
                                        placeholder="yourname@university.edu"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiLock color='#B30738' className="text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B30738] focus:border-transparent"
                                        placeholder="At least 8 characters"
                                        required
                                        minLength={8}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <FiEyeOff className="text-gray-400 hover:text-gray-600" />
                                        ) : (
                                            <FiEye className="text-gray-400 hover:text-gray-600" />
                                        )}
                                    </button>
                                </div>
                                <div className="mt-1 text-xs text-gray-500">
                                    {password.length > 0 && (
                                        <div className="flex items-center">
                                            <span>Strength: </span>
                                            <div className="flex ml-2">
                                                {[1, 2, 3, 4].map((i) => (
                                                    <div
                                                        key={i}
                                                        className={`h-1 w-4 mx-px rounded-sm ${i <= passwordStrength
                                                            ? i <= 2
                                                                ? 'bg-red-500'
                                                                : i === 3
                                                                    ? 'bg-yellow-500'
                                                                    : 'bg-green-500'
                                                            : 'bg-gray-200'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {password.length > 0 && password.length < 8 && (
                                        <p className="text-red-500">Password must be at least 8 characters</p>
                                    )}
                                </div>
                            </div>

                            {/* Confirm Password (only for signup) */}
                            {!isLogin && (
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-black mb-1">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiLock color='#B30738' className="text-[#B30738]" />
                                        </div>
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            id="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B30738] focus:border-transparent"
                                            placeholder="At least 8 characters"
                                            required
                                            minLength={8}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? (
                                                <FiEyeOff className="text-gray-400 hover:text-gray-600" />
                                            ) : (
                                                <FiEye className="text-gray-400 hover:text-gray-600" />
                                            )}
                                        </button>
                                    </div>
                                    {confirmPassword.length > 0 && password !== confirmPassword && (
                                        <p className="mt-1 text-xs text-red-500">Passwords don't match</p>
                                    )}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-[#B30738] text-white py-2 px-4 rounded-md hover:bg-[#9a0630] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#B30738] focus:ring-opacity-50"
                            >
                                {loading ? 'Loading...' : 'Sign In'}
                            </button>
                        </form>

                        <div className="mt-14 text-right">
                            <p className="text-gray-600">
                                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                                <Link
                                    href='/signup'
                                    className="text-[#B30738] hover:underline font-medium"
                                >
                                    {isLogin ? 'Sign Up' : 'Sign In'}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}