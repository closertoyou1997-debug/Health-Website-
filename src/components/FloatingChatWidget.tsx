import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, PageTab } from '../types';
import {
  Bot,
  X,
  Send,
  Sparkles,
  AlertTriangle,
  RotateCcw,
  Maximize2,
  PhoneCall,
  Loader2,
  HeartPulse,
} from 'lucide-react';

interface FloatingChatWidgetProps {
  onNavigateToAssistant: () => void;
  openEmergencyModal: () => void;
}

const INITIAL_WELCOME: ChatMessage = {
  id: 'welcome-1',
  role: 'assistant',
  content: `Hello! I'm **MediCare Assistant**, your personal health and wellness companion.

I can help explain medical terms in plain language, share evidence-based sleep and nutrition habits, suggest hydration guidelines, and discuss preventive wellness routines.

*How can I support your health journey today?*`,
  timestamp: 'Just now',
};

const SUGGESTIONS = [
  'How much water should I drink daily?',
  'Tips for better sleep hygiene',
  'Explain blood pressure numbers',
  'Signs of heat exhaustion vs heat stroke',
];

export const FloatingChatWidget: React.FC<FloatingChatWidgetProps> = ({
  onNavigateToAssistant,
  openEmergencyModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasEmergencyWarning, setHasEmergencyWarning] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || input).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          messages: messages.slice(-5),
        }),
      });

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: Math.random().toString(),
        role: 'assistant',
        content: data.text || 'Thank you for your question. Maintaining balanced daily habits is vital for long-term health.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isEmergency: data.isEmergency,
        modelUsed: data.modelUsed,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      if (data.isEmergency) {
        setHasEmergencyWarning(true);
      }
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: Math.random().toString(),
        role: 'assistant',
        content: `I am currently operating in offline educational mode. For any acute health concern, always consult your physician or local healthcare clinic.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([INITIAL_WELCOME]);
    setHasEmergencyWarning(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-[#102A43] via-[#0D9488] to-[#0B7285] text-white shadow-xl shadow-teal-900/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-teal-400/40"
          aria-label="Open MediCare AI Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-[#67E8F9] group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#102A43] animate-pulse" />
          </div>
          <span className="text-sm font-semibold tracking-wide hidden sm:inline">
            Chat with Assistant
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white uppercase tracking-wider">
            AI
          </span>
        </button>
      )}

      {/* Expanded Chat Drawer */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[410px] h-[580px] max-h-[85vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-[#102A43] to-[#0D9488] text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Bot className="w-5 h-5 text-[#67E8F9]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold tracking-tight">MediCare Assistant</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <p className="text-[10px] text-teal-100 flex items-center gap-1">
                  <span>Gemini 3.8 Flash</span> • <span>Evidence-Based</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                title="Reset conversation"
                aria-label="Reset chat"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onNavigateToAssistant();
                }}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                title="Expand to Full Page"
                aria-label="Expand to full page"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close chat window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Medical Disclaimer Banner */}
          <div className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900/40 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-amber-800 dark:text-amber-200">
            <span className="truncate">
              General education only. Not medical advice or diagnosis.
            </span>
            <button
              onClick={openEmergencyModal}
              className="text-rose-600 dark:text-rose-400 font-bold hover:underline shrink-0 ml-2 flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" />
              911
            </button>
          </div>

          {/* Emergency Alert if triggered */}
          {hasEmergencyWarning && (
            <div className="p-3 bg-rose-500 text-white text-xs flex items-center justify-between gap-2 shadow-md">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 animate-bounce" />
                <span>Suspected Emergency Symptoms detected.</span>
              </div>
              <button
                onClick={openEmergencyModal}
                className="px-2.5 py-1 rounded bg-white text-rose-700 font-bold hover:bg-rose-50 text-[11px] uppercase"
              >
                Hotlines
              </button>
            </div>
          )}

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-[#102A43] to-[#0D9488] text-white rounded-tr-none'
                      : msg.isEmergency
                      ? 'bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100 rounded-tl-none'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700/60'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-none p-3.5 max-w-[70%] border border-slate-200 dark:border-slate-700">
                <Loader2 className="w-4 h-4 animate-spin text-teal-500" />
                <span className="text-xs">Generating health guidance...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions if fewer than 3 messages */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex gap-1.5 overflow-x-auto pb-2">
              {SUGGESTIONS.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(s)}
                  className="shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-500 hover:text-teal-600 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about hydration, sleep, medical terms..."
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white transition-colors cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
