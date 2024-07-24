"use client";
import "../globals.scss";
import Navbar from "@/components/Navbar";
import ConversationsList from "@/components/ConversationsList";
import { Conv } from "@/types/Types";
import { useEffect, useState } from "react";
import { auth } from "@/config/firebaseConfig";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import { AuthProvider } from "@/context/AuthContext";

// === FAKE DATA ===

export default function DefaultLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                router.push("/conversations");
            } else {
                router.push("/login");
            }
            setUser(user);
        });
        return () => unsubscribe();
    });

    return (
        <AuthProvider>
            <aside>
                <Navbar user={user} />
                <ConversationsList />
            </aside>
            <main>{children}</main>
        </AuthProvider>
    );
}
