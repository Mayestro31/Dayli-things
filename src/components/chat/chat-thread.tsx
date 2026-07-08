"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Message } from "@/types/database.types";

type OtherProfile = { id: string; display_name: string; avatar_url: string | null };

export function ChatThread({
  conversationId,
  currentUserId,
  otherProfile,
  initialMessages,
}: {
  conversationId: string;
  currentUserId: string;
  otherProfile: OtherProfile;
  initialMessages: Message[];
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) =>
            prev.some((m) => m.id === newMessage.id) ? prev : [...prev, newMessage]
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, supabase]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function send() {
    const content = draft.trim();
    if (!content || sending) return;
    setSending(true);
    setSendError("");
    setDraft("");
    const { error } = await supabase
      .from("messages")
      .insert({ conversation_id: conversationId, sender_id: currentUserId, content });
    setSending(false);
    if (error) {
      setDraft(content);
      setSendError("Nachricht konnte nicht gesendet werden. Bitte versuch es erneut.");
    }
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm sm:h-[75vh]">
      <div className="flex items-center gap-3 border-b border-brand-100 bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-3 text-white">
        <Link href="/chat" className="rounded-full p-1 hover:bg-white/20">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <Avatar
          src={otherProfile.avatar_url}
          name={otherProfile.display_name}
          size={40}
          className="border-white/60 bg-white/20 text-white"
        />
        <Link href={`/profile/${otherProfile.id}`} className="font-bold hover:underline">
          {otherProfile.display_name}
        </Link>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto bg-off-white p-4">
        {messages.length === 0 && (
          <p className="pt-10 text-center text-sm text-gray-text">
            Schreib {otherProfile.display_name} eine erste Nachricht 👋
          </p>
        )}
        {messages.map((message) => {
          const mine = message.sender_id === currentUserId;
          return (
            <div key={message.id} className={cn("flex", mine ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-3.5 py-2 text-sm",
                  mine
                    ? "rounded-br-md bg-brand-500 text-white"
                    : "rounded-bl-md border border-gray-mid bg-white text-foreground"
                )}
              >
                {message.content}
              </div>
            </div>
          );
        })}
      </div>

      {sendError && (
        <p className="border-t border-brand-100 bg-red-50 px-4 py-2 text-xs text-red-700">
          {sendError}
        </p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="flex items-center gap-2 border-t border-brand-100 p-3"
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Schreib eine Nachricht…"
          className="h-11 flex-1 rounded-xl border border-gray-mid bg-off-white px-3.5 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
        />
        <button
          type="submit"
          disabled={!draft.trim() || sending}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
