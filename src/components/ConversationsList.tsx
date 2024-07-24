"use client";

import { Conv } from "@/types/Types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "@/styles/conversationsList.module.scss";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

const ConversationsList = () => {
    const { conversationId } = useParams();
    const { user } = useAuth();
    const [conversations, setConversations] = useState<Conv[]>([]);

    useEffect(() => {
        if (!user) return;

        const convCollection = collection(db, "conversations");
        const q = query(
            convCollection,
            where("participants", "array-contains", user.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const convData = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    imageUrl: data.imageUrl || "/favicon.png",
                    contact: data.contact || "Unknown",
                    lastMessage: data.lastMessage || "",
                    createdAt: data.createdAt || "",
                } as Conv;
            });
            setConversations(convData);
        });
        return () => unsubscribe();
    }, [user]);

    return (
        <div className={styles.items}>
            <h2>Conversations</h2>
            <div className={styles.divider}></div>
            {conversations.length > 0 ? (
                conversations.map((conv: Conv, idx: number) => (
                    <Link
                        className={
                            conversationId === conv.id ? styles.active : ""
                        }
                        href={`/conversations/${conv.id}`}
                        key={idx}>
                        <Image
                            src={conv?.imageUrl || "/favicon.png"}
                            alt={`${conv.username}'s profil picture`}
                            width={60}
                            height={60}
                        />
                        <div className={styles.data}>
                            <p>{conv.username}</p>
                            <p>
                                {conv.contact}: <span>{conv.lastMessage}</span>
                            </p>
                        </div>
                        <div className={styles.time}>
                            <p>{conv.createdAt}</p>
                        </div>
                    </Link>
                ))
            ) : (
                <h4>No conversations found.</h4>
            )}
        </div>
    );
};

export default ConversationsList;
