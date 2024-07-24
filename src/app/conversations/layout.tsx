import "../globals.scss";
import Navbar from "@/components/Navbar";
import ConversationsList from "@/components/ConversationsList";
import { Conv } from "@/types/Types";

// === FAKE DATA ===
const conversations: Conv[] = [
    {
        imageUrl: "/fakeData/4.jpg",
        username: "John",
        id: "4",
        contact: "John",
        lastMessage: "Message test",
    },
    {
        imageUrl: "/fakeData/1.jpg",
        username: "Michelle",
        id: "1",
        contact: "3mpty",
        lastMessage: "Message test",
    },
    {
        imageUrl: "/fakeData/2.jpg",
        username: "Gertrude",
        id: "2",
        contact: "John Test",
        lastMessage: "Message test",
    },
    {
        imageUrl: "/fakeData/3.jpg",
        username: "Pascal le petit reuf",
        id: "3",
        contact: "John Test",
        lastMessage: "Message test",
    },
];

export default function DefaultLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <aside>
                <Navbar />
                <ConversationsList conversations={conversations} />
            </aside>
            <main>{children}</main>
        </>
    );
}
