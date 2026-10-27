import React, { useState } from 'react';
import { PageTab, DailyLog } from '../types';
import {
  HeartPulse,
  Bot,
  Activity,
  BookOpen,
  Bell,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Droplets,
  Moon,
  Flame,
  CheckCircle2,
  Clock,
  PhoneCall,
  Smile,
  Award,
} from 'lucide-react';

interface HomePageProps {
  setActiveTab: (tab: PageTab) => void;
  openEmergencyModal: () => void;
  todayLog: DailyLog;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActiveTab,
  openEmergencyModal,
  todayLog,
}) => {
  // Mini interactive Wellness Quiz state
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [waterChoice, setWaterChoice] = useState<number>(2);
  const [sleepChoice, setSleepChoice] = useState<number>(2);
  const [activityChoice, setActivityChoice] = useState<number>(2);

  const calculateQuiz = () => {
    const total = Math.round(((waterChoice + sleepChoice + activityChoice) / 9) * 100);
    setQuizScore(total);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-20 bg-gradient-to-b from-[#F0F7FA] via-white to-white dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 rounded-b-[2.5rem] border-b border-slate-200/80 dark:border-slate-800">
        {/* Abstract Background Orbs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-teal-400/15 via-cyan-400/15 to-blue-400/10 blur-3xl -z-10 pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-teal-200 dark:border-teal-800/60 shadow-sm text-xs font-semibold text-teal-800 dark:text-teal-300">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                <span>Next-Generation Healthcare Technology Demonstration</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#102A43] dark:text-white leading-[1.15]">
                Your Health.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0D9488] to-[#0284C7]">
                  Your Habits.
                </span>{' '}
                <br className="hidden sm:inline" />
                Your Wellbeing.
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[#243447]/80 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                MediCare AI combines intelligent health education, evidence-based habit tracking, and responsive first-aid guidance. Build lasting wellness routines and understand your body with clarity.
              </p>

              {/* Primary Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => {
                    setActiveTab('assistant');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#102A43] via-[#0D9488] to-[#0F766E] text-white font-semibold text-sm shadow-xl shadow-teal-900/20 hover:shadow-teal-900/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer group"
                >
                  <Bot className="w-5 h-5 text-[#67E8F9] group-hover:rotate-12 transition-transform" />
                  <span>Chat with AI Assistant</span>
                  <ArrowRight className="w-4 h-4 text-teal-200 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    setActiveTab('tracker');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 text-[#102A43] dark:text-white font-semibold text-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Activity className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>Explore Wellness Tools</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>Zero-tracking local storage</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HeartPulse className="w-4 h-4 text-rose-500" />
                  <span>Evidence-based clinical guidelines</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Gemini 3.8 Flash AI Model</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Health Snapshot Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200/90 dark:border-slate-700/80 backdrop-blur-xl">
                {/* Header of Snapshot */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700/60">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Today’s Health Snapshot
                      </h3>
                      <p className="text-[11px] text-slate-400">Real-time daily wellness metrics</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    Active Today
                  </span>
                </div>

                {/* 3 Metric Progress Rows */}
                <div className="space-y-4 py-5">
                  {/* Water */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                        <Droplets className="w-3.5 h-3.5 text-cyan-500" />
                        Hydration
                      </span>
                      <span className="font-bold text-cyan-600 dark:text-cyan-400">
                        {todayLog.waterGlasses} / 8 Glasses ({(todayLog.waterGlasses * 250) / 1000}L)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-teal-500 transition-all duration-500"
                        style={{ width: `${Math.min(100, (todayLog.waterGlasses / 8) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Sleep */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                        <Moon className="w-3.5 h-3.5 text-indigo-500" />
                        Restorative Sleep
                      </span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">
                        {todayLog.sleepHours} hrs / 8.0 hrs goal
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 transition-all duration-500"
                        style={{ width: `${Math.min(100, (todayLog.sleepHours / 8) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Movement */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                        Physical Movement
                      </span>
                      <span className="font-bold text-amber-600 dark:text-amber-400">
                        {todayLog.exerciseMinutes} min / 30 min goal
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-rose-500 transition-all duration-500"
                        style={{ width: `${Math.min(100, (todayLog.exerciseMinutes / 30) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Action Link */}
                <button
                  onClick={() => {
                    setActiveTab('tracker');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/60 dark:hover:bg-teal-900/60 text-teal-800 dark:text-teal-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Open Full Tracker & 7-Day Charts</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Comprehensive Health Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            Engineered for Everyday Wellness
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Explore 4 core functional modules designed to support physical vitality, health literacy, and peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: AI Assistant */}
          <div
            onClick={() => setActiveTab('assistant')}
            className="group p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                AI Health Assistant
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Powered by Gemini 3.8 Flash. Translates confusing medical terminology, recommends sleep and nutrition habits, and detects emergency warning signs.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-semibold text-teal-600 dark:text-teal-400 gap-1">
              <span>Start Consulting</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Wellness Tracker */}
          <div
            onClick={() => setActiveTab('tracker')}
            className="group p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                Daily Wellness Tracker
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Log water glasses, sleep duration, exercise minutes, and mood. View progress meters, 7-day trend history, and customize baseline goals.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-semibold text-cyan-600 dark:text-cyan-400 gap-1">
              <span>View Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Health Library */}
          <div
            onClick={() => setActiveTab('library')}
            className="group p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Health Education Library
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Peer-reviewed guides across 8 critical domains: circadian sleep, gut nutrition, hydration physiology, stress buffering, and hygiene protocols.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 gap-1">
              <span>Read Guides</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: First Aid */}
          <div
            onClick={() => setActiveTab('firstaid')}
            className="group p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                First Aid & Emergency
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Step-by-step triage for respiratory distress, stroke (F.A.S.T.), heavy bleeding, Hands-Only CPR, choking, anaphylaxis, and burns.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-semibold text-rose-600 dark:text-rose-400 gap-1">
              <span>Review Procedures</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Quick Wellness Check Widget */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#102A43] to-[#0A3D62] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#67E8F9]">
                Interactive Assessment
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Check Your Daily Wellness Quotient
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Answer 3 quick questions about your hydration, sleep, and physical activity today to calculate an instant demonstration wellness score.
              </p>

              <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  <span>Instant feedback</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  <span>No sign-up required</span>
                </div>
              </div>
            </div>

            {/* Questions Form */}
            <div className="lg:col-span-6 bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10 space-y-4">
              {/* Question 1 */}
              <div>
                <label className="text-xs font-semibold text-slate-200 block mb-2">
                  1. How much water have you consumed today?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: '< 4 glasses', value: 1 },
                    { label: '5-7 glasses', value: 2 },
                    { label: '8+ glasses', value: 3 },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setWaterChoice(opt.value)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-medium transition-all ${
                        waterChoice === opt.value
                          ? 'bg-teal-500 text-white font-bold shadow-md shadow-teal-500/30'
                          : 'bg-white/10 text-slate-200 hover:bg-white/20'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div>
                <label className="text-xs font-semibold text-slate-200 block mb-2">
                  2. How many hours did you sleep last night?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: '< 6 hours', value: 1 },
                    { label: '6-7 hours', value: 2 },
                    { label: '7-9 hours', value: 3 },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setSleepChoice(opt.value)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-medium transition-all ${
                        sleepChoice === opt.value
                          ? 'bg-teal-500 text-white font-bold shadow-md shadow-teal-500/30'
                          : 'bg-white/10 text-slate-200 hover:bg-white/20'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              <div>
                <label className="text-xs font-semibold text-slate-200 block mb-2">
                  3. Total moderate physical movement today?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: '< 15 mins', value: 1 },
                    { label: '15-30 mins', value: 2 },
                    { label: '30+ mins', value: 3 },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setActivityChoice(opt.value)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-medium transition-all ${
                        activityChoice === opt.value
                          ? 'bg-teal-500 text-white font-bold shadow-md shadow-teal-500/30'
                          : 'bg-white/10 text-slate-200 hover:bg-white/20'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Result display */}
              <div className="pt-2">
                {quizScore === null ? (
                  <button
                    onClick={calculateQuiz}
                    className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-[#102A43] font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Calculate Wellness Score
                  </button>
                ) : (
                  <div className="p-3.5 rounded-xl bg-teal-950/80 border border-teal-400/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-teal-300 uppercase tracking-wider block">
                        Estimated Wellness Quotient
                      </span>
                      <span className="text-xl font-extrabold text-white">
                        {quizScore}% — {quizScore >= 80 ? 'Optimal Habits! 🌟' : quizScore >= 60 ? 'Solid Routine 👍' : 'Room to Hydrate & Rest 🌱'}
                      </span>
                    </div>
                    <button
                      onClick={() => setQuizScore(null)}
                      className="text-xs text-teal-300 hover:text-white underline"
                    >
                      Recalculate
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Guidance Ribbon */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-3xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-rose-600 text-white rounded-2xl shadow-md shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-rose-950 dark:text-rose-100">
                Experiencing Acute or Severe Medical Symptoms?
              </h3>
              <p className="text-xs text-rose-800/90 dark:text-rose-300 mt-1 max-w-2xl leading-relaxed">
                If you or someone around you has difficulty breathing, crushing chest pain, slurred speech, or uncontrollable bleeding, immediately call local emergency services (911 / 112 / 999).
              </p>
            </div>
          </div>
          <button
            onClick={openEmergencyModal}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>Emergency Action & Contacts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
