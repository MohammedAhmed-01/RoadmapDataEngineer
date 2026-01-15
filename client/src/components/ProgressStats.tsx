import { RotateCcw } from 'lucide-react';
import { roadmapData } from '@/lib/roadmapData';

/**
 * Progress Stats Component
 * Displays overall progress, completed resources, and total resources
 * Shows progress bar with percentage
 */

interface ProgressStatsProps {
  totalProgress: number;
  completedCount: number;
  totalCount: number;
  onClearProgress: () => void;
}

export default function ProgressStats({
  totalProgress,
  completedCount,
  totalCount,
  onClearProgress,
}: ProgressStatsProps) {
  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all progress? This cannot be undone.')) {
      onClearProgress();
    }
  };

  return (
    <div className="fixed bottom-8 right-8 w-80 card-glass p-6 shadow-xl shadow-cyan-500/20 z-40">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-lg text-white">Your Progress</h3>
        <button
          onClick={handleClear}
          className="p-2 hover:bg-slate-700/50 rounded-lg transition-smooth text-muted-foreground hover:text-cyan-400"
          title="Clear all progress"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Overall Progress</span>
          <span className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {totalProgress}%
          </span>
        </div>
        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${totalProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Resources Completed</p>
            <p className="text-2xl font-bold text-cyan-400">{completedCount}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Resources</p>
            <p className="text-2xl font-bold text-foreground">{totalCount}</p>
          </div>
        </div>

        {/* Motivation Message */}
        <div className="p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg">
          {totalProgress === 0 && (
            <p className="text-xs text-cyan-300">
              🚀 Start learning! Click on resources to mark them as completed.
            </p>
          )}
          {totalProgress > 0 && totalProgress < 50 && (
            <p className="text-xs text-cyan-300">
              💪 Great start! Keep going to reach the halfway mark.
            </p>
          )}
          {totalProgress >= 50 && totalProgress < 100 && (
            <p className="text-xs text-cyan-300">
              🔥 You're over halfway there! Keep the momentum going.
            </p>
          )}
          {totalProgress === 100 && (
            <p className="text-xs text-cyan-300">
              🎉 Congratulations! You've completed the entire roadmap!
            </p>
          )}
        </div>

        {/* Learning Stages Count */}
        <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border/50">
          {roadmapData.length} learning stages • {totalCount} total resources
        </div>
      </div>
    </div>
  );
}
