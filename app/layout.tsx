'use client';
/* eslint-disable @next/next/no-sync-scripts */
import "../styles/globals.css"
import Shrek from "../components/shrek";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Shrek />
            {children}
        </>
    );
}
