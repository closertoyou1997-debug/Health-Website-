import React, { useState } from 'react';
import { LibraryArticle } from '../types';
import { HEALTH_LIBRARY_ARTICLES } from '../data/healthData';
import { useToast } from '../context/ToastContext';
import {
  BookOpen,
  Search,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  X,
  Share2,
  ExternalLink,
  Sparkles,
  Apple,
  Droplets,
  Moon,
  Activity,
  HeartHandshake,
  CalendarCheck,
} from 'lucide-react';

export const HealthLibraryPage: React.FC = () => {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<LibraryArticle | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('medicare_bookmarked_articles');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const categories = [
    { id: 'all', label: 'All Topics' },
    { id: 'nutrition', label: 'Nutrition' },
    { id: 'hydration', label: 'Hydration' },
    { id: 'sleep', label: 'Sleep Hygiene' },
    { id: 'activity', label: 'Physical Activity' },
    { id: 'hygiene', label: 'Personal Hygiene' },
    { id: 'stress', label: 'Stress Management' },
    { id: 'preventive', label: 'Preventive Care' },
    { id: 'routines', label: 'Daily Routines' },
  ];

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated: string[];
    if (bookmarks.includes(id)) {
      updated = bookmarks.filter((b) => b !== id);
      showToast({
        type: 'info',
        title: 'Bookmark Removed',
        message: 'Article removed from saved list.',
      });
    } else {
      updated = [...bookmarks, id];
      showToast({
        type: 'success',
        title: 'Article Bookmarked',
        message: 'Saved to your quick-access favorites.',
      });
    }
    setBookmarks(updated);
    try {
      localStorage.setItem('medicare_bookmarked_articles', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const filteredArticles = HEALTH_LIBRARY_ARTICLES.filter((art) => {
    const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.keyTakeaway.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.habits.some((h) => h.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Apple':
        return <Apple className="w-5 h-5 text-emerald-500" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-cyan-500" />;
      case 'Moon':
        return <Moon className="w-5 h-5 text-indigo-500" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-amber-500" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-rose-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-teal-500" />;
      case 'CalendarCheck':
        return <CalendarCheck className="w-5 h-5 text-blue-500" />;
      default:
        return <BookOpen className="w-5 h-5 text-teal-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#102A43] via-[#0D9488] to-[#102A43] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Health Education Library
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-400/20 text-teal-300 text-xs font-semibold border border-teal-400/30">
              Evidence-Based
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-2xl leading-relaxed">
            Curated, science-supported health guides covering nutrition, sleep science, hydration physiology, cardiovascular fitness, and disease prevention.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs flex items-center gap-2">
            <BookmarkCheck className="w-4 h-4 text-[#67E8F9]" />
            <span>{bookmarks.length} Bookmarked</span>
          </div>
        </div>
      </div>

      {/* Search Bar & Category Filters */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search guides by keyword (e.g., 'sleep', 'hypertension', 'hydration', 'fiber')..."
            className="w-full text-xs sm:text-sm pl-11 pr-10 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#102A43] to-[#0D9488] text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>Showing {filteredArticles.length} evidence-based guides</span>
        {bookmarks.length > 0 && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="text-teal-600 dark:text-teal-400 hover:underline font-medium"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => {
          const isBookmarked = bookmarks.includes(article.id);
          return (
            <div
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="group bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Card Top: Icon, Category Badge & Bookmark */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 group-hover:scale-105 transition-transform">
                      {getCategoryIcon(article.iconName)}
                    </div>
                    <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wide">
                      {article.categoryLabel}
                    </span>
                  </div>

                  <button
                    onClick={(e) => toggleBookmark(article.id, e)}
                    className="p-2 rounded-xl text-slate-400 hover:text-teal-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark guide'}
                    aria-label="Bookmark article"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-teal-600 dark:text-teal-400 fill-teal-500/20" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>

                {/* Practical Healthy Habits List Preview */}
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Core Healthy Habits:
                  </span>
                  {article.habits.slice(0, 2).map((habit, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{habit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>

                <span className="font-semibold text-teal-600 dark:text-teal-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-16 p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No matching health guides found
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
            Try adjusting your search terms or select another category filter to explore other wellness topics.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-semibold hover:bg-teal-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Detailed Guide Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#102A43] to-[#0D9488] p-6 sm:p-8 text-white">
              <div className="flex items-center justify-between pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                  {activeArticle.categoryLabel} • {activeArticle.readTime}
                </span>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close guide modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                {activeArticle.title}
              </h2>

              <p className="text-xs sm:text-sm text-teal-100 mt-2 italic">
                “{activeArticle.keyTakeaway}”
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              {/* Overview */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 mb-2">
                  Clinical & Biological Context
                </h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeArticle.fullGuide.overview}
                </p>
              </div>

              {/* Science Facts */}
              <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/60 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900 dark:text-teal-200 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  Key Scientific Findings:
                </h4>
                <ul className="space-y-1.5 text-xs text-teal-950 dark:text-teal-200">
                  {activeArticle.fullGuide.scienceFacts.map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-teal-500 font-bold">•</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Plan */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">
                  Practical Step-by-Step Action Plan:
                </h4>
                <ul className="space-y-2">
                  {activeArticle.fullGuide.actionPlan.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Mistakes */}
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Common Pitfalls & Mistakes:
                </h4>
                <ul className="space-y-1 text-xs text-amber-950 dark:text-amber-200">
                  {activeArticle.fullGuide.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* When to consult a physician */}
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">
                  When to Seek Professional Medical Care:
                </span>
                <p className="text-slate-600 dark:text-slate-300">
                  {activeArticle.fullGuide.whenToSeeDoctor}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Educational reference • Non-clinical guidance
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
