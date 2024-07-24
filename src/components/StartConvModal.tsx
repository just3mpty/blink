import { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { User } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";
import styles from "@/styles/navbar.module.scss";
import Image from "next/image";

const StartConversationModal = ({ onClose }: { onClose: () => void }) => {
    const { user } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersCollection = collection(db, "users");
            const snapshot = await getDocs(usersCollection);
            const usersData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as unknown as User[];

            const filteredUsers = usersData.filter((u) => u.uid !== user?.uid);
            setUsers(filteredUsers);
        };

        fetchUsers();
    }, [user]);

    const handleStartConversation = async () => {
        if (user && selectedUser) {
            try {
                const conversationsCollection = collection(db, "conversations");
                await addDoc(conversationsCollection, {
                    participants: [user.uid, selectedUser.uid],
                    lastMessage: "",
                    username: user.displayName,
                    contact: selectedUser.displayName,
                    imageUrl: selectedUser.photoURL,
                    createdAt: new Date().toLocaleString("fr-FR", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hourCycle: "h24",
                    }),
                });
                onClose();
            } catch (error) {
                console.error("Error creating conversation:", error);
            }
        }
    };

    return (
        <div className={styles.modal}>
            <h2>
                <span>S</span>tart a conversation
            </h2>
            <ul>
                {users.map((u) => (
                    <li
                        key={u.uid}
                        onClick={() => setSelectedUser(u)}
                        className={selectedUser === u ? styles.active : ""}>
                        <Image
                            src={u.photoURL || "/favicon.png"}
                            alt={`${u.displayName}'s profil picture`}
                            width={30}
                            height={30}
                        />
                        <span>{u.displayName}</span>
                    </li>
                ))}
            </ul>
            <button onClick={handleStartConversation} disabled={!selectedUser}>
                Start Conversation
            </button>
            <button onClick={onClose}>X</button>
        </div>
    );
};

export default StartConversationModal;
