'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatStore } from '@/lib/chatbot/store';

function IconChat() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function IconSend() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

const QUICK_ACTIONS = [
  'Quiero comprar un auto',
  'Quiero vender mi auto',
  'Ver vehículos disponibles',
];

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5 bg-white border border-gray-100 shadow-sm">
        {[0, 1, 2].map((i) => (
          <span key={i} className="block w-2 h-2 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: `${i * 150}ms`, animationDuration: '0.8s' }} />
        ))}
      </div>
    </div>
  );
}

export function ChatWidget() {
  const { isOpen, toggleOpen, messages, isLoading, sendMessage } = useChatStore();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    setInput('');
    await sendMessage(trimmed);
  }, [input, isLoading, sendMessage]);

  const handleQuickAction = useCallback(async (action: string) => {
    if (isLoading) return;
    await sendMessage(action);
  }, [isLoading, sendMessage]);

  const showQuickActions = messages.length <= 2 && !isLoading;

  return (
    <>
      {/* Botón flotante */}
      <motion.button
        onClick={toggleOpen}
        className="fixed bottom-6 right-6 z-[9999] w-16 h-16 rounded-full flex items-center justify-center cursor-pointer border-none"
        style={{ backgroundColor: '#1B2A4A', color: '#fff', boxShadow: '0 8px 32px rgba(27,42,74,0.4)' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Cerrar asistente virtual' : 'Abrir asistente virtual'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <IconClose />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <IconChat />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && messages.length === 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-pulse" style={{ backgroundColor: '#EF4444' }} />
        )}
      </motion.button>

      {/* Panel de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-[9999] flex flex-col overflow-hidden"
            style={{
              width: '380px', height: '560px', maxHeight: '80vh',
              backgroundColor: '#fff', borderRadius: '16px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
            }}
          >
            {/* Header */}
            <div className="px-5 py-4 flex items-center gap-3 flex-shrink-0" style={{ backgroundColor: '#1B2A4A', color: '#fff' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>N</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm leading-tight">Nico — Asistente GR Autos</h3>
                <p className="text-xs flex items-center gap-1.5 mt-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: '#4ADE80' }} />
                  En línea
                </p>
              </div>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ background: 'linear-gradient(to bottom, #F9FAFB, #FFFFFF)' }}>
              {messages.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[80%] px-4 py-2.5 text-sm leading-relaxed"
                    style={msg.role === 'user'
                      ? { backgroundColor: '#1B2A4A', color: '#fff', borderRadius: '16px 16px 4px 16px' }
                      : { backgroundColor: 'rgba(255,255,255,0.9)', color: '#1F2937', borderRadius: '16px 16px 16px 4px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }
                    }>
                    {msg.content.split('\n').map((line, i) => (
                      <p key={i} className={i > 0 ? 'mt-1.5' : ''}>
                        {line.split(/(\*\*.*?\*\*)/).map((part, j) =>
                          part.startsWith('**') && part.endsWith('**')
                            ? <strong key={j} className="font-semibold">{part.slice(2, -2)}</strong>
                            : <span key={j}>{part}</span>
                        )}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
              {isLoading && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><TypingIndicator /></motion.div>}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick actions */}
            {showQuickActions && (
              <div className="px-4 pb-2 flex flex-wrap gap-2 flex-shrink-0">
                {QUICK_ACTIONS.map((action) => (
                  <button key={action} onClick={() => handleQuickAction(action)} disabled={isLoading}
                    className="text-xs px-3 py-1.5 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-gray-50"
                    style={{ border: '1px solid rgba(27,42,74,0.2)', color: '#1B2A4A', backgroundColor: 'transparent' }}>
                    {action}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 flex-shrink-0" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <div className="flex gap-2 items-center">
                <input ref={inputRef} type="text" value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  placeholder="Escribe tu mensaje..." disabled={isLoading}
                  className="flex-1 text-sm px-4 py-2.5 rounded-full outline-none disabled:opacity-50 focus:ring-2 focus:ring-blue-500/30"
                  style={{ backgroundColor: '#F3F4F6', border: 'none', color: '#1F2937' }} />
                <button onClick={handleSend} disabled={isLoading || !input.trim()}
                  className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed border-none"
                  style={{ backgroundColor: '#1B2A4A', color: '#fff' }}>
                  <IconSend />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
