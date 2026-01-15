import { BarChart3, TrendingUp, AlertCircle, Zap } from 'lucide-react';
import { AnalyticsData } from '@/hooks/useAdvancedTracking';

/**
 * Analytics Dashboard Component
 * Displays learning analytics and weak areas
 */

interface AnalyticsDashboardProps {
  analytics: AnalyticsData;
  weakAreas: Array<{ stageId: number; count: number }>;
  stageNames: Record<number, string>;
}

export default function AnalyticsDashboard({
  analytics,
  weakAreas,
  stageNames,
}: AnalyticsDashboardProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  const getCompletionSpeedLabel = (days: number) => {
    if (days === 0) return 'Not started';
    if (days <= 1) return 'Very fast';
    if (days <= 3) return 'Fast';
    if (days <= 7) return 'Moderate';
    return 'Slow';
  };

  return (
    <div className="card-glass p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="text-cyan-400" size={24} />
        <h3 className="font-heading text-xl text-white">Analytics Dashboard</h3>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Total Time Spent */}
        <div className="p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Time Spent</p>
            <Zap size={16} className="text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-blue-300">{formatTime(analytics.totalTimeSpent)}</p>
          <p className="text-xs text-muted-foreground mt-2">
            {Math.round(analytics.totalTimeSpent / 60)} hours of learning
          </p>
        </div>

        {/* Completion Speed */}
        <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Completion Speed</p>
            <TrendingUp size={16} className="text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-purple-300">
            {analytics.averageCompletionTime > 0 ? `${analytics.averageCompletionTime}h` : 'N/A'}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {getCompletionSpeedLabel(analytics.averageCompletionTime)}
          </p>
        </div>

        {/* Topics Restarted */}
        <div className="p-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Topics Restarted</p>
            <AlertCircle size={16} className="text-orange-400" />
          </div>
          <p className="text-3xl font-bold text-orange-300">{analytics.topicsRestarted}</p>
          <p className="text-xs text-muted-foreground mt-2">
            {analytics.topicsRestarted === 0
              ? 'Great focus!'
              : 'Consider reviewing these topics'}
          </p>
        </div>

        {/* Weak Areas Count */}
        <div className="p-4 bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Weak Areas</p>
            <AlertCircle size={16} className="text-red-400" />
          </div>
          <p className="text-3xl font-bold text-red-300">{weakAreas.length}</p>
          <p className="text-xs text-muted-foreground mt-2">
            {weakAreas.length === 0
              ? 'All areas strong!'
              : 'Topics needing focus'}
          </p>
        </div>
      </div>

      {/* Weak Areas Breakdown */}
      {weakAreas.length > 0 && (
        <div className="border-t border-border/50 pt-6 space-y-3">
          <h4 className="font-label text-cyan-400 text-sm uppercase tracking-wider">Areas Needing Focus</h4>
          <div className="space-y-2">
            {weakAreas.map((area) => (
              <div key={area.stageId} className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {stageNames[area.stageId] || `Stage ${area.stageId}`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {area.count} resource{area.count !== 1 ? 's' : ''} in progress
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                      style={{ width: `${Math.min((area.count / 5) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-muted-foreground w-6 text-right">{area.count}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground p-3 bg-slate-800/50 rounded-lg">
            💡 Tip: Focus on completing these topics to improve your overall progress.
          </p>
        </div>
      )}

      {/* Learning Insights */}
      <div className="border-t border-border/50 pt-6 space-y-3">
        <h4 className="font-label text-cyan-400 text-sm uppercase tracking-wider">Learning Insights</h4>
        <div className="space-y-2">
          {analytics.totalTimeSpent > 0 && (
            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-300">
                ✨ You've invested <strong>{formatTime(analytics.totalTimeSpent)}</strong> in learning. Keep it up!
              </p>
            </div>
          )}
          {analytics.topicsRestarted === 0 && analytics.totalTimeSpent > 0 && (
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-sm text-green-300">
                🎯 Excellent focus! You haven't restarted any topics. Stay consistent!
              </p>
            </div>
          )}
          {weakAreas.length > 0 && (
            <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
              <p className="text-sm text-orange-300">
                ⚠️ You have <strong>{weakAreas.length}</strong> area{weakAreas.length !== 1 ? 's' : ''} needing attention. Consider dedicating more time to these.
              </p>
            </div>
          )}
          {analytics.totalTimeSpent === 0 && (
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <p className="text-sm text-cyan-300">
                🚀 Start your learning journey! Mark resources as "Watching" to track your progress.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
