import { create } from 'zustand';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatStore {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
  sessionId: string;
  hasInteracted: boolean;
  setOpen: (open: boolean) => void;
  toggleOpen: () => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setLoading: (loading: boolean) => void;
  sendMessage: (content: string) => Promise<void>;
}

function getSessionId(): string {
  if (typeof window === 'undefined') return `session_${Date.now()}`;
  let id = localStorage.getItem('gr-chat-session');
  if (!id) {
    id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('gr-chat-session', id);
  }
  return id;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  isOpen: false,
  messages: [],
  isLoading: false,
  sessionId: typeof window !== 'undefined' ? getSessionId() : '',
  hasInteracted: false,

  setOpen: (open) => set({ isOpen: open }),

  toggleOpen: () => {
    const { isOpen, messages } = get();
    const newOpen = !isOpen;
    if (newOpen && messages.length === 0) {
      set({
        isOpen: newOpen,
        hasInteracted: true,
        messages: [
          {
            id: 'welcome',
            role: 'assistant',
            content: '¡Hola! 👋 Soy Nico, tu asistente en GR Autos. ¿En qué te puedo ayudar? ¿Buscas algún vehículo en particular o quieres vender tu auto?',
            timestamp: new Date(),
          },
        ],
      });
    } else {
      set({ isOpen: newOpen });
    }
  },

  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
          timestamp: new Date(),
        },
      ],
    })),

  setLoading: (loading) => set({ isLoading: loading }),

  sendMessage: async (content) => {
    const { addMessage, setLoading, messages, sessionId } = get();
    addMessage({ role: 'user', content });
    setLoading(true);
    try {
      const conversationHistory = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({ role: m.role, content: m.content }));
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          sessionId: sessionId || getSessionId(),
          conversationHistory,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || `HTTP ${response.status}`);
      }
      const data = await response.json();
      addMessage({ role: 'assistant', content: data.message });
    } catch (error: any) {
      addMessage({
        role: 'assistant',
        content: error.message && error.message !== 'HTTP 500'
          ? error.message
          : 'Disculpa, tuve un problema. ¿Puedes intentar de nuevo o prefieres que te conecte con un ejecutivo directamente?',
      });
    } finally {
      setLoading(false);
    }
  },
}));
