"use client";
import { Conv, User } from "@/types/Types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "@/styles/conversationsList.module.scss";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    collection,
    getDocs,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

const ConversationsList = () => {
    const { conversationId } = useParams();
    const { user } = useAuth();
    const [conversations, setConversations] = useState<Conv[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        if (!user) return;

        // Fetch all users
        const fetchUsers = async () => {
            const usersCollection = collection(db, "users");
            const usersSnapshot = await getDocs(usersCollection);
            const usersList = usersSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as User[];
            setUsers(usersList);
        };

        fetchUsers();

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
                    participants: data.participants || [],
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
                conversations.map((conv: Conv, idx: number) => {
                    const participantImages = conv.participants.map(
                        (participantId) => {
                            const participant = users.find(
                                (user) => user.id === participantId
                            );
                            return participant ? (
                                <Image
                                    key={participantId}
                                    src={participant.photoURL || "/favicon.png"}
                                    alt={`${participant.displayName}'s profile picture`}
                                    width={30}
                                    height={30}
                                />
                            ) : null;
                        }
                    );
                    const participantsNames = conv.participants.map(
                        (participantId) => {
                            const participant = users.find(
                                (user) => user.id === participantId
                            );
                            return participant ? (
                                <p>{participant.displayName}</p>
                            ) : null;
                        }
                    );

                    return (
                        <Link
                            className={
                                conversationId === conv.id ? styles.active : ""
                            }
                            href={`/conversations/${conv.id}`}
                            key={idx}>
                            <div className={styles.images}>
                                {participantImages}
                            </div>
                            <div className={styles.data}>
                                <div className={styles.participants}>
                                    {participantsNames[0]} &{" "}
                                    {participantsNames[1]}
                                </div>
                                <p>
                                    Last message :{" "}
                                    <span>{conv.lastMessage}</span>
                                </p>
                            </div>
                            <div className={styles.time}>
                                <p>{conv.createdAt}</p>
                            </div>
                        </Link>
                    );
                })
            ) : (
                <h4>No conversations found.</h4>
            )}
        </div>
    );
};

export default ConversationsList;
