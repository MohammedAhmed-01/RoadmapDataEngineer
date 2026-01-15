import { useState, useEffect } from 'react';

/**
 * Advanced Tracking Hook
 * Manages scheduling, resource status, goals, and analytics
 * All data persisted to localStorage
 */

export type ResourceStatus = 'not-started' | 'watching' | 'completed';

export interface ResourceTracking {
  status: ResourceStatus;
  startDate?: string;
  completedDate?: string;
  timeSpent: number; // in minutes
  lastAccessed?: string;
}

export interface StageSchedule {
  startDate?: string;
  endDate?: string;
  estimatedDuration: number; // in days
}

export interface WeeklyGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  completed: boolean;
  createdDate: string;
}

export interface DailyChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  date: string;
}

export interface AnalyticsData {
  totalTimeSpent: number; // in minutes
  topicsRestarted: number;
  topicsDelayed: number;
  averageCompletionTime: number; // in days
  streakDays: number;
  lastActivityDate?: string;
}

interface AdvancedTrackingState {
  resourceTracking: Record<number, Record<string, ResourceTracking>>;
  stageSchedules: Record<number, StageSchedule>;
  weeklyGoals: WeeklyGoal[];
  dailyChecklist: DailyChecklistItem[];
  analytics: AnalyticsData;
}

const STORAGE_KEY = 'dataEngineerAdvancedTracking';
const DEFAULT_STAGE_DURATION = 14; // 2 weeks per stage

export function useAdvancedTracking() {
  const [state, setState] = useState<AdvancedTrackingState>({
    resourceTracking: {},
    stageSchedules: {},
    weeklyGoals: [],
    dailyChecklist: [],
    analytics: {
      totalTimeSpent: 0,
      topicsRestarted: 0,
      topicsDelayed: 0,
      averageCompletionTime: 0,
      streakDays: 0,
    },
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load advanced tracking data:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isLoaded]);

  // Resource tracking functions
  const setResourceStatus = (stageId: number, resourceId: string, status: ResourceStatus) => {
    setState((prev) => {
      const newState = { ...prev };
      if (!newState.resourceTracking[stageId]) {
        newState.resourceTracking[stageId] = {};
      }

      const tracking = newState.resourceTracking[stageId][resourceId] || {
        status: 'not-started',
        timeSpent: 0,
      };

      const now = new Date().toISOString();

      if (status === 'watching' && tracking.status === 'not-started') {
        tracking.startDate = now;
      }

      if (status === 'completed' && tracking.status !== 'completed') {
        tracking.completedDate = now;
      }

      tracking.status = status;
      tracking.lastAccessed = now;

      newState.resourceTracking[stageId][resourceId] = tracking;
      return newState;
    });
  };

  const getResourceStatus = (stageId: number, resourceId: string): ResourceStatus => {
    return state.resourceTracking[stageId]?.[resourceId]?.status ?? 'not-started';
  };

  const addTimeSpent = (stageId: number, resourceId: string, minutes: number) => {
    setState((prev) => {
      const newState = { ...prev };
      if (!newState.resourceTracking[stageId]) {
        newState.resourceTracking[stageId] = {};
      }

      const tracking = newState.resourceTracking[stageId][resourceId] || {
        status: 'not-started',
        timeSpent: 0,
      };

      tracking.timeSpent += minutes;
      tracking.lastAccessed = new Date().toISOString();
      newState.resourceTracking[stageId][resourceId] = tracking;

      // Update analytics
      newState.analytics.totalTimeSpent += minutes;

      return newState;
    });
  };

  // Scheduling functions
  const setStageSchedule = (stageId: number, startDate: string, endDate: string) => {
    setState((prev) => ({
      ...prev,
      stageSchedules: {
        ...prev.stageSchedules,
        [stageId]: {
          startDate,
          endDate,
          estimatedDuration: Math.ceil(
            (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
          ),
        },
      },
    }));
  };

  const getStageSchedule = (stageId: number): StageSchedule => {
    return (
      state.stageSchedules[stageId] || {
        estimatedDuration: DEFAULT_STAGE_DURATION,
      }
    );
  };

  // Goals functions
  const addWeeklyGoal = (title: string, description: string, targetDate: string) => {
    const newGoal: WeeklyGoal = {
      id: `goal-${Date.now()}`,
      title,
      description,
      targetDate,
      completed: false,
      createdDate: new Date().toISOString(),
    };

    setState((prev) => ({
      ...prev,
      weeklyGoals: [...prev.weeklyGoals, newGoal],
    }));

    return newGoal;
  };

  const toggleWeeklyGoal = (goalId: string) => {
    setState((prev) => ({
      ...prev,
      weeklyGoals: prev.weeklyGoals.map((goal) =>
        goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
      ),
    }));
  };

  const deleteWeeklyGoal = (goalId: string) => {
    setState((prev) => ({
      ...prev,
      weeklyGoals: prev.weeklyGoals.filter((goal) => goal.id !== goalId),
    }));
  };

  // Daily checklist functions
  const addDailyChecklistItem = (title: string, date: string = new Date().toISOString().split('T')[0]) => {
    const newItem: DailyChecklistItem = {
      id: `checklist-${Date.now()}`,
      title,
      completed: false,
      date,
    };

    setState((prev) => ({
      ...prev,
      dailyChecklist: [...prev.dailyChecklist, newItem],
    }));

    return newItem;
  };

  const toggleDailyChecklistItem = (itemId: string) => {
    setState((prev) => ({
      ...prev,
      dailyChecklist: prev.dailyChecklist.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      ),
    }));
  };

  const getDailyChecklistForDate = (date: string) => {
    return state.dailyChecklist.filter((item) => item.date === date);
  };

  // Analytics functions
  const calculateAnalytics = (totalStages: number) => {
    let totalTimeSpent = 0;
    let completedResources = 0;
    let totalResources = 0;
    let topicsRestarted = 0;
    let topicsDelayed = 0;
    let lastActivityDate: string | undefined;

    Object.entries(state.resourceTracking).forEach(([, resources]) => {
      Object.entries(resources).forEach(([, tracking]) => {
        totalResources++;
        totalTimeSpent += tracking.timeSpent;

        if (tracking.status === 'completed') {
          completedResources++;
        }

        if (tracking.lastAccessed) {
          if (!lastActivityDate || tracking.lastAccessed > lastActivityDate) {
            lastActivityDate = tracking.lastAccessed;
          }
        }

        // Count restarted topics (watching -> completed -> watching again)
        if (tracking.status === 'watching' && tracking.completedDate) {
          topicsRestarted++;
        }
      });
    });

    // Calculate streak days
    const streakDays = calculateStreak(lastActivityDate);

    // Calculate average completion time
    const averageCompletionTime =
      completedResources > 0 ? Math.round((totalTimeSpent / completedResources) * 60) : 0;

    return {
      totalTimeSpent,
      topicsRestarted,
      topicsDelayed,
      averageCompletionTime,
      streakDays,
      lastActivityDate,
    };
  };

  const calculateStreak = (lastActivityDate?: string): number => {
    if (!lastActivityDate) return 0;

    const last = new Date(lastActivityDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - last.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays <= 1 ? 1 : 0; // Streak is 1 if activity was today or yesterday
  };

  const getWeakAreas = (): Array<{ stageId: number; count: number }> => {
    const weakAreas: Record<number, number> = {};

    Object.entries(state.resourceTracking).forEach(([stageId, resources]) => {
      Object.values(resources).forEach((tracking) => {
        // Count topics that are still being watched or were restarted after completion
        if (tracking.status === 'watching') {
          const id = parseInt(stageId);
          weakAreas[id] = (weakAreas[id] || 0) + 1;
        }
      });
    });

    return Object.entries(weakAreas)
      .map(([stageId, count]) => ({ stageId: parseInt(stageId), count }))
      .sort((a, b) => b.count - a.count);
  };

  return {
    // Resource tracking
    setResourceStatus,
    getResourceStatus,
    addTimeSpent,

    // Scheduling
    setStageSchedule,
    getStageSchedule,

    // Goals
    addWeeklyGoal,
    toggleWeeklyGoal,
    deleteWeeklyGoal,
    weeklyGoals: state.weeklyGoals,

    // Daily checklist
    addDailyChecklistItem,
    toggleDailyChecklistItem,
    getDailyChecklistForDate,
    dailyChecklist: state.dailyChecklist,

    // Analytics
    calculateAnalytics,
    getWeakAreas,
    analytics: state.analytics,

    isLoaded,
  };
}
