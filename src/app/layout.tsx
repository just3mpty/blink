import type { Metadata } from "next";
import { Space_Grotesk, Sora } from "next/font/google";
import "./globals.scss";
import Navbar from "@/components/Navbar";

const space = Space_Grotesk({ subsets: ["latin"] });
const sourceCode = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "BLINK",
    description: "Real time chat app.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body className={sourceCode.className}>
                <aside>
                    <Navbar />
                </aside>
                {children}
            </body>
        </html>
    );
}
