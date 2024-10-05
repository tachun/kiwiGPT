"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useImpatientBot } from "@/hooks/useImpatientBot";
import {
  Chat,
  ChatMessage,
  clearAllChats,
  listChats,
  loadChat,
  saveChat,
} from "@/lib/storage";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function ChatInterface() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [input, setInput] = useState("");
  const { getResponse, language, isLoading } = useImpatientBot();

  useEffect(() => {
    const chatList = listChats()
      .map((chatId) => loadChat(chatId))
      .filter((chat): chat is Chat => chat !== null);
    setChats(chatList);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
    };

    let updatedChat: Chat;
    if (currentChat) {
      updatedChat = {
        ...currentChat,
        messages: [...currentChat.messages, newMessage],
      };
    } else {
      updatedChat = {
        id: Date.now().toString(),
        messages: [newMessage],
        firstQuestion: input.slice(0, 50), // Store the first 50 characters of the first question
      };
    }

    setCurrentChat(updatedChat);
    setInput("");

    const botResponse = await getResponse(input);

    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      content: botResponse,
      sender: "bot",
    };

    updatedChat = {
      ...updatedChat,
      messages: [...updatedChat.messages, botMessage],
    };

    setCurrentChat(updatedChat);
    saveChat(updatedChat);
    setChats((prev) => {
      const index = prev.findIndex((chat) => chat.id === updatedChat.id);
      if (index !== -1) {
        return [...prev.slice(0, index), updatedChat, ...prev.slice(index + 1)];
      } else {
        return [updatedChat, ...prev];
      }
    });
  };

  const handleNewChat = () => {
    setCurrentChat(null);
    setInput("");
  };

  const handleChatSelect = (chat: Chat) => {
    setCurrentChat(chat);
  };

  const handleClearHistory = () => {
    clearAllChats();
    setChats([]);
    setCurrentChat(null);
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col gap-4 w-64 bg-gray-100 p-5 overflow-hidden">
        <Button
          onClick={handleNewChat}
          className="w-full bg-lime-600 text-white"
        >
          New Chat
        </Button>
        <h3 className="text-base font-bold">Chat History</h3>
        <ScrollArea className="h-[calc(100vh-120px)]">
          {chats.map((chat) => (
            <Button
              key={chat.id}
              variant="ghost"
              className="w-full justify-start mb-2 overflow-hidden"
              onClick={() => handleChatSelect(chat)}
            >
              <span className="block truncate max-w-48">
                {chat.firstQuestion}
              </span>
            </Button>
          ))}
        </ScrollArea>
        <Button
          onClick={handleClearHistory}
          className="w-full bg-lime-900 text-white"
        >
          Clear History
        </Button>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex flex-col items-center">
          <Image src="/kiwi-main.png" width="100" height="100" alt="Logo" />
          <h1 className="text-2xl font-extrabold">Kiwi GPT</h1>
        </div>
        <ScrollArea className="flex-1 p-4">
          {currentChat?.messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block py-3 px-5 rounded-3xl max-w-[80%] ${
                  message.sender === "user"
                    ? "bg-gray-200 text-gray-800"
                    : "bg-lime-600 text-white"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-left mb-6">
              <div className="inline-block py-3 px-5 rounded-3xl bg-gray-200">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            </div>
          )}
        </ScrollArea>
        <div className="p-5 border-t">
          <div className="flex">
            <Input
              value={input}
              autoFocus
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                language === "en"
                  ? "Type your message..."
                  : "Tapez votre message..."
              }
              className="flex-1 mr-5"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button onClick={handleSend} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : language === "en" ? (
                "Send"
              ) : (
                "Envoyer"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
