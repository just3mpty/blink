import MessageFeed from "@/components/MessageFeed";
import MessageInput from "@/components/MessageInput";
import styles from "../../../styles/messageFeed.module.scss";
import React from "react";
import MessageItem from "@/components/Message";
import { Message } from "@/types/Types";

export default function Conversation() {
    const Messages: Message[] = [
        {
            username: "John",
            message: "Test de message",
            date: "12:25",
            imageUrl: "/fakeData/4.jpg",
        },
        {
            username: "John",
            message:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, aliquid natus cupiditate veritatis a numquam?",
            date: "12:28",
            imageUrl: "/fakeData/4.jpg",
        },
        {
            username: "3mpty",
            message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            date: "12:28",
            imageUrl: "/3mpty.png",
        },
    ];

    return (
        <>
            <MessageFeed>
                <div className={styles.messages}>
                    {Messages.map((msg, idx) => (
                        <MessageItem key={idx} {...msg} />
                    ))}
                </div>
            </MessageFeed>
            <div className={styles.inputContainer}>
                <MessageInput />
            </div>
        </>
    );
}
