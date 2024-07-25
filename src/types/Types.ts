interface Conv {
    participants: string[];
    id: string;
    username: string;
    imageUrl: string;
    contact: string;
    lastMessage: string;
    createdAt: string;
}

interface Message {
    id: string;
    username: string;
    message: string;
    date: string;
    imageUrl: string;
}

interface User {
    id: string;
    displayName: string;
    photoURL: string;
}

export type { Conv, Message, User };
