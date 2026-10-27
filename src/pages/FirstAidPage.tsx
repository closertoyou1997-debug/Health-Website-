import React, { useState } from 'react';
import { FirstAidTopic } from '../types';
import { FIRST_AID_TOPICS, EMERGENCY_NUMBERS } from '../data/healthData';
import { useToast } from '../context/ToastContext';
import {
  HeartPulse,
  PhoneCall,
  AlertOctagon,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  ChevronDown,
  ChevronUp,
  Brain,
  Wind,
  Heart,
  Flame,
  Sun,
  Activity,
  ArrowRight,
} from 'lucide-react';

interface FirstAidPageProps {
  openEmergencyModal: () => void;
}

export const FirstAidPage: React.FC<FirstAidPageProps> = ({ openEmergencyModal }) => {
  const { showToast } = useToast();
  const [expandedId, setExpandedId] = useState<string>('fa-breathing');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical' | 'urgent' | 'moderate'>('all');

  const filteredTopics = FIRST_AID_TOPICS.filter((t) =>
    filterSeverity === 'all' ? true : t.severity === filterSeverity
  );

  const handlePrint = () => {
    window.print();
  };

  const getTopicIcon = (icon: string) => {
    switch (icon) {
      case 'Wind':
        return <Wind className="w-5 h-5 text-rose-500" />;
      case 'Brain':
        return <Brain className="w-5 h-5 text-rose-500" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-rose-500" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5 text-rose-500" />;
      case 'AlertCircle':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-amber-500" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-5 h-5 text-rose-500" />;
      case 'Sun':
        return <Sun className="w-5 h-5 text-amber-500" />;
      default:
        return <HeartPulse className="w-5 h-5 text-rose-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Red Emergency Header Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-700 to-red-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md shrink-0">
            <AlertOctagon className="w-8 h-8 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                First Aid & Rapid Emergency Protocols
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wide">
                Urgent Action
              </span>
            </div>
            <p className="text-xs sm:text-sm text-rose-100 mt-1 max-w-2xl leading-relaxed">
              Clear, step-by-step instructions for acute situations and minor injuries. Understand when to contact emergency services immediately versus when basic bystander first aid is appropriate.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end md:self-center">
          <button
            onClick={openEmergencyModal}
            className="px-5 py-3 rounded-2xl bg-white text-rose-700 hover:bg-rose-50 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call 911 / 112 Hotlines</span>
          </button>
          <button
            onClick={handlePrint}
            className="p-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white transition-colors"
            title="Print Emergency Guide"
            aria-label="Print guide"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Emergency Decision Tree Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-lg space-y-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold tracking-tight text-white">
            Rapid Triage Rule: When to Call 911 Immediately
          </h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Always call emergency services (911 in US/Canada, 112 in EU, 999 in UK) first before initiating treatment if you observe any of the following critical red flags:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-800/80 text-xs">
            <span className="font-bold text-rose-300 block mb-1">1. Severe Breathing Distress</span>
            <span className="text-slate-300 text-[11px]">Gasping, unable to speak, blue lips or fingertips.</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-800/80 text-xs">
            <span className="font-bold text-rose-300 block mb-1">2. Suspected Acute Stroke</span>
            <span className="text-slate-300 text-[11px]">Sudden facial droop, arm weakness, slurred speech (FAST).</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-800/80 text-xs">
            <span className="font-bold text-rose-300 block mb-1">3. Uncontrollable Bleeding</span>
            <span className="text-slate-300 text-[11px]">Spurting or continuous bleeding soaking through multiple dressings.</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-800/80 text-xs">
            <span className="font-bold text-rose-300 block mb-1">4. Unconsciousness / Arrest</span>
            <span className="text-slate-300 text-[11px]">Unresponsive and not breathing normally. Start CPR immediately.</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'All Emergency Procedures' },
          { id: 'critical', label: '🔴 Critical Emergencies (Call 911)' },
          { id: 'urgent', label: '🟠 Urgent Interventions' },
          { id: 'moderate', label: '🟡 Minor Injuries & First Aid' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterSeverity(tab.id as any)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              filterSeverity === tab.id
                ? 'bg-[#102A43] dark:bg-teal-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Accordion / Cards List */}
      <div className="space-y-4">
        {filteredTopics.map((topic) => {
          const isExpanded = expandedId === topic.id;
          let severityBadge = (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300">
              Urgent First Aid
            </span>
          );
          if (topic.severity === 'critical') {
            severityBadge = (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-300 animate-pulse">
                Critical Emergency (911)
              </span>
            );
          } else if (topic.severity === 'moderate') {
            severityBadge = (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border border-teal-300">
                Bystander Protocol
              </span>
            );
          }

          return (
            <div
              key={topic.id}
              className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'bg-white dark:bg-slate-900 border-teal-500/60 shadow-lg ring-1 ring-teal-500/30'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 shadow-sm'
              }`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => setExpandedId(isExpanded ? '' : topic.id)}
                className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer"
                aria-expanded={isExpanded}
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 shrink-0 mt-1 sm:mt-0">
                    {getTopicIcon(topic.icon)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {topic.title}
                      </h3>
                      {severityBadge}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {topic.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="p-2 rounded-xl text-slate-400 hover:text-slate-600 shrink-0">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Accordion Expanded Content */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-6 text-xs sm:text-sm">
                  {/* Emergency Warning Strip */}
                  {topic.emergencyWarning && (
                    <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-950 dark:text-rose-100 flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      <div className="text-xs leading-relaxed font-medium">
                        <strong>Urgent Directive:</strong> {topic.emergencyWarning}
                      </div>
                    </div>
                  )}

                  {/* Immediate Step-by-Step Action Plan */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                      <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                      Immediate Action Steps:
                    </h4>

                    <div className="space-y-2">
                      {topic.immediateSteps.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3"
                        >
                          <span className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {sIdx + 1}
                          </span>
                          <span className="text-xs sm:text-[13px] text-slate-800 dark:text-slate-200 leading-relaxed">
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* DOs and DON'Ts Dual Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {/* DOs */}
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        DO:
                      </h4>
                      <ul className="space-y-1.5 text-xs text-emerald-950 dark:text-emerald-100">
                        {topic.dos.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* DONTs */}
                    <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                        DO NOT:
                      </h4>
                      <ul className="space-y-1.5 text-xs text-rose-950 dark:text-rose-100">
                        {topic.donts.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-rose-600 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Emergency Contacts Directory */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <PhoneCall className="w-4 h-4 text-rose-600" />
          Emergency Hotline Reference Table
        </h3>
        <p className="text-xs text-slate-500">
          Save these verified emergency response lines into your mobile phone contacts for immediate access during critical health incidents.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {EMERGENCY_NUMBERS.map((num, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  {num.region}
                </span>
                <span className="text-[11px] text-slate-500">{num.desc}</span>
              </div>
              <a
                href={`tel:${num.number.replace(/-/g, '')}`}
                className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold tracking-wider shadow-sm flex items-center gap-1"
              >
                {num.number}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
