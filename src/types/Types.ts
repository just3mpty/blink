interface Conv {
    username: string;
    imageUrl: string;
    contact: string;
    lastMessage: string;
    id: string;
}

interface Message {
    username: string;
    message: string;
    date: string;
    imageUrl: string;
}

export type { Conv, Message };
