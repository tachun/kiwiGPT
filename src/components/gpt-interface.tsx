"use client";

import React from "react";
import {
  Cog6ToothIcon,
  PlusIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChatInterfaceComponent } from "@/components/chat-interface";

export function GptInterface() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4">
          <Button
            className="w-full flex items-center justify-center"
            variant="outline"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            New Chat
          </Button>
        </div>
        <div className="flex-grow overflow-y-auto">
          <nav className="px-4 space-y-2">
            {/* Sample chat history items */}
            {["Chat 1", "Chat 2", "Chat 3"].map((chat, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start"
              >
                <ChatBubbleLeftIcon className="h-5 w-5 mr-2" />
                {chat}
              </Button>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full flex items-center justify-center"
          >
            <Cog6ToothIcon className="h-5 w-5 mr-2" />
            Settings
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <div className="mb-8">
            <Image
              src="/kiwi-main.png"
              width="64"
              height="64"
              alt="Logo"
              className="h-16"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
            <Button
              variant="outline"
              className="h-24 text-left flex flex-col items-start justify-center p-4"
            >
              <span className="text-lg font-semibold">
                Tell me a joke today
              </span>
              <span className="text-sm text-gray-500">Get a random joke</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 text-left flex flex-col items-start justify-center p-4"
            >
              <span className="text-lg font-semibold">Explain a concept</span>
              <span className="text-sm text-gray-500">Learn something new</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 text-left flex flex-col items-start justify-center p-4"
            >
              <span className="text-lg font-semibold">Write a story</span>
              <span className="text-sm text-gray-500">Create a short tale</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 text-left flex flex-col items-start justify-center p-4"
            >
              <span className="text-lg font-semibold">Solve a problem</span>
              <span className="text-sm text-gray-500">
                Get help with a task
              </span>
            </Button>
          </div>
        </div>
        <ChatInterfaceComponent />
        {/* <div className="p-4 border-t border-gray-200">
          <div className="max-w-3xl mx-auto flex">
            <Input 
              className="flex-grow mr-2" 
              placeholder="Type your message here..." 
            />
            <Button>Send</Button>
          </div>
        </div> */}
      </main>
    </div>
  );
}
