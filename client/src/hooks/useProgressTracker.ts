import { useState, useEffect } from 'react';

/**
 * Hook for tracking completed resources using localStorage
 * Persists completion status across browser sessions
 */

interface CompletedResources {
  [stageId: number]: {
    [resourceId: string]: boolean;
  };
}

export function useProgressTracker() {
  const [completedResources, setCompletedResources] = useState<CompletedResources>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('dataEngineerRoadmapProgress');
    if (saved) {
      try {
        setCompletedResources(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load progress:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever completedResources changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('dataEngineerRoadmapProgress', JSON.stringify(completedResources));
    }
  }, [completedResources, isLoaded]);

  const toggleResource = (stageId: number, resourceId: string) => {
    setCompletedResources((prev) => ({
      ...prev,
      [stageId]: {
        ...prev[stageId],
        [resourceId]: !prev[stageId]?.[resourceId],
      },
    }));
  };

  const isResourceCompleted = (stageId: number, resourceId: string): boolean => {
    return completedResources[stageId]?.[resourceId] ?? false;
  };

  const getStageProgress = (stageId: number, totalResources: number): number => {
    if (totalResources === 0) return 0;
    const completed = Object.values(completedResources[stageId] || {}).filter(Boolean).length;
    return Math.round((completed / totalResources) * 100);
  };

  const getTotalProgress = (totalStages: number, resourcesPerStage: Record<number, number>): number => {
    if (totalStages === 0) return 0;
    let totalCompleted = 0;
    let totalResources = 0;

    Object.entries(resourcesPerStage).forEach(([stageId, count]) => {
      const stageNum = parseInt(stageId);
      totalResources += count;
      const completed = Object.values(completedResources[stageNum] || {}).filter(Boolean).length;
      totalCompleted += completed;
    });

    return totalResources === 0 ? 0 : Math.round((totalCompleted / totalResources) * 100);
  };

  const clearAllProgress = () => {
    setCompletedResources({});
    localStorage.removeItem('dataEngineerRoadmapProgress');
  };

  return {
    completedResources,
    toggleResource,
    isResourceCompleted,
    getStageProgress,
    getTotalProgress,
    clearAllProgress,
    isLoaded,
  };
}
