import React from 'react';
import { PageTab } from '../types';
import { HeartPulse, ShieldAlert, BookOpen, Bot, Activity, Phone, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: PageTab) => void;
  openEmergencyModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, openEmergencyModal }) => {
  return (
    <footer className="bg-[#102A43] text-slate-300 pt-14 pb-10 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Disclaimer Highlight Box */}
        <div className="mb-12 p-5 rounded-2xl bg-[#0B1A2A] border border-teal-500/30 shadow-inner flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">
                Medical & Clinical Responsibility Disclaimer
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mt-0.5">
                MediCare AI is an educational computer science demonstration. It provides general health education and wellness guidance and is <strong className="text-teal-300 font-semibold">NOT</strong> a substitute for professional clinical advice, diagnosis, or treatment. Never disregard medical advice or delay seeking care because of information read here.
              </p>
            </div>
          </div>
          <button
            onClick={openEmergencyModal}
            className="shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-wider bg-rose-600/90 hover:bg-rose-600 text-white rounded-xl transition-all shadow-md shadow-rose-950 flex items-center gap-2 cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            Immediate Emergency Info
          </button>
        </div>

        {/* 4 Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0D9488] to-[#67E8F9] p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#102A43] rounded-[10px] flex items-center justify-center">
                  <HeartPulse className="w-5 h-5 text-[#67E8F9]" />
                </div>
              </div>
              <span className="font-heading text-lg font-bold text-white tracking-tight">
                MediCare<span className="text-[#67E8F9]">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your Personal Health Companion. Empowering students, individuals, and families with evidence-based health education, daily habit tracking, and responsive emergency triage.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-950/60 border border-teal-800/40 text-[11px] text-teal-300">
              <Sparkles className="w-3 h-3 text-teal-400" />
              <span>University CS Demonstration Capstone</span>
            </div>
          </div>

          {/* Quick Platform Tools */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Platform Features
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => { setActiveTab('assistant'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-teal-400 transition-colors flex items-center gap-2 text-left"
                >
                  <Bot className="w-3.5 h-3.5 text-teal-400" />
                  <span>MediCare Assistant (Gemini AI)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('tracker'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-teal-400 transition-colors flex items-center gap-2 text-left"
                >
                  <Activity className="w-3.5 h-3.5 text-teal-400" />
                  <span>Daily Wellness & Habit Tracker</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('library'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-teal-400 transition-colors flex items-center gap-2 text-left"
                >
                  <BookOpen className="w-3.5 h-3.5 text-teal-400" />
                  <span>Evidence-Based Health Library</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('firstaid'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-teal-400 transition-colors flex items-center gap-2 text-left"
                >
                  <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
                  <span>First-Aid & Emergency Action Plans</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Educational Topics */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Core Wellness Domains
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-slate-200 transition-colors cursor-pointer" onClick={() => setActiveTab('library')}>
                • Circadian Sleep Hygiene & Latency
              </li>
              <li className="hover:text-slate-200 transition-colors cursor-pointer" onClick={() => setActiveTab('library')}>
                • Cellular Hydration & Electrolytes
              </li>
              <li className="hover:text-slate-200 transition-colors cursor-pointer" onClick={() => setActiveTab('library')}>
                • Whole-Food Macronutrient Balance
              </li>
              <li className="hover:text-slate-200 transition-colors cursor-pointer" onClick={() => setActiveTab('library')}>
                • Daily Aerobic & Resistance Movement
              </li>
              <li className="hover:text-slate-200 transition-colors cursor-pointer" onClick={() => setActiveTab('library')}>
                • Vagal Nerve & Stress Downregulation
              </li>
            </ul>
          </div>

          {/* Privacy & Safety Pledge */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Privacy & Data Ethics
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              All wellness logs and habits are saved exclusively in your browser’s local storage. MediCare AI does not transmit your personal records to third-party ad brokers or data warehouses.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500">
              Version 2.4.0 • Built with Google AI Studio
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MediCare AI. Academic Computer Science Project.</p>
          <div className="flex items-center gap-2">
            <span>Designed with care for human wellbeing</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
