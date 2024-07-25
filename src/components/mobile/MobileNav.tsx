import { useState } from "react";
import Image from "next/image";
import styles from "@/styles/navbar.module.scss";
import { signOut, User } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import StartConversationModal from "../StartConvModal";
import { IoLogOutSharp } from "react-icons/io5";
import { LuMessagesSquare } from "react-icons/lu";
import { useRouter } from "next/navigation";

const MobileNavbar = ({ user }: { user: User | null }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const handleStartConversation = () => {
        setIsModalOpen(true);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <nav className={styles.mobileNavbar}>
            <Image
                src={user?.photoURL || "/favicon.png"}
                alt="User's profile picture"
                width={40}
                height={40}
            />
            <button
                type="button"
                className={styles.button}
                onClick={handleStartConversation}>
                +
            </button>
            <button
                type="button"
                className={styles.button}
                onClick={() => router.back()}>
                <LuMessagesSquare />
            </button>
            <button
                type="button"
                className={styles.button}
                onClick={handleLogout}>
                <IoLogOutSharp />
            </button>

            {isModalOpen && (
                <StartConversationModal onClose={() => setIsModalOpen(false)} />
            )}
        </nav>
    );
};

export default MobileNavbar;
