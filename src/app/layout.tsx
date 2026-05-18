

import type { Metadata } from "next";
import { Inter, Bad_Script } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const badScript = Bad_Script({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-bad-script",
});

export const metadata: Metadata = {
    title: "Le 31 | Restaurant Lounge Abidjan",
    description: "Le 31, restaurant lounge emblématique d'Abidjan. Découvrez une cuisine gastronomique unique, des cocktails signature et une ambiance raffinée au cœur de la Zone 4, Marcory.",
    keywords: "restaurant, lounge, Abidjan, Le 31, gastronomie, cocktails, Zone 4, Marcory, Côte d'Ivoire",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${badScript.variable}`}>
            <body className="antialiased">
                <ClientBody>{children}</ClientBody>
            </body>
        </html>
    );
}
