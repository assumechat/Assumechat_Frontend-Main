'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Instagram, Facebook, SendIcon } from 'lucide-react';
import { BsTwitterX } from 'react-icons/bs';
import Link from 'next/link';

export function FooterSection() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = {
            access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY!,
            subject: 'New Newsletter Subscriber',
            from_name: 'AssumeChat Newsletter',
            email,
        };

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                router.push('/thanku');
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Newsletter submission error:', error);
            alert('Submission failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="bg-white bg-opacity-10 backdrop-blur-md py-14 md:px-12 mt-16">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between flex-wrap items-start gap-20">
                    {/* Brand & Description */}
                    <div className="max-w-lg">
                        <h3 className="text-2xl font-bold text-[#B30738]">AssumeChat</h3>
                        <p className="mt-4 text-sm text-gray-600">
                            Meet students beyond your campus walls, spark unexpected conversations, and change your perspective — one chat at a time.
                        </p>
                        <div className="flex space-x-4 mt-4 text-[#B30738]">
                            <div className="border border-gray-400 rounded-lg p-3">
                                <BsTwitterX className="w-4 h-4" />
                            </div>
                            <div className="border border-gray-400 rounded-lg p-3">
                                <Instagram className="w-4 h-4" />
                            </div>
                            <div className="border border-gray-400 rounded-lg p-3">
                                <Facebook className="w-4 h-4" />
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li><Link href="#" className="hover:underline">About Us</Link></li>
                            <li><Link href="#" className="hover:underline">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:underline">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:underline">Community Guidelines</Link></li>
                            <li><Link href="#" className="hover:underline">Support</Link></li>
                            <li><Link href="#" className="hover:underline">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-4">Stay Updated</h4>
                        <p className="text-gray-600 mb-4">Subscribe to our newsletter for latest updates</p>

                        <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-sm">
                            <input
                                type="email"
                                name="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="p-2 border border-gray-400 py-2 rounded-md text-white"
                            >
                                <SendIcon color="#B30738" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-gray-300 mt-12 pt-6 flex flex-col md:flex-row justify-between text-gray-600 text-sm">
                    <p>© 2025 AssumeChat. All rights reserved.</p>
                    <div className="space-x-4 mt-4 md:mt-0">
                        <Link href="#" className="hover:underline">Privacy Policy</Link>
                        <Link href="#" className="hover:underline">Terms of Service</Link>
                        <Link href="#" className="hover:underline">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
