import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { DevLinkProvider } from "@/devlink/DevLinkProvider";
import { GoogleTagManager } from '@next/third-parties/google'


const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const sharpGrotesk = localFont({
    src: [
        {
            path: "../../public/fonts/SharpGroteskBook.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/SharpGroteskMedium.ttf",
            weight: "500",
            style: "normal",
        },
    ],
    variable: "--font-sharp",
});

export const metadata: Metadata = {
    title: "Weheat besparingscheck",
    description: "Weheat besparingscheck",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <GoogleTagManager gtmId="GTM-W5VXJ8D" />
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${sharpGrotesk.variable} antialiased`}
            >
                <DevLinkProvider>
                    {/* Add here any Navbar or Header you want to be present on all pages */}
                    {children}
                    {/* Add here any Footer you want to be present on all pages */}
                </DevLinkProvider>
            </body>
        </html>
    );
}
