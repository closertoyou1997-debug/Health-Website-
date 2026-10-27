import React from 'react';
import { PageTab } from '../types';
import {
  Info,
  ShieldCheck,
  Bot,
  Activity,
  HeartPulse,
  Lock,
  Database,
  Cpu,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

interface AboutPageProps {
  setActiveTab: (tab: PageTab) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setActiveTab }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#102A43] via-[#0D9488] to-[#102A43] rounded-3xl p-6 sm:p-10 text-white shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-cyan-200">
          <GraduationCap className="w-4 h-4" />
          <span>University Computer Science Capstone Demonstration</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          About MediCare AI — Purpose, Architecture & Ethics
        </h1>

        <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
          MediCare AI is a technology demonstration created to showcase how modern full-stack web engineering, responsible generative AI guardrails, and responsive client-side architectures can democratize health literacy and daily wellness habits.
        </p>
      </div>

      {/* Project Mission & Purpose */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Project Purpose & Objectives
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            The objective of MediCare AI is to address three prominent challenges in contemporary digital health tools:
          </p>

          <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
              <span>
                <strong>Complex Medical Terminology:</strong> Translating esoteric clinical terms (such as hypertension, HbA1c, and lipid panels) into friendly, layman-accessible language.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
              <span>
                <strong>Behavioral Habit Consistency:</strong> Providing friction-free daily logging for hydration, sleep, exercise, and mood with transparent, local data persistence.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
              <span>
                <strong>Emergency Triage Awareness:</strong> Ensuring users immediately recognize acute warning signs (chest pain, stroke symptoms, acute shortness of breath) and are directed to professional emergency services without delay.
              </span>
            </li>
          </ul>
        </div>

        {/* Technical Architecture */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Technical Architecture & Stack
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Built as a modern full-stack web application designed for responsive performance across desktop, tablet, and mobile browsers:
          </p>

          <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
              <span className="font-semibold">Frontend Framework:</span>
              <span className="text-slate-500">React 19 + TypeScript (Vite 8)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
              <span className="font-semibold">Styling Engine:</span>
              <span className="text-slate-500">Tailwind CSS (Deep Navy & Medical Teal theme)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
              <span className="font-semibold">AI Integration:</span>
              <span className="text-slate-500">Google Gemini 3.8 Flash via Server-Side SDK</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
              <span className="font-semibold">Backend Proxy:</span>
              <span className="text-slate-500">Express 4 with secure API key shielding</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
              <span className="font-semibold">Storage Architecture:</span>
              <span className="text-slate-500">Browser LocalStorage (Zero-tracking)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy & Data Storage Transparency */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Database className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Transparent Data Privacy Architecture
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          In strict adherence to ethical digital health principles, MediCare AI implements a client-centric privacy model:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <Lock className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Local-Only Storage</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Your daily water logs, sleep records, mood entries, and reminders are stored exclusively inside your browser’s local storage. They are never synchronized to external databases.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <ShieldCheck className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Secure Server AI Proxy</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Chat queries are forwarded through our secure server-side endpoint. API keys are shielded from client-side inspection, and requests are not indexed for advertising profiles.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <HeartPulse className="w-5 h-5 text-rose-500" />
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">User Control & Reset</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              You maintain total autonomy over your data. You can clear your chat session or reset all logged habit entries at any moment with a single click.
            </p>
          </div>
        </div>
      </div>

      {/* Medical Boundaries & Disclaimer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-3">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
          <h3 className="text-base font-bold text-amber-950 dark:text-amber-200">
            Medical & Clinical Boundaries Declaration
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
          MediCare AI is programmed with stringent clinical safety directives:
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-amber-950 dark:text-amber-200">
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>Does not formulate clinical diagnoses or suggest differential diagnostics.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>Never prescribes medications, alters therapeutic regimens, or suggests unverified off-label therapies.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>Never guarantees treatment outcomes or replaces physician consultations.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>Immediately refers emergent symptoms to 911 / 112 / 999 emergency services.</span>
          </li>
        </ul>
      </div>

      {/* CTA Navigation to other modules */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Ready to Explore MediCare AI?
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Begin with the AI health companion, log today's wellness habits, or browse evidence-based guides.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setActiveTab('assistant');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Bot className="w-4 h-4" />
            <span>Chat with Assistant</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
