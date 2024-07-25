import { useState } from "react";
import Image from "next/image";
import styles from "@/styles/navbar.module.scss";
import { signOut, User } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import StartConversationModal from "./StartConvModal";
import { MdLogout } from "react-icons/md";

const Navbar = ({ user }: { user: User | null }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        <nav className={styles.navbar}>
            <div className={styles.user}>
                <Image
                    src={user?.photoURL || "/favicon.png"}
                    alt="User's profile picture"
                    width={30}
                    height={30}
                />
                <span>{user?.displayName}</span>
            </div>
            <div className={styles.buttons}>
                <button
                    type="button"
                    className={styles.button}
                    onClick={handleStartConversation}>
                    +
                </button>
                <button
                    type="button"
                    className={styles.button}
                    onClick={handleLogout}>
                    <MdLogout />
                </button>
            </div>

            {isModalOpen && (
                <StartConversationModal onClose={() => setIsModalOpen(false)} />
            )}
        </nav>
    );
};

export default Navbar;
