import React, { useState, useEffect } from 'react';
import { PageTab, DailyLog, WellnessGoals, HealthReminder } from './types';
import {
  DEFAULT_WELLNESS_GOALS,
  SAMPLE_WEEK_LOGS,
  INITIAL_REMINDERS,
} from './data/healthData';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { EmergencyModal } from './components/EmergencyModal';
import { FloatingChatWidget } from './components/FloatingChatWidget';

import { HomePage } from './pages/HomePage';
import { ChatbotPage } from './pages/ChatbotPage';
import { WellnessTrackerPage } from './pages/WellnessTrackerPage';
import { HealthLibraryPage } from './pages/HealthLibraryPage';
import { RemindersPage } from './pages/RemindersPage';
import { FirstAidPage } from './pages/FirstAidPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  const todayStr = new Date().toISOString().slice(0, 10);

  // Wellness Logs state with localStorage persistence
  const [logs, setLogs] = useState<DailyLog[]>(() => {
    try {
      const saved = localStorage.getItem('medicare_wellness_logs');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return SAMPLE_WEEK_LOGS;
  });

  // Wellness Goals state
  const [goals, setGoals] = useState<WellnessGoals>(() => {
    try {
      const saved = localStorage.getItem('medicare_wellness_goals');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_WELLNESS_GOALS;
  });

  // Health Reminders state
  const [reminders, setReminders] = useState<HealthReminder[]>(() => {
    try {
      const saved = localStorage.getItem('medicare_health_reminders');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_REMINDERS;
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('medicare_wellness_logs', JSON.stringify(logs));
    } catch {
      // ignore
    }
  }, [logs]);

  useEffect(() => {
    try {
      localStorage.setItem('medicare_wellness_goals', JSON.stringify(goals));
    } catch {
      // ignore
    }
  }, [goals]);

  useEffect(() => {
    try {
      localStorage.setItem('medicare_health_reminders', JSON.stringify(reminders));
    } catch {
      // ignore
    }
  }, [reminders]);

  // Ensure an entry exists for today
  const todayLog: DailyLog = logs.find((l) => l.date === todayStr) || {
    date: todayStr,
    waterGlasses: 6,
    sleepHours: 7.5,
    sleepQuality: 'restful',
    exerciseMinutes: 30,
    exerciseType: 'Brisk Walking',
    mood: 'good',
    moodNote: 'Feeling energetic and focused today.',
  };

  const handleUpdateLog = (updated: DailyLog) => {
    setLogs((prev) => {
      const exists = prev.some((l) => l.date === updated.date);
      if (exists) {
        return prev.map((l) => (l.date === updated.date ? updated : l));
      }
      return [...prev, updated];
    });
  };

  const handleUpdateGoals = (newGoals: WellnessGoals) => {
    setGoals(newGoals);
  };

  const handleLoadSampleData = () => {
    setLogs(SAMPLE_WEEK_LOGS);
  };

  const handleResetData = () => {
    const cleanToday: DailyLog = {
      date: todayStr,
      waterGlasses: 0,
      sleepHours: 7,
      sleepQuality: 'average',
      exerciseMinutes: 0,
      exerciseType: 'Brisk Walking',
      mood: 'neutral',
    };
    setLogs([cleanToday]);
  };

  const handleToggleComplete = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
  };

  const handleAddReminder = (reminder: Omit<HealthReminder, 'id'>) => {
    const newRem: HealthReminder = {
      ...reminder,
      id: `rem-${Date.now()}`,
    };
    setReminders((prev) => [newRem, ...prev]);
  };

  const handleDeleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  const handleEditReminder = (reminder: HealthReminder) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === reminder.id ? reminder : r))
    );
  };

  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
          {/* Main Navigation Header */}
          <Header
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            openEmergencyModal={() => setIsEmergencyModalOpen(true)}
          />

          {/* Active Page View */}
          <main className="flex-1">
            {activeTab === 'home' && (
              <HomePage
                setActiveTab={setActiveTab}
                openEmergencyModal={() => setIsEmergencyModalOpen(true)}
                todayLog={todayLog}
              />
            )}

            {activeTab === 'assistant' && (
              <ChatbotPage
                openEmergencyModal={() => setIsEmergencyModalOpen(true)}
              />
            )}

            {activeTab === 'tracker' && (
              <WellnessTrackerPage
                logs={logs}
                todayLog={todayLog}
                goals={goals}
                onUpdateLog={handleUpdateLog}
                onUpdateGoals={handleUpdateGoals}
                onLoadSampleData={handleLoadSampleData}
                onResetData={handleResetData}
              />
            )}

            {activeTab === 'library' && <HealthLibraryPage />}

            {activeTab === 'reminders' && (
              <RemindersPage
                reminders={reminders}
                onToggleComplete={handleToggleComplete}
                onAddReminder={handleAddReminder}
                onDeleteReminder={handleDeleteReminder}
                onEditReminder={handleEditReminder}
              />
            )}

            {activeTab === 'firstaid' && (
              <FirstAidPage
                openEmergencyModal={() => setIsEmergencyModalOpen(true)}
              />
            )}

            {activeTab === 'about' && (
              <AboutPage setActiveTab={setActiveTab} />
            )}
          </main>

          {/* Persistent Floating Chatbot Accessible From All Pages */}
          {activeTab !== 'assistant' && (
            <FloatingChatWidget
              onNavigateToAssistant={() => {
                setActiveTab('assistant');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              openEmergencyModal={() => setIsEmergencyModalOpen(true)}
            />
          )}

          {/* Emergency Dialog Modal */}
          <EmergencyModal
            isOpen={isEmergencyModalOpen}
            onClose={() => setIsEmergencyModalOpen(false)}
            onNavigateToFirstAid={() => {
              setActiveTab('firstaid');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Site Footer with Medical Disclaimers */}
          <Footer
            setActiveTab={setActiveTab}
            openEmergencyModal={() => setIsEmergencyModalOpen(true)}
          />
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}
