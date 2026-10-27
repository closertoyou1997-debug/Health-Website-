import React, { useState } from 'react';
import { PageTab } from '../types';
import { useTheme } from '../context/ThemeContext';
import {
  Activity,
  Bot,
  BookOpen,
  Bell,
  HeartPulse,
  Info,
  Sun,
  Moon,
  Menu,
  X,
  PhoneCall,
  Sparkles,
} from 'lucide-react';

interface HeaderProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  openEmergencyModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  openEmergencyModal,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <HeartPulse className="w-4 h-4" /> },
    { id: 'assistant', label: 'AI Health Assistant', icon: <Bot className="w-4 h-4" /> },
    { id: 'tracker', label: 'Wellness Tracker', icon: <Activity className="w-4 h-4" /> },
    { id: 'library', label: 'Health Library', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'reminders', label: 'Reminders', icon: <Bell className="w-4 h-4" /> },
    { id: 'firstaid', label: 'First Aid', icon: <HeartPulse className="w-4 h-4 text-rose-500" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: PageTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo with Medical Cross + AI Synapse */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg p-1"
            aria-label="MediCare AI Home"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#102A43] via-[#0D9488] to-[#67E8F9] p-0.5 shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200 flex items-center justify-center">
              <div className="w-full h-full bg-[#102A43] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                {/* AI Synapse Radial Accent */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(103,232,249,0.35)_0%,transparent_70%)] animate-pulse-subtle" />
                
                {/* Medical Cross Graphic */}
                <svg
                  className="w-6 h-6 text-white relative z-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 4v16" stroke="#67E8F9" />
                  <path d="M4 12h16" stroke="#0D9488" />
                  <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" stroke="none" />
                </svg>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading text-xl font-bold tracking-tight text-[#102A43] dark:text-white">
                  MediCare<span className="text-[#0D9488] dark:text-[#67E8F9]">AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 rounded border border-teal-200 dark:border-teal-800">
                  <Sparkles className="w-2.5 h-2.5 text-teal-500" />
                  Companion
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
                Health • Habits • Wellbeing
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-50 dark:bg-slate-800/60 p-1.5 rounded-full border border-slate-200 dark:border-slate-700/60" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#102A43] to-[#0D9488] text-white shadow-sm shadow-teal-500/20'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
                  }`}
                >
                  <span className={isActive ? 'text-[#67E8F9]' : 'text-slate-500 dark:text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5">
            {/* Emergency Hotline Quick Trigger */}
            <button
              onClick={openEmergencyModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800 rounded-full transition-colors cursor-pointer group shadow-sm"
              title="Emergency First-Aid Guidance & Hotlines"
              aria-label="Emergency guidance and 911"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <PhoneCall className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Emergency</span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0 hover:rotate-90 duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 transition-transform rotate-0 hover:-rotate-12 duration-300" />
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-1 shadow-xl animate-in slide-in-from-top duration-200">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 py-1">
            Navigation
          </p>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                  isActive
                    ? 'bg-gradient-to-r from-[#102A43] to-[#0D9488] text-white font-semibold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className={isActive ? 'text-[#67E8F9]' : 'text-slate-500 dark:text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openEmergencyModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
            >
              <PhoneCall className="w-4 h-4 text-rose-600" />
              Emergency First Aid & Hotline Numbers
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
