import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.scss";

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Blink.",
    description: "Real time chat app.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body className={sora.className}>{children}</body>
        </html>
    );
}
