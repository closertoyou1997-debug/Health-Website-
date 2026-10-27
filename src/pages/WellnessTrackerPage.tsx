import React, { useState } from 'react';
import { DailyLog, WellnessGoals, MoodType } from '../types';
import { useToast } from '../context/ToastContext';
import {
  Activity,
  Droplets,
  Moon,
  Flame,
  Plus,
  Minus,
  Settings,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Calendar,
  Smile,
  Meh,
  Frown,
  AlertCircle,
  HelpCircle,
  Info,
  TrendingUp,
  Award,
} from 'lucide-react';

interface WellnessTrackerPageProps {
  logs: DailyLog[];
  todayLog: DailyLog;
  goals: WellnessGoals;
  onUpdateLog: (log: DailyLog) => void;
  onUpdateGoals: (goals: WellnessGoals) => void;
  onLoadSampleData: () => void;
  onResetData: () => void;
}

const EXERCISE_TYPES = [
  'Brisk Walking',
  'Jogging / Running',
  'Cycling',
  'Strength & Resistance',
  'Yoga & Mobility',
  'Swimming',
  'Pilates',
  'HIIT / Aerobics',
  'Other Movement',
];

const MOODS: { type: MoodType; label: string; emoji: string; color: string }[] = [
  { type: 'great', label: 'Great', emoji: '😄', color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300' },
  { type: 'good', label: 'Good', emoji: '🙂', color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/60 border-teal-300' },
  { type: 'neutral', label: 'Neutral', emoji: '😐', color: 'text-slate-500 bg-slate-50 dark:bg-slate-800 border-slate-300' },
  { type: 'low', label: 'Low', emoji: '😔', color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60 border-amber-300' },
  { type: 'stressed', label: 'Stressed', emoji: '😰', color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/60 border-rose-300' },
];

export const WellnessTrackerPage: React.FC<WellnessTrackerPageProps> = ({
  logs,
  todayLog,
  goals,
  onUpdateLog,
  onUpdateGoals,
  onLoadSampleData,
  onResetData,
}) => {
  const { showToast } = useToast();
  const [selectedDate, setSelectedDate] = useState<string>(todayLog.date);
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [chartMetric, setChartMetric] = useState<'score' | 'water' | 'sleep' | 'exercise'>('score');

  // Goals modal form state
  const [tempGoals, setTempGoals] = useState<WellnessGoals>(goals);

  // Active day being viewed/edited
  const activeLog: DailyLog = logs.find((l) => l.date === selectedDate) || {
    date: selectedDate,
    waterGlasses: 0,
    sleepHours: 7,
    sleepQuality: 'restful',
    exerciseMinutes: 0,
    exerciseType: 'Brisk Walking',
    mood: 'good',
  };

  const handleUpdate = (partial: Partial<DailyLog>) => {
    const updated = { ...activeLog, ...partial };
    onUpdateLog(updated);
  };

  const handleSaveGoals = () => {
    onUpdateGoals(tempGoals);
    setShowGoalsModal(false);
    showToast({
      type: 'success',
      title: 'Goals Updated',
      message: 'Your personal daily wellness targets have been saved.',
    });
  };

  // Calculate day completion score
  const calculateDayScore = (log: DailyLog) => {
    const waterScore = Math.min(1, log.waterGlasses / (goals.waterTarget || 8));
    const sleepScore = Math.min(1, log.sleepHours / (goals.sleepTarget || 8));
    const exerciseScore = Math.min(1, log.exerciseMinutes / (goals.exerciseTarget || 30));
    return Math.round(((waterScore + sleepScore + exerciseScore) / 3) * 100);
  };

  const todayScore = calculateDayScore(activeLog);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Title & Demo Data Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Daily Wellness Tracker
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 text-xs font-semibold">
              Interactive Dashboard
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Log your daily hydration, sleep duration, exercise, and mood to build healthy biological habits.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => {
              setTempGoals(goals);
              setShowGoalsModal(true);
            }}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <Settings className="w-3.5 h-3.5 text-teal-600" />
            <span>Customize Goals</span>
          </button>
          <button
            onClick={() => {
              onLoadSampleData();
              showToast({
                type: 'info',
                title: 'Sample Data Loaded',
                message: 'Loaded 7 days of realistic demonstration wellness entries.',
              });
            }}
            className="px-3.5 py-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-xs font-semibold text-teal-800 dark:text-teal-300 hover:bg-teal-100 shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Load Demo Week</span>
          </button>
          <button
            onClick={() => {
              onResetData();
              showToast({
                type: 'info',
                title: 'Data Reset',
                message: 'Wellness records have been reset to default clean state.',
              });
            }}
            className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 shadow-sm transition-colors"
            title="Reset data"
            aria-label="Reset logs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-800 dark:text-slate-200">Demonstration & Guidance Notice:</span> General wellness targets (8 glasses water, 8 hours sleep, 30 mins exercise) are customizable personal reference points and do not constitute individualized medical prescriptions. Data is saved locally in your browser.
        </div>
      </div>

      {/* 4 Interactive Logging Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 1. Water Intake Tracker */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">
                <Droplets className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                Goal: {goals.waterTarget} glasses
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Water Intake
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Approx. 250ml per glass
            </p>

            {/* Visual Glass Fill Counter */}
            <div className="my-5 flex items-center justify-center">
              <div className="relative w-28 h-32 rounded-b-3xl border-4 border-cyan-400/80 bg-cyan-50/50 dark:bg-slate-800 overflow-hidden flex flex-col justify-end shadow-inner">
                {/* Liquid Fill */}
                <div
                  className="w-full bg-gradient-to-t from-cyan-500 to-teal-400 transition-all duration-500 flex items-center justify-center text-white font-extrabold text-sm shadow-md"
                  style={{
                    height: `${Math.min(100, (activeLog.waterGlasses / (goals.waterTarget || 8)) * 100)}%`,
                  }}
                >
                  {activeLog.waterGlasses > 0 && `${activeLog.waterGlasses} gl`}
                </div>
              </div>
            </div>

            <div className="text-center text-xs text-slate-600 dark:text-slate-300">
              <span className="font-bold text-base text-slate-900 dark:text-white">
                {activeLog.waterGlasses}
              </span>{' '}
              glasses ({((activeLog.waterGlasses * 250) / 1000).toFixed(2)} L)
            </div>
          </div>

          {/* Stepper Buttons */}
          <div className="mt-5 flex items-center gap-2">
            <button
              onClick={() => handleUpdate({ waterGlasses: Math.max(0, activeLog.waterGlasses - 1) })}
              className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold flex items-center justify-center gap-1 transition-colors text-xs"
              aria-label="Decrease water by 1 glass"
            >
              <Minus className="w-3.5 h-3.5" /> -1 Glass
            </button>
            <button
              onClick={() => handleUpdate({ waterGlasses: activeLog.waterGlasses + 1 })}
              className="flex-1 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold flex items-center justify-center gap-1 transition-colors text-xs shadow-sm shadow-cyan-600/30"
              aria-label="Increase water by 1 glass"
            >
              <Plus className="w-3.5 h-3.5" /> +1 Glass
            </button>
          </div>
        </div>

        {/* 2. Sleep Hours Tracker */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Moon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                Goal: {goals.sleepTarget} hrs
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Restorative Sleep
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Recommended: 7 - 9 hours
            </p>

            <div className="my-6 text-center">
              <div className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                {activeLog.sleepHours}
                <span className="text-base font-medium text-slate-400 ml-1">hrs</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {activeLog.sleepHours >= 7 && activeLog.sleepHours <= 9
                  ? 'Optimal biological range ✨'
                  : activeLog.sleepHours < 7
                  ? 'Below optimal circadian rest'
                  : 'Extended restorative sleep'}
              </p>
            </div>

            {/* Sleep Quality Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block">
                Perceived Sleep Quality:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'restful', label: 'Restful 🌙' },
                  { id: 'average', label: 'Average 😴' },
                  { id: 'restless', label: 'Restless 🥱' },
                ].map((q) => (
                  <button
                    key={q.id}
                    onClick={() => handleUpdate({ sleepQuality: q.id as any })}
                    className={`py-1.5 text-[11px] font-medium rounded-lg transition-all ${
                      activeLog.sleepQuality === q.id
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stepper Buttons */}
          <div className="mt-5 flex items-center gap-2">
            <button
              onClick={() => handleUpdate({ sleepHours: Math.max(0, Number((activeLog.sleepHours - 0.5).toFixed(1))) })}
              className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold flex items-center justify-center gap-1 transition-colors text-xs"
            >
              <Minus className="w-3.5 h-3.5" /> -0.5 hr
            </button>
            <button
              onClick={() => handleUpdate({ sleepHours: Math.min(16, Number((activeLog.sleepHours + 0.5).toFixed(1))) })}
              className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center justify-center gap-1 transition-colors text-xs shadow-sm shadow-indigo-600/30"
            >
              <Plus className="w-3.5 h-3.5" /> +0.5 hr
            </button>
          </div>
        </div>

        {/* 3. Physical Activity Tracker */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                Goal: {goals.exerciseTarget} mins
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Physical Activity
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Moderate or vigorous movement
            </p>

            <div className="my-6 text-center">
              <div className="text-4xl font-extrabold text-amber-500">
                {activeLog.exerciseMinutes}
                <span className="text-base font-medium text-slate-400 ml-1">mins</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Approx. ~{Math.round(activeLog.exerciseMinutes * 5.5)} kcal expended
              </p>
            </div>

            {/* Exercise Type Dropdown */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block">
                Primary Movement Type:
              </label>
              <select
                value={activeLog.exerciseType}
                onChange={(e) => handleUpdate({ exerciseType: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {EXERCISE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stepper Buttons */}
          <div className="mt-5 flex items-center gap-2">
            <button
              onClick={() => handleUpdate({ exerciseMinutes: Math.max(0, activeLog.exerciseMinutes - 10) })}
              className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold flex items-center justify-center gap-1 transition-colors text-xs"
            >
              <Minus className="w-3.5 h-3.5" /> -10 min
            </button>
            <button
              onClick={() => handleUpdate({ exerciseMinutes: activeLog.exerciseMinutes + 10 })}
              className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold flex items-center justify-center gap-1 transition-colors text-xs shadow-sm shadow-amber-500/30"
            >
              <Plus className="w-3.5 h-3.5" /> +10 min
            </button>
          </div>
        </div>

        {/* 4. Mood & Emotional State */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
                <Smile className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 capitalize">
                State: {activeLog.mood}
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Daily Mood & Energy
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Subjective psychological check-in
            </p>

            {/* 5 Mood Icons */}
            <div className="grid grid-cols-5 gap-1.5 my-4">
              {MOODS.map((m) => {
                const isSelected = activeLog.mood === m.type;
                return (
                  <button
                    key={m.type}
                    onClick={() => handleUpdate({ mood: m.type })}
                    className={`flex flex-col items-center justify-center p-2 rounded-2xl border text-xl transition-all ${
                      isSelected
                        ? `${m.color} ring-2 ring-teal-500 font-bold scale-105 shadow-sm`
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    title={m.label}
                  >
                    <span>{m.emoji}</span>
                    <span className="text-[10px] mt-1 text-slate-600 dark:text-slate-300">
                      {m.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Mood Note */}
            <div>
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                Quick Reflection / Note:
              </label>
              <input
                type="text"
                value={activeLog.moodNote || ''}
                onChange={(e) => handleUpdate({ moodNote: e.target.value })}
                placeholder="e.g. Good focus, feeling rested..."
                className="w-full text-xs px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="mt-5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-center text-[11px] text-slate-500">
            Wellness Score for Day: <strong className="text-teal-600 dark:text-teal-400">{todayScore}%</strong>
          </div>
        </div>
      </div>

      {/* 7-Day Trend Chart & History Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                7-Day Habit Consistency & Trends
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Visualizing habit completion over the past 7 logged entries
            </p>
          </div>

          {/* Metric Selector Filter */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
            {[
              { id: 'score', label: 'Overall %' },
              { id: 'water', label: 'Water' },
              { id: 'sleep', label: 'Sleep' },
              { id: 'exercise', label: 'Exercise' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setChartMetric(btn.id as any)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  chartMetric === btn.id
                    ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="pt-4 pb-2">
          <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-56 pt-6 border-b border-slate-200 dark:border-slate-800 px-2 sm:px-6">
            {logs.slice(-7).map((log) => {
              const score = calculateDayScore(log);
              let valPercent = score;
              let labelText = `${score}%`;

              if (chartMetric === 'water') {
                valPercent = Math.min(100, Math.round((log.waterGlasses / (goals.waterTarget || 8)) * 100));
                labelText = `${log.waterGlasses} gl`;
              } else if (chartMetric === 'sleep') {
                valPercent = Math.min(100, Math.round((log.sleepHours / (goals.sleepTarget || 8)) * 100));
                labelText = `${log.sleepHours}h`;
              } else if (chartMetric === 'exercise') {
                valPercent = Math.min(100, Math.round((log.exerciseMinutes / (goals.exerciseTarget || 30)) * 100));
                labelText = `${log.exerciseMinutes}m`;
              }

              const isSelected = selectedDate === log.date;

              return (
                <div
                  key={log.date}
                  onClick={() => setSelectedDate(log.date)}
                  className="flex flex-col items-center h-full justify-end group cursor-pointer"
                >
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1 group-hover:text-teal-600 transition-colors">
                    {labelText}
                  </span>

                  {/* Bar */}
                  <div className="w-full max-w-[48px] bg-slate-100 dark:bg-slate-800 rounded-t-xl h-full flex flex-col justify-end p-1 overflow-hidden">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        isSelected
                          ? 'bg-gradient-to-t from-teal-600 to-cyan-400 shadow-md ring-2 ring-teal-400'
                          : 'bg-gradient-to-t from-teal-500/80 to-teal-400 group-hover:from-teal-600 group-hover:to-cyan-400'
                      }`}
                      style={{ height: `${Math.max(12, valPercent)}%` }}
                    />
                  </div>

                  {/* Day Label */}
                  <span
                    className={`text-[11px] font-semibold mt-2 ${
                      isSelected
                        ? 'text-teal-600 dark:text-teal-400 font-bold'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {new Date(log.date + 'T00:00:00').toLocaleDateString([], { weekday: 'short' })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Day Details Card */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-teal-600" />
            <span className="font-bold text-slate-800 dark:text-slate-100">
              Viewing Entry for: {new Date(activeLog.date + 'T00:00:00').toLocaleDateString([], { dateStyle: 'full' })}
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
            <span>Water: <strong>{activeLog.waterGlasses} gl</strong></span>
            <span>Sleep: <strong>{activeLog.sleepHours} hrs</strong> ({activeLog.sleepQuality})</span>
            <span>Exercise: <strong>{activeLog.exerciseMinutes} min</strong> ({activeLog.exerciseType})</span>
            <span>Mood: <strong className="capitalize">{activeLog.mood}</strong></span>
          </div>
        </div>
      </div>

      {/* Goals Modal */}
      {showGoalsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Customize Wellness Targets
                </h3>
              </div>
              <button
                onClick={() => setShowGoalsModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Adjust your daily baseline goals. These goals help calculate your daily progress bars and summary charts.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200 block mb-1">
                  Daily Water Target (Glasses of 250ml):
                </label>
                <input
                  type="number"
                  min="4"
                  max="16"
                  value={tempGoals.waterTarget}
                  onChange={(e) => setTempGoals({ ...tempGoals, waterTarget: parseInt(e.target.value) || 8 })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200 block mb-1">
                  Target Restful Sleep (Hours):
                </label>
                <input
                  type="number"
                  min="5"
                  max="12"
                  step="0.5"
                  value={tempGoals.sleepTarget}
                  onChange={(e) => setTempGoals({ ...tempGoals, sleepTarget: parseFloat(e.target.value) || 8 })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200 block mb-1">
                  Daily Exercise Duration (Minutes):
                </label>
                <input
                  type="number"
                  min="10"
                  max="120"
                  step="5"
                  value={tempGoals.exerciseTarget}
                  onChange={(e) => setTempGoals({ ...tempGoals, exerciseTarget: parseInt(e.target.value) || 30 })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setShowGoalsModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveGoals}
                className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors"
              >
                Save Goals
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
