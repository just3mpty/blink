import { db } from "@/config/firebaseConfig";
import { useAuth } from "@/context/AuthContext";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import styles from "@/styles/messageFeed.module.scss";

const MessageInput = ({ conversationId }: { conversationId: string }) => {
    const [message, setMessage] = useState<string>("");
    const { user } = useAuth();

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !user) return;

        console.log("username:", user.displayName);
        console.log("Message:", message);

        try {
            const messagesCollection = collection(db, "messages");
            await addDoc(messagesCollection, {
                conversationId,
                senderId: user.uid,
                senderName: user.displayName,
                senderPhotoURL: user.photoURL,
                message,
                createdAt: new Date().toLocaleString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hourCycle: "h24",
                }),
            });

            const conversationDoc = doc(db, "conversations", conversationId);
            await updateDoc(conversationDoc, {
                lastMessage: message,
                lastMessageTimestamp: serverTimestamp(),
            });

            setMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <form className={styles.form} onSubmit={sendMessage}>
            <input
                type="text"
                placeholder="Ecrire un message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Envoyer</button>
        </form>
    );
};

export default MessageInput;
