'use client';

import dynamic from 'next/dynamic';

const ChatWidget = dynamic(
  () => import('@/components/chatbot/ChatWidget').then((mod) => mod.ChatWidget),
  { ssr: false }
);

export function ChatProvider() {
  return <ChatWidget />;
}
