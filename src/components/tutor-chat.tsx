"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface TutorChatProps {
  courseId?: string;
}

export function TutorChat({ courseId }: TutorChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Hi! I'm here to help you with your soft skills lessons. What would you like to practice today?" 
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || loading) return;

    setInput("");
    setMessages(prev => [...prev, { role: "user", content: textToSend }]);
    setLoading(true);

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, courseId }),
      });

      const data = await res.json();

      if (data.response) {
        setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I couldn't get a response. Please try again." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "An error occurred. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 z-40"
      >
        <Bot className="w-6 h-6 text-white" />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-[450px] bg-white border border-gray-200 rounded-xl shadow-xl flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium text-gray-900">AI Tutor</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="w-7 h-7 hover:bg-gray-100 rounded-full flex items-center justify-center"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex items-start gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`
                    w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0
                    ${msg.role === "user" ? "bg-emerald-500" : "bg-gray-100"}
                  `}>
                    {msg.role === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  <div className={`
                    px-3 py-2 rounded-lg text-sm
                    ${msg.role === "user" 
                      ? "bg-emerald-500 text-white" 
                      : "bg-gray-100 text-gray-800"
                    }
                  `}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 px-3 py-2 rounded-lg">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a question..."
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500"
                disabled={loading}
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 rounded-lg transition-colors"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TutorChat;