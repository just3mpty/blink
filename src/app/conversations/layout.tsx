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
import useDimension from "../hook/useDimensions";
import MobileNavbar from "@/components/mobile/MobileNav";

// === FAKE DATA ===

export default function DefaultLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const { width } = useDimension();

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
            {width > 1000 ? (
                <>
                    <aside>
                        <Navbar user={user} />
                        <ConversationsList />
                    </aside>
                </>
            ) : (
                <MobileNavbar user={user} />
            )}
            <main>{children}</main>
        </AuthProvider>
    );
}
