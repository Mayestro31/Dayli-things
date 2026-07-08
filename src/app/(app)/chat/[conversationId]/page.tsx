import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ChatThread } from "@/components/chat/chat-thread";

export default async function ChatConversationPage({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  const { conversationId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: conversation } = await supabase
    .from("conversations")
    .select("id, user1_id, user2_id")
    .eq("id", conversationId)
    .single();

  if (!conversation || (conversation.user1_id !== user.id && conversation.user2_id !== user.id)) {
    notFound();
  }

  const otherId = conversation.user1_id === user.id ? conversation.user2_id : conversation.user1_id;

  const [{ data: otherProfile }, { data: messages }] = await Promise.all([
    supabase.from("profiles").select("id, display_name, avatar_url").eq("id", otherId).single(),
    supabase
      .from("messages")
      .select("id, conversation_id, sender_id, content, created_at, read_at")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true }),
  ]);

  if (!otherProfile) {
    notFound();
  }

  return (
    <ChatThread
      conversationId={conversationId}
      currentUserId={user.id}
      otherProfile={otherProfile}
      initialMessages={messages ?? []}
    />
  );
}
