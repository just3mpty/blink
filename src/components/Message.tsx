import { Message } from "@/types/Types";
import Image from "next/image";
import styles from "@/styles/messageFeed.module.scss";

const MessageItem = ({ username, message, date, imageUrl }: Message) => {
    return (
        <div
            style={username === "3mpty" ? { alignSelf: "flex-end" } : {}}
            className={
                username === "John" ? styles.messageItem : styles.sender
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
