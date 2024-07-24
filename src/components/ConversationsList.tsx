"use client";

import { Conv } from "@/types/Types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../styles/conversationsList.module.scss";
import { useParams } from "next/navigation";

const ConversationsList = ({ conversations }: { conversations: Conv[] }) => {
    const { conversationId } = useParams();

    return (
        <div className={styles.items}>
            <h2>Conversations</h2>
            <div className={styles.divider}></div>
            {conversations.map((conv: Conv, idx: number) => (
                <Link
                    className={conversationId === conv.id ? styles.active : ""}
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
                        <p>22 Juil. 2024</p>
                        <p>15:30</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ConversationsList;
