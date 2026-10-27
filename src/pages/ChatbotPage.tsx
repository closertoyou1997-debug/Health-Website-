import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { useToast } from '../context/ToastContext';
import {
  Bot,
  Send,
  Sparkles,
  RotateCcw,
  Volume2,
  VolumeX,
  Copy,
  Download,
  AlertTriangle,
  PhoneCall,
  ShieldCheck,
  Check,
  ArrowRight,
  Info,
  Loader2,
  Clock,
  HeartPulse,
} from 'lucide-react';

interface ChatbotPageProps {
  openEmergencyModal: () => void;
}

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome-init',
  role: 'assistant',
  content: `Hello! I am **MediCare Assistant**, your evidence-based health education and daily wellness companion.

Here are a few ways I can assist you:
• **Translate Clinical Jargon:** Ask me to simplify terms like *hypertension, HbA1c, dyspnea, or lipid profiles*.
• **Daily Habit Protocols:** Guidance on optimal hydration targets, sleep hygiene, and balanced nutrition.
• **Preventive Wellness:** Understanding why annual checkups, daily movement, and stress regulation matter.

⚠️ **Important Safeguard:** I provide general educational information only. I cannot diagnose illnesses, prescribe medications, or replace the care of licensed physicians. If you are experiencing acute severe symptoms, please contact emergency medical services immediately.

*What health topic or wellness question can we explore today?*`,
  timestamp: 'Just now',
};

const CATEGORIZED_QUESTIONS = [
  {
    category: 'Nutrition & Gut',
    queries: [
      'What are the essentials of a heart-healthy diet?',
      'How does dietary fiber support gut-brain communication?',
      'Simple strategies to reduce ultra-processed food intake',
    ],
  },
  {
    category: 'Circadian Sleep',
    queries: [
      'What habits improve deep slow-wave sleep?',
      'Why is morning sunlight exposure so crucial for melatonin?',
      'How does late caffeine affect sleep architecture?',
    ],
  },
  {
    category: 'Vitals & Terms',
    queries: [
      'Explain what systolic and diastolic blood pressure mean',
      'What does a resting heart rate between 60-100 bpm signify?',
      'What is the difference between LDL and HDL cholesterol?',
    ],
  },
  {
    category: 'Daily Movement',
    queries: [
      'How much weekly exercise is recommended for cardiovascular health?',
      'Effective ways to break up prolonged sedentary desk time',
      'Tips for safe physical activity for beginners',
    ],
  },
];

export const ChatbotPage: React.FC<ChatbotPageProps> = ({ openEmergencyModal }) => {
  const { showToast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [hasEmergencyWarning, setHasEmergencyWarning] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = (customPrompt || input).trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          messages: messages.slice(-6),
        }),
      });

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        role: 'assistant',
        content: data.text || 'Thank you for your inquiry. Maintaining healthy daily routines is the foundation of preventive wellness.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isEmergency: data.isEmergency,
        modelUsed: data.modelUsed || 'gemini-3.8-flash',
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (data.isEmergency) {
        setHasEmergencyWarning(true);
        showToast({
          type: 'warning',
          title: 'Emergency Advisory Triggered',
          message: 'Potential acute symptoms noted. Please call emergency services if urgent.',
        });
      }
    } catch (err: any) {
      console.error('Error contacting AI Assistant:', err);
      const fallbackMessage: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        role: 'assistant',
        content: `I am currently operating in offline educational mode. For any personal medical symptoms, always reach out to a registered physician or your local clinic.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeech = (text: string, msgId: string) => {
    if (!('speechSynthesis' in window)) {
      showToast({
        type: 'info',
        title: 'Speech Unavailable',
        message: 'Your browser does not support Web Speech synthesis.',
      });
      return;
    }

    if (activeSpeechId === msgId) {
      window.speechSynthesis.cancel();
      setActiveSpeechId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown stars before reading
    const cleanText = text.replace(/[*#_~`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setActiveSpeechId(null);
    utterance.onerror = () => setActiveSpeechId(null);

    setActiveSpeechId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    showToast({
      type: 'success',
      title: 'Copied to Clipboard',
      message: 'Health guidance response copied.',
    });
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleExportChat = () => {
    const formatted = messages
      .map((m) => `[${m.timestamp}] ${m.role.toUpperCase()}:\n${m.content}\n`)
      .join('\n---\n\n');
    const blob = new Blob([formatted], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medicare-chat-session-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast({
      type: 'success',
      title: 'Session Exported',
      message: 'Chat history downloaded as text file.',
    });
  };

  const handleReset = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setMessages([INITIAL_WELCOME_MESSAGE]);
    setHasEmergencyWarning(false);
    showToast({
      type: 'info',
      title: 'Chat Cleared',
      message: 'Conversation restarted with a clean session.',
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#102A43] via-[#0D9488] to-[#102A43] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
            <Bot className="w-8 h-8 text-[#67E8F9]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">MediCare Assistant</h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/40 uppercase tracking-wide">
                Online • Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-xs sm:text-sm text-teal-100 mt-1 max-w-xl">
              An evidence-based conversational companion explaining health concepts, wellness habits, and preventive care principles in simple everyday language.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 self-end md:self-center">
          <button
            onClick={handleExportChat}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/15 flex items-center gap-1.5 transition-colors"
            title="Download Chat History"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Chat</span>
          </button>
          <button
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/15 flex items-center gap-1.5 transition-colors"
            title="Clear Chat Session"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Prominent Medical Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          <span className="font-bold">Medical Notice:</span> MediCare AI provides general health education and is not a substitute for professional medical advice, diagnosis, or treatment. Never disregard medical advice or delay seeking medical care because of something you have read here.
        </div>
      </div>

      {/* Emergency Alert if triggered */}
      {hasEmergencyWarning && (
        <div className="p-4 rounded-2xl bg-rose-600 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg animate-in fade-in">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0 text-amber-300 mt-0.5 animate-bounce" />
            <div>
              <h4 className="text-sm font-bold">Suspected Emergency Symptoms Detected</h4>
              <p className="text-xs text-rose-100 mt-0.5">
                If you are experiencing severe difficulty breathing, crushing chest pain, slurred speech, or heavy bleeding, please call emergency services immediately.
              </p>
            </div>
          </div>
          <button
            onClick={openEmergencyModal}
            className="px-4 py-2 rounded-xl bg-white text-rose-700 text-xs font-bold uppercase tracking-wider hover:bg-rose-50 shadow-md transition-colors shrink-0 flex items-center gap-1.5"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Emergency Contacts</span>
          </button>
        </div>
      )}

      {/* Chat Layout: Suggestions Sidebar & Chat Window */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Suggested Questions Drawer */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Suggested Health Inquiries
              </h3>
            </div>

            <div className="space-y-4">
              {CATEGORIZED_QUESTIONS.map((group, idx) => (
                <div key={idx} className="space-y-1.5">
                  <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wide">
                    {group.category}
                  </span>
                  <div className="space-y-1">
                    {group.queries.map((q, qIdx) => (
                      <button
                        key={qIdx}
                        onClick={() => handleSend(q)}
                        disabled={isLoading}
                        className="w-full text-left p-2 rounded-xl text-xs text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-950/40 hover:text-teal-700 dark:hover:text-teal-300 border border-transparent hover:border-teal-200 dark:hover:border-teal-900 transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span className="line-clamp-2">{q}</span>
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-teal-500 shrink-0 ml-1 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Conversation Stream */}
        <div className="lg:col-span-8 flex flex-col h-[650px] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {/* Scrollable Message List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {msg.role === 'user' ? 'You' : 'MediCare Assistant'}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {msg.timestamp}
                  </span>
                </div>

                <div
                  className={`relative group max-w-[90%] sm:max-w-[80%] rounded-2xl p-4 sm:p-5 shadow-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-[#102A43] to-[#0D9488] text-white rounded-tr-none'
                      : msg.isEmergency
                      ? 'bg-rose-50 dark:bg-rose-950/70 border-2 border-rose-400 dark:border-rose-800 text-rose-950 dark:text-rose-100 rounded-tl-none'
                      : 'bg-slate-50 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700/80'
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed text-xs sm:text-[13px]">
                    {msg.content}
                  </div>

                  {/* Assistant Message Actions (TTS + Copy) */}
                  {msg.role === 'assistant' && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-slate-400">
                      <span className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">
                        {msg.modelUsed || 'AI Health Companion'}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSpeech(msg.content, msg.id)}
                          className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-500 dark:text-slate-400"
                          title={activeSpeechId === msg.id ? 'Stop speaking' : 'Read aloud'}
                          aria-label={activeSpeechId === msg.id ? 'Stop audio' : 'Read aloud'}
                        >
                          {activeSpeechId === msg.id ? (
                            <VolumeX className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 animate-pulse" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleCopy(msg.content, msg.id)}
                          className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-500 dark:text-slate-400"
                          title="Copy response"
                          aria-label="Copy text"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-3 p-4 rounded-2xl rounded-tl-none bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 max-w-sm">
                <Loader2 className="w-4 h-4 animate-spin text-teal-600 dark:text-teal-400" />
                <span className="text-xs font-medium">MediCare Assistant is synthesizing medical information...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a health or wellness question (e.g. 'How much water should I drink?')"
              className="flex-1 text-xs sm:text-sm px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#102A43] via-[#0D9488] to-[#0F766E] text-white text-xs sm:text-sm font-semibold shadow-md shadow-teal-900/20 hover:shadow-teal-900/40 disabled:opacity-40 transition-all flex items-center gap-2 cursor-pointer"
              aria-label="Send message"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
