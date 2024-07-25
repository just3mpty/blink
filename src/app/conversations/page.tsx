"use client";
import { useAuth } from "@/context/AuthContext";
import useDimension from "../hook/useDimensions";
import ConversationsList from "@/components/ConversationsList";

export default function Home() {
    const { user } = useAuth();
    const { width } = useDimension();

    return (
        <>
            {width > 1000 ? (
                <div className="starting">
                    <h2>
                        <span>W</span>elcome{" "}
                        <span>{user ? user?.displayName : ""}</span> !
                    </h2>
                    <p>
                        To start a conversation, you can create a new one on the
                        left side.{" "}
                    </p>
                </div>
            ) : (
                <div className="mobileConvList">
                    <ConversationsList />
                </div>
            )}
        </>
    );
}
