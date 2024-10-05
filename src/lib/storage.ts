export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
}

export interface Chat {
  id: string;
  messages: ChatMessage[];
  firstQuestion: string;
}

export const saveChat = (chat: Chat) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(`chat_${chat.id}`, JSON.stringify(chat));
  }
};

export const loadChat = (chatId: string): Chat | null => {
  if (typeof window !== "undefined") {
    const chatJson = localStorage.getItem(`chat_${chatId}`);
    return chatJson ? JSON.parse(chatJson) : null;
  }
  return null;
};

export const listChats = (): string[] => {
  if (typeof window !== "undefined") {
    return Object.keys(localStorage)
      .filter((key) => key.startsWith("chat_"))
      .map((key) => key.replace("chat_", ""));
  }
  return [];
};

export const clearAllChats = () => {
  if (typeof window !== "undefined") {
    Object.keys(localStorage)
      .filter((key) => key.startsWith("chat_"))
      .forEach((key) => localStorage.removeItem(key));
  }
};
