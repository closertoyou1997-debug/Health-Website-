export type PageTab = 'home' | 'assistant' | 'tracker' | 'library' | 'reminders' | 'firstaid' | 'about';

export type MoodType = 'great' | 'good' | 'neutral' | 'low' | 'stressed';

export interface DailyLog {
  date: string; // YYYY-MM-DD
  waterGlasses: number; // 250ml per glass
  sleepHours: number;
  sleepQuality: 'restful' | 'average' | 'restless';
  exerciseMinutes: number;
  exerciseType: string;
  mood: MoodType;
  moodNote?: string;
}

export interface WellnessGoals {
  waterTarget: number; // in glasses
  sleepTarget: number; // in hours
  exerciseTarget: number; // in minutes
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isEmergency?: boolean;
  modelUsed?: string;
}

export interface LibraryArticle {
  id: string;
  title: string;
  category: 'nutrition' | 'hydration' | 'sleep' | 'activity' | 'hygiene' | 'stress' | 'preventive' | 'routines';
  categoryLabel: string;
  readTime: string;
  summary: string;
  keyTakeaway: string;
  habits: string[];
  fullGuide: {
    overview: string;
    scienceFacts: string[];
    actionPlan: string[];
    commonMistakes: string[];
    whenToSeeDoctor: string;
  };
  iconName: string;
}

export interface HealthReminder {
  id: string;
  title: string;
  category: 'water' | 'activity' | 'bedtime' | 'wellness' | 'medication';
  categoryLabel: string;
  time: string; // HH:MM
  frequency: 'daily' | 'weekdays' | 'custom';
  completed: boolean;
  notes?: string;
  isPrescriptionMedication?: boolean;
}

export interface FirstAidTopic {
  id: string;
  title: string;
  severity: 'critical' | 'urgent' | 'moderate';
  shortDesc: string;
  emergencyWarning?: string;
  callEmergencyNow: boolean;
  immediateSteps: string[];
  dos: string[];
  donts: string[];
  icon: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}
