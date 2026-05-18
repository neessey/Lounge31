"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <div className="w-32 h-auto">
                            <img src="logo.png" alt="" />
                        </div>
                    </Link>


                    {/* Menu & Order Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/orders"
                            className="flex items-center gap-2 text-cream-light text-sm hover:text-gold transition-colors"
                        >
                            Menu
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <line x1="4" y1="6" x2="20" y2="6" />
                                <line x1="4" y1="12" x2="20" y2="12" />
                                <line x1="4" y1="18" x2="20" y2="18" />
                            </svg>
                        </Link>
                        <Link
                            href="/reservations"
                            className="flex items-center gap-2 px-4 py-2 bg-gold text-dark text-sm font-medium rounded-full hover:bg-gold-light transition-colors"
                        >
                            Reserver
                            <img
                                src="https://ext.same-assets.com/3269557936/3738063455.png"
                                alt="Order"
                                className="w-5 h-5"
                            />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className="md:hidden text-cream-light"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            {isMenuOpen ? (
                                <>
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </>
                            ) : (
                                <>
                                    <line x1="4" y1="6" x2="20" y2="6" />
                                    <line x1="4" y1="12" x2="20" y2="12" />
                                    <line x1="4" y1="18" x2="20" y2="18" />
                                </>
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-dark/95 backdrop-blur-sm">
                    <div className="px-4 py-6 space-y-4">
                        <Link
                            href="/"
                            className="block text-cream-light text-lg hover:text-gold transition-colors"
                        >
                            Accueil
                        </Link>
                        <Link
                            href="/orders"
                            className="block text-cream-light text-lg hover:text-gold transition-colors"
                        >
                            Menu
                        </Link>
                        <Link
                            href="#contact"
                            className="block text-cream-light text-lg hover:text-gold transition-colors"
                        >
                            Contact
                        </Link>
                        <div className="pt-4 border-t border-cream/20">
                            <Link
                                href="/reservations"
                                className="flex items-center gap-2 px-4 py-2 bg-gold text-dark text-sm font-medium rounded-full hover:bg-gold-light transition-colors w-fit"
                            >
                                Reserver
                                <img
                                    src="https://ext.same-assets.com/3269557936/3738063455.png"
                                    alt="Order"
                                    className="w-5 h-5"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
