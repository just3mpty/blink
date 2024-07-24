"use client";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
    const { user } = useAuth();
    return (
        <div className="starting">
            <h2>
                <span>W</span>elcome{" "}
                <span>{user ? user?.displayName : ""}</span> !
            </h2>
            <p>
                To start a conversation, click on the <span>+</span> button.{" "}
                <br />
                You can also click on an existant one.
            </p>
        </div>
    );
}
