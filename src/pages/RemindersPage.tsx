import React, { useState } from 'react';
import { HealthReminder } from '../types';
import { useToast } from '../context/ToastContext';
import {
  Bell,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Clock,
  Droplets,
  Flame,
  Moon,
  Pill,
  Sparkles,
  Volume2,
  AlertTriangle,
  Info,
  Calendar,
  ShieldCheck,
  Edit2,
  X,
} from 'lucide-react';

interface RemindersPageProps {
  reminders: HealthReminder[];
  onToggleComplete: (id: string) => void;
  onAddReminder: (reminder: Omit<HealthReminder, 'id'>) => void;
  onDeleteReminder: (id: string) => void;
  onEditReminder: (reminder: HealthReminder) => void;
}

export const RemindersPage: React.FC<RemindersPageProps> = ({
  reminders,
  onToggleComplete,
  onAddReminder,
  onDeleteReminder,
  onEditReminder,
}) => {
  const { showToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [editingReminder, setEditingReminder] = useState<HealthReminder | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<HealthReminder['category']>('water');
  const [time, setTime] = useState('09:00');
  const [frequency, setFrequency] = useState<HealthReminder['frequency']>('daily');
  const [notes, setNotes] = useState('');
  const [isPrescriptionMed, setIsPrescriptionMed] = useState(false);

  // Simulate audio chime using Web Audio API
  const playAlertChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5

      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch {
      // ignore audio context failures
    }
  };

  const handleSimulateAlert = (rem: HealthReminder) => {
    playAlertChime();
    showToast({
      type: 'info',
      title: `🔔 In-App Reminder: ${rem.title}`,
      message: `Scheduled for ${rem.time}. ${rem.notes || 'Time to complete your healthy routine!'}`,
    });
  };

  const openCreateModal = () => {
    setEditingReminder(null);
    setTitle('');
    setCategory('water');
    setTime('09:00');
    setFrequency('daily');
    setNotes('');
    setIsPrescriptionMed(false);
    setShowModal(true);
  };

  const openEditModal = (rem: HealthReminder) => {
    setEditingReminder(rem);
    setTitle(rem.title);
    setCategory(rem.category);
    setTime(rem.time);
    setFrequency(rem.frequency);
    setNotes(rem.notes || '');
    setIsPrescriptionMed(rem.isPrescriptionMedication || false);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const categoryLabels: Record<HealthReminder['category'], string> = {
      water: 'Hydration',
      activity: 'Physical Activity',
      bedtime: 'Bedtime Routine',
      wellness: 'General Wellness',
      medication: 'Prescription Medication',
    };

    if (editingReminder) {
      onEditReminder({
        ...editingReminder,
        title,
        category,
        categoryLabel: categoryLabels[category],
        time,
        frequency,
        notes,
        isPrescriptionMedication: category === 'medication' ? true : isPrescriptionMed,
      });
      showToast({
        type: 'success',
        title: 'Reminder Updated',
        message: `Updated "${title}".`,
      });
    } else {
      onAddReminder({
        title,
        category,
        categoryLabel: categoryLabels[category],
        time,
        frequency,
        completed: false,
        notes,
        isPrescriptionMedication: category === 'medication' ? true : isPrescriptionMed,
      });
      showToast({
        type: 'success',
        title: 'Reminder Created',
        message: `Scheduled "${title}" at ${time}.`,
      });
    }

    setShowModal(false);
  };

  const getCategoryIcon = (cat: HealthReminder['category']) => {
    switch (cat) {
      case 'water':
        return <Droplets className="w-4 h-4 text-cyan-500" />;
      case 'activity':
        return <Flame className="w-4 h-4 text-amber-500" />;
      case 'bedtime':
        return <Moon className="w-4 h-4 text-indigo-500" />;
      case 'medication':
        return <Pill className="w-4 h-4 text-rose-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-teal-500" />;
    }
  };

  const completedCount = reminders.filter((r) => r.completed).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#102A43] via-[#0D9488] to-[#102A43] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Health Reminder Center
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-400/20 text-teal-300 text-xs font-semibold border border-teal-400/30">
              In-Website Session Alerts
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl leading-relaxed">
            Organize daily hydration schedules, bedtime wind-downs, physical activity prompts, and physician-prescribed medication alerts.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-[#102A43] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Reminder</span>
        </button>
      </div>

      {/* In-Website Scope & Clinical Safeguards Notice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Scope banner */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-3">
          <Info className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              In-Website Reminder Notice:
            </span>{' '}
            These reminders are stored locally in your browser and operate during your active website session. They do not trigger system background push notifications when your browser is closed.
          </div>
        </div>

        {/* Prescription safeguard */}
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Medication Safeguard:</span> Reminders for medications are solely for clinician-prescribed treatments. MediCare AI never recommends drugs, adjusts dosages, or replaces professional pharmacist instructions.
          </div>
        </div>
      </div>

      {/* Overview Progress Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Today’s Daily Habit Completion
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {completedCount} of {reminders.length} tasks completed today
          </p>
        </div>

        <div className="w-full sm:w-64">
          <div className="flex items-center justify-between text-xs font-bold text-teal-600 dark:text-teal-400 mb-1.5">
            <span>Progress</span>
            <span>
              {reminders.length > 0 ? Math.round((completedCount / reminders.length) * 100) : 0}%
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-500"
              style={{
                width: `${reminders.length > 0 ? (completedCount / reminders.length) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Reminders List */}
      <div className="space-y-3">
        {reminders.map((rem) => (
          <div
            key={rem.id}
            className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              rem.completed
                ? 'bg-slate-50/80 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-75'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-teal-300 dark:hover:border-teal-700 shadow-sm'
            }`}
          >
            {/* Left: Checkbox + Title + Meta */}
            <div className="flex items-start gap-3.5 flex-1">
              <button
                onClick={() => onToggleComplete(rem.id)}
                className="mt-0.5 text-teal-600 hover:scale-110 transition-transform p-0.5 cursor-pointer"
                title={rem.completed ? 'Mark pending' : 'Mark completed'}
                aria-label={rem.completed ? 'Mark incomplete' : 'Mark complete'}
              >
                {rem.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-teal-500 fill-teal-50 dark:fill-teal-950" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-300 dark:text-slate-600 hover:text-teal-500" />
                )}
              </button>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4
                    className={`text-sm font-bold ${
                      rem.completed
                        ? 'line-through text-slate-400 dark:text-slate-500'
                        : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {rem.title}
                  </h4>

                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {getCategoryIcon(rem.category)}
                    <span>{rem.categoryLabel}</span>
                  </span>

                  {rem.isPrescriptionMedication && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                      Doctor Prescribed
                    </span>
                  )}
                </div>

                {rem.notes && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {rem.notes}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Time, Frequency & Controls */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-slate-800">
              <div className="text-right">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800 dark:text-slate-200">
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                  <span>{rem.time}</span>
                </div>
                <span className="text-[10px] text-slate-400 capitalize block">
                  {rem.frequency}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleSimulateAlert(rem)}
                  className="p-2 rounded-xl text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950/60 transition-colors"
                  title="Simulate In-App Alert (Audio & Banner)"
                  aria-label="Test alert"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openEditModal(rem)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Edit reminder"
                  aria-label="Edit reminder"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    onDeleteReminder(rem.id);
                    showToast({
                      type: 'info',
                      title: 'Reminder Deleted',
                      message: `Removed "${rem.title}".`,
                    });
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  title="Delete reminder"
                  aria-label="Delete reminder"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Creating or Editing Reminders */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {editingReminder ? 'Edit In-App Reminder' : 'Create New In-App Reminder'}
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">
                  Reminder Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Afternoon Water Glass, Take Evening Prescription..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="water">💧 Drinking Water</option>
                    <option value="activity">🔥 Physical Activity</option>
                    <option value="bedtime">🌙 Bedtime Routine</option>
                    <option value="wellness">✨ General Wellness</option>
                    <option value="medication">💊 Prescription Medication</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">
                    Scheduled Time
                  </label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">
                  Recurrence
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'daily', label: 'Every Day' },
                    { id: 'weekdays', label: 'Mon - Fri' },
                    { id: 'custom', label: 'Weekends' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setFrequency(r.id as any)}
                      className={`py-2 px-3 rounded-xl font-medium transition-all ${
                        frequency === r.id
                          ? 'bg-teal-600 text-white font-bold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">
                  Notes / Guidance (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Take with a full glass of water, do not skip..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {category === 'medication' && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-[11px] text-rose-900 dark:text-rose-200">
                  <span className="font-bold">Prescription Compliance:</span> Only enter medications and dosages prescribed by your doctor. MediCare AI does not verify medication compatibility or dosages.
                </div>
              )}

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition-colors cursor-pointer"
                >
                  {editingReminder ? 'Update Reminder' : 'Save Reminder'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
