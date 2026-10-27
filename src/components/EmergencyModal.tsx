import React from 'react';
import { EMERGENCY_NUMBERS } from '../data/healthData';
import { PageTab } from '../types';
import { AlertOctagon, PhoneCall, X, ShieldAlert, ArrowRight, HeartPulse, Activity } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToFirstAid: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  onNavigateToFirstAid,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-2 border-rose-500 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Urgent Header */}
        <div className="bg-gradient-to-r from-rose-600 to-red-700 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <AlertOctagon className="w-6 h-6 text-white animate-bounce" />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight">Emergency Assistance & Rapid Triage</h3>
              <p className="text-xs text-rose-100">
                If someone’s life is in immediate danger, do not wait. Call emergency services now.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close emergency modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Immediate Dispatch Numbers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-rose-600" />
              Direct Emergency Hotlines
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EMERGENCY_NUMBERS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between hover:border-rose-300 transition-colors"
                >
                  <div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                      {item.region}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {item.desc}
                    </span>
                  </div>
                  <a
                    href={`tel:${item.number.replace(/-/g, '')}`}
                    className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold tracking-wider shadow-sm flex items-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    {item.number}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Red-Flag Conditions */}
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 mb-2 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              Call Emergency Immediately (911 / 112) If You Notice:
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-rose-900 dark:text-rose-200">
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>Crushing chest pain or pressure radiating to left arm or jaw.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>Sudden face drooping, one-sided arm weakness, or slurred speech (Stroke).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>Severe respiratory distress, wheezing, or lips turning blue.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>Heavy uncontrolled spurting blood or loss of consciousness.</span>
              </li>
            </ul>
          </div>

          {/* Action Navigation */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                onClose();
                onNavigateToFirstAid();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#102A43] to-[#0D9488] text-white text-xs font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <HeartPulse className="w-4 h-4 text-cyan-300" />
              <span>Open Step-by-Step First Aid Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
