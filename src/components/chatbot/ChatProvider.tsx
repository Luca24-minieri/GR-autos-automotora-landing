'use client';

import dynamic from 'next/dynamic';

const ChatWidget = dynamic(
  () => import('@/components/chatbot/ChatWidget').then((mod) => mod.ChatWidget),
  { ssr: false }
);

export function ChatProvider() {
  const isEnabled = process.env.NEXT_PUBLIC_CHAT_ENABLED === 'true';
  if (!isEnabled) return null;
  return <ChatWidget />;
}
