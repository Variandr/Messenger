export interface Message {
    id: number;
    user_id: number;
    chat_id: number;
    username: string;
    body: string;
    created_at: string;
    updated_at: string | null;
}

export interface MessagesByDate {
    date: string;
    messages: Array<Message>;
}

export interface Params {
    chatId?: string;
}
