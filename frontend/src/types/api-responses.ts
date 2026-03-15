/**
 * API response wrapper
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    timestamp: string;
    requestId?: string;
  };
}

/**
 * User data types
 */
export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Authentication responses
 */
export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

/**
 * Mood tracking types
 */
export interface MoodEntry {
  id: string;
  userId: string;
  mood: 'excellent' | 'good' | 'neutral' | 'poor' | 'terrible';
  sleep: number; // hours of sleep
  energy: number; // 1-10 scale
  emotionalState: string;
  triggers: string[];
  notes?: string;
  createdAt: string;
}

/**
 * Recovery plan types
 */
export interface RecoveryPlan {
  id: string;
  userId: string;
  title: string;
  description: string;
  phases: RecoveryPhase[];
  createdAt: string;
  updatedAt: string;
}

export interface RecoveryPhase {
  id: string;
  title: string;
  description: string;
  duration: number; // in days
  tasks: RecoveryTask[];
}

export interface RecoveryTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  completedAt?: string;
}

/**
 * AI suggestion types
 */
export interface AISuggestion {
  id: string;
  userId: string;
  category: 'mindfulness' | 'exercise' | 'journaling' | 'social' | 'self-care';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
}

/**
 * Resource types
 */
export interface Resource {
  id: string;
  title: string;
  description: string;
  url?: string;
  type: 'article' | 'exercise' | 'meditation' | 'video';
  category: string;
  duration?: number; // in minutes
}
