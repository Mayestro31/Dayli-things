import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Daysi } from "@/components/mascot/daysi";
import { Avatar } from "@/components/ui/avatar";
import { formatRelativeTime } from "@/lib/utils";

export default async function ChatListPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: conversations } = await supabase
    .from("conversations")
    .select("id, user1_id, user2_id, created_at")
    .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
    .order("created_at", { ascending: false });

  const convoIds = (conversations ?? []).map((c) => c.id);
  const otherUserIds = (conversations ?? []).map((c) =>
    c.user1_id === user.id ? c.user2_id : c.user1_id
  );

  const [{ data: profiles }, { data: messages }] = await Promise.all([
    otherUserIds.length
      ? supabase.from("profiles").select("id, display_name, avatar_url").in("id", otherUserIds)
      : Promise.resolve({ data: [] as { id: string; display_name: string; avatar_url: string | null }[] }),
    convoIds.length
      ? supabase
          .from("messages")
          .select("conversation_id, content, sender_id, created_at, read_at")
          .in("conversation_id", convoIds)
          .order("created_at", { ascending: false })
      : Promise.resolve({
          data: [] as {
            conversation_id: string;
            content: string;
            sender_id: string;
            created_at: string;
            read_at: string | null;
          }[],
        }),
  ]);

  type MessagePreview = {
    conversation_id: string;
    content: string;
    sender_id: string;
    created_at: string;
    read_at: string | null;
  };

  const profileById = new Map((profiles ?? []).map((p) => [p.id, p]));
  const lastMessageByConvo = new Map<string, MessagePreview>();
  const unreadByConvo = new Map<string, number>();
  for (const m of messages ?? []) {
    if (!lastMessageByConvo.has(m.conversation_id)) {
      lastMessageByConvo.set(m.conversation_id, m);
    }
    if (m.sender_id !== user.id && !m.read_at) {
      unreadByConvo.set(m.conversation_id, (unreadByConvo.get(m.conversation_id) ?? 0) + 1);
    }
  }

  const items = (conversations ?? []).map((c) => {
    const otherId = c.user1_id === user.id ? c.user2_id : c.user1_id;
    return {
      id: c.id,
      other: profileById.get(otherId),
      lastMessage: lastMessageByConvo.get(c.id),
      unread: unreadByConvo.get(c.id) ?? 0,
    };
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Nachrichten 💬</h1>
        <p className="text-sm text-gray-text">Deine Unterhaltungen mit anderen Daysi&apos;s.</p>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <Daysi size={90} />
          <p className="text-sm text-gray-text">
            Noch keine Chats. Schreib jemandem auf der Entdecken-Seite eine Nachricht!
          </p>
        </div>
      ) : (
        <Card>
          <CardContent className="divide-y divide-gray-mid p-0">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/chat/${item.id}`}
                className="flex items-center gap-3.5 px-4 py-3.5 hover:bg-brand-50"
              >
                <Avatar
                  src={item.other?.avatar_url}
                  name={item.other?.display_name ?? "?"}
                  size={48}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="truncate font-bold text-foreground">
                      {item.other?.display_name ?? "Unbekannt"}
                    </span>
                    {item.lastMessage && (
                      <span className="shrink-0 text-xs text-gray-text">
                        {formatRelativeTime(item.lastMessage.created_at, false)}
                      </span>
                    )}
                  </div>
                  <p className="truncate text-sm text-gray-text">
                    {item.lastMessage?.content ?? "Noch keine Nachrichten"}
                  </p>
                </div>
                {item.unread > 0 && (
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
                    {item.unread}
                  </span>
                )}
              </Link>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
