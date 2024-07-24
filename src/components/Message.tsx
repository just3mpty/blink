import { Message } from "@/types/Types";
import Image from "next/image";
import styles from "@/styles/messageFeed.module.scss";
import { useAuth } from "@/context/AuthContext";

const MessageItem = ({ username, message, date, imageUrl }: Message) => {
    const { user } = useAuth();
    return (
        <div
            style={
                username === user?.displayName ? { alignSelf: "flex-end" } : {}
            }
            className={
                username === user?.displayName
                    ? styles.sender
                    : styles.messageItem
            }>
            <Image
                src={imageUrl || "/3mpty.png"}
                alt={`${username}'s profil picture`}
                width={30}
                height={30}
            />
            <div className={styles.userData}>
                <p>
                    <span>{username}</span>
                    <span>{date}</span>
                </p>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default MessageItem;
