"use client";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-dark-green text-cream" id="contact">
            {/* Info Bar */}
            <div className="border-b border-cream/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid md:grid-cols-4 gap-8">
                        {/* Address */}
                        <div>
                            <h4 className="text-cream/60 text-xs uppercase tracking-widest mb-4">
                                Lounge le 31
                            </h4>
                            <p className="text-cream text-sm">Biétry, carrefour de la pharmacie Perusia, </p>
                            <p className="text-cream text-sm">Abidjan, Côte d'Ivoire, 225</p>
                        </div>

                        {/* Hours */}
                        <div>
                            <h4 className="text-cream/60 text-xs uppercase tracking-widest mb-4">
                                Ouverture
                            </h4>
                            <p className="text-cream text-sm">Lundi-Jeudi 19H — 23H</p>
                            <p className="text-cream text-sm">Vendredi-Samedi 19H — 00H</p>
                            <p className="text-cream text-sm">Dimanche (Fermé)</p>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="text-cream/60 text-xs uppercase tracking-widest mb-4">
                                Contact
                            </h4>
                            <p className="text-cream text-sm">+225 0718986015
                            </p>
                            <p className="text-cream text-sm">Contactez-nous</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Links */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-16">

                    {/* Legals */}
                    <div>
                        <h4 className="text-cream/60 text-xs uppercase tracking-widest mb-4">
                            Legals
                        </h4>
                        <nav className="space-y-2">
                            <Link
                                href="#"
                                className="block text-cream text-sm hover:text-gold transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="#"
                                className="block text-cream text-sm hover:text-gold transition-colors"
                            >
                                Terms and Conditions
                            </Link>
                            <Link
                                href="#"
                                className="block text-cream text-sm hover:text-gold transition-colors"
                            >
                                Cookie Policy
                            </Link>
                        </nav>
                    </div>

                    {/* Actions */}
                    <div>
                        <h4 className="text-cream/60 text-xs uppercase tracking-widest mb-4">
                            Actions
                        </h4>
                        <nav className="space-y-2">
                            <Link
                                href="/orders"
                                className="block text-cream text-sm hover:text-gold transition-colors"
                            >
                                Voir le menu
                            </Link>

                            <Link
                                href="/reservations"
                                className="block text-cream text-sm hover:text-gold transition-colors"
                            >
                                Reservez une table
                            </Link>
                        </nav>
                    </div>

                    {/* Socials */}
                    <div>
                        <h4 className="text-cream/60 text-xs uppercase tracking-widest mb-4">
                            Socials
                        </h4>
                        <nav className="space-y-2">
                            <Link
                                href="https://www.instagram.com/le31abidjan/"
                                className="block text-cream text-sm hover:text-gold transition-colors"
                            >
                                Instagram
                            </Link>
                            <Link
                                href="https://www.facebook.com/people/Le-31/"
                                className="block text-cream text-sm hover:text-gold transition-colors"
                            >
                                Facebook
                            </Link>
                        </nav>
                    </div>
                </div>

                {/* Copyright */}
                <div className="flex flex-col md:flex-row items-center justify-between text-xs text-cream/60">
                    <p>&copy; 2026 Lounge le 31</p>
                    <p>All Rights Reserved</p>
                    <p>
                        Made by{" "}
                        <Link href="#" className="underline hover:text-gold">
                            Yaniss-Elie Sey
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
