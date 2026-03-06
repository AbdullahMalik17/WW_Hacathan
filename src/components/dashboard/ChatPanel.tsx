"use client";

import React, { useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Sparkles, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import DashboardError from "./shared/DashboardError";

interface ChatPanelProps {
  onQueryChange: (query: string) => void;
}

const SUGGESTED_QUESTIONS = [
  "What are the most dangerous areas in Montgomery?",
  "Tell me about safety near downtown",
  "Any unusual spikes in 911 calls?",
  "Compare crime rates across neighborhoods"
];

const ChatPanel: React.FC<ChatPanelProps> = ({ onQueryChange }) => {
  const { messages, sendMessage, status, error, regenerate } = useChat();
  const [input, setInput] = useState("");
  const isLoading = status === "streaming" || status === "submitted";

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const onSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    onQueryChange(trimmed);
    sendMessage({ text: trimmed });
    setInput("");
  };

  const handleSuggestedClick = (q: string) => {
    onQueryChange(q);
    sendMessage({ text: q });
  };

  const getMessageText = (m: (typeof messages)[number]): string => {
    return m.parts
      .filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("");
  };

  return (
    <Card className="bg-[var(--bg-secondary)] border-[var(--border)] h-full flex flex-col animate-panel">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-[var(--accent-primary)]" />
          <CardTitle className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
            SafeMGM AI Terminal
          </CardTitle>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={cn("w-2 h-2 rounded-full", isLoading ? "bg-[var(--accent-primary)] animate-pulse" : "bg-emerald-500")} />
          <span className="text-[10px] text-[var(--text-secondary)] uppercase font-mono">
            {isLoading ? "Processing..." : "System Online"}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden relative">
        <ScrollArea className="flex-1 p-4">
          <div ref={scrollRef} className="space-y-4">
            {messages.length === 0 && !error && (
              <div className="h-full flex flex-col items-center justify-center space-y-6 text-center py-8">
                <div className="bg-[var(--bg-tertiary)] p-4 rounded-full border border-[var(--border)]">
                  <Bot className="h-10 w-10 text-[var(--accent-primary)]" />
                </div>
                <div className="space-y-2 max-w-[280px]">
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">Analyze Montgomery Safety</h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Ask about crime trends, 911 activity, or specific neighborhoods. Data cited from local sources.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-2 w-full max-w-sm px-4">
                  {SUGGESTED_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestedClick(q)}
                      className="text-left px-3 py-2 text-[11px] bg-[var(--bg-tertiary)] hover:bg-[var(--bg-primary)] border border-[var(--border)] hover:border-[var(--accent-primary)] rounded-md transition-all text-[var(--text-secondary)] hover:text-[var(--accent-primary)] group flex items-center justify-between"
                    >
                      <span>{q}</span>
                      <Sparkles className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex items-start gap-3 animate-panel",
                  m.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {m.role !== "user" && (
                  <div className="w-8 h-8 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border)] flex items-center justify-center shrink-0 mt-1">
                    <Bot className="h-4 w-4 text-[var(--accent-primary)]" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm",
                    m.role === "user"
                      ? "bg-[var(--accent-primary)] text-[var(--bg-primary)] font-medium rounded-tr-none"
                      : "bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border)] rounded-tl-none"
                  )}
                >
                  <div className="whitespace-pre-wrap">
                    {getMessageText(m)}
                  </div>
                </div>
                {m.role === "user" && (
                  <div className="w-8 h-8 rounded-md bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/30 flex items-center justify-center shrink-0 mt-1">
                    <User className="h-4 w-4 text-[var(--accent-primary)]" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex items-start gap-3 animate-pulse">
                <div className="w-8 h-8 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border)] flex items-center justify-center shrink-0 mt-1">
                  <Bot className="h-4 w-4 text-[var(--accent-primary)]" />
                </div>
                <div className="bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border)] rounded-2xl rounded-tl-none p-3 h-10 w-16 flex items-center justify-center gap-1">
                  <span className="w-1 h-1 bg-[var(--text-secondary)] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1 h-1 bg-[var(--text-secondary)] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1 h-1 bg-[var(--text-secondary)] rounded-full animate-bounce"></span>
                </div>
              </div>
            )}

            {error && (
              <div className="pt-4">
                <DashboardError
                  message="SafeMGM is currently thinking... Please try again in a moment."
                  onRetry={() => regenerate()}
                />
              </div>
            )}
          </div>
        </ScrollArea>

        <form
          id="chat-form"
          onSubmit={onSend}
          className="p-4 bg-[var(--bg-primary)]/50 border-t border-[var(--border)] flex items-center gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask SafeMGM about Montgomery safety..."
            className="flex-1 bg-[var(--bg-secondary)] border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus-visible:ring-0 focus-visible:border-[var(--accent-primary)] chat-input-focus h-10"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/80 text-[var(--bg-primary)] h-10 w-10 p-0 rounded-md transition-all active:scale-95 shadow-lg shadow-[var(--accent-primary)]/10"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChatPanel;
