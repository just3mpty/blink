import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.scss";
import Navbar from "@/components/Navbar";
import ConversationsList from "@/components/ConversationsList";
import { Conv } from "@/types/Types";

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "BLINK",
    description: "Real time chat app.",
};

// === FAKE DATA ===
const conversations: Conv[] = [
    {
        imageUrl: "/3mpty.png",
        username: "Username",
        path: "/",
        contact: "John Test",
        lastMessage: "Message test",
    },
    {
        imageUrl: "/3mpty.png",
        username: "Username",
        path: "/",
        contact: "John Test",
        lastMessage: "Message test",
    },
    {
        imageUrl: "/3mpty.png",
        username: "Username",
        path: "/",
        contact: "John Test",
        lastMessage: "Message test",
    },
    {
        imageUrl: "/3mpty.png",
        username: "Username",
        path: "/",
        contact: "John Test",
        lastMessage: "Message test",
    },
];

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body className={sora.className}>
                <aside>
                    <Navbar />
                    <ConversationsList conversations={conversations} />
                </aside>
                {children}
            </body>
        </html>
    );
}
