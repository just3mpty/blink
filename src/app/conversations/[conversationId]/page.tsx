"use client";
import MessageFeed from "@/components/MessageFeed";
import MessageInput from "@/components/MessageInput";
import styles from "@/styles/messageFeed.module.scss";
import React, { useEffect, useState } from "react";
import MessageItem from "@/components/Message";
import { Message } from "@/types/Types";
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useParams } from "next/navigation";

export default function Conversation() {
    const { conversationId } = useParams();
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (!conversationId) return;

        const messagesCollection = collection(db, "messages");
        const q = query(
            messagesCollection,
            where("conversationId", "==", conversationId),
            orderBy("createdAt", "asc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messagesData = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    username: data.senderName || "",
                    message: data.message || "",
                    date: data.createdAt || "",
                    imageUrl: data.senderPhotoURL || "",
                } as Message;
            });
            setMessages(messagesData);
        });

        return () => unsubscribe();
    }, [conversationId]);

    return (
        <>
            <MessageFeed>
                <div className={styles.messages}>
                    {messages.map((msg) => (
                        <MessageItem
                            key={msg.id}
                            username={msg.username}
                            message={msg.message}
                            date={msg.date.toString()}
                            imageUrl={msg.imageUrl}
                            id={msg.id}
                        />
                    ))}
                </div>
            </MessageFeed>
            <MessageInput conversationId={conversationId as string} />
        </>
    );
}
