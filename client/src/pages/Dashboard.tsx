import { useState } from 'react';
import { LayoutGrid, Calendar, Target, BarChart3 } from 'lucide-react';
import SchedulingPanel from '@/components/SchedulingPanel';
import GoalsPanel from '@/components/GoalsPanel';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import { roadmapData } from '@/lib/roadmapData';
import { useAdvancedTracking } from '@/hooks/useAdvancedTracking';

/**
 * Dashboard Page
 * Comprehensive view of scheduling, goals, and analytics
 */

type DashboardTab = 'overview' | 'schedule' | 'goals' | 'analytics';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const {
    setStageSchedule,
    getStageSchedule,
    addWeeklyGoal,
    toggleWeeklyGoal,
    deleteWeeklyGoal,
    weeklyGoals,
    addDailyChecklistItem,
    toggleDailyChecklistItem,
    dailyChecklist,
    calculateAnalytics,
    getWeakAreas,
    analytics,
    isLoaded,
  } = useAdvancedTracking();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const stageNames = roadmapData.reduce(
    (acc, stage) => {
      acc[stage.id] = stage.title;
      return acc;
    },
    {} as Record<number, string>
  );

  const stages = roadmapData.map((stage) => ({
    id: stage.id,
    title: stage.title,
  }));

  const schedules = roadmapData.reduce(
    (acc, stage) => {
      acc[stage.id] = getStageSchedule(stage.id);
      return acc;
    },
    {} as Record<number, any>
  );

  const calculatedAnalytics = calculateAnalytics(roadmapData.length);
  const weakAreas = getWeakAreas();

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: LayoutGrid },
    { id: 'schedule' as const, label: 'Schedule', icon: Calendar },
    { id: 'goals' as const, label: 'Goals', icon: Target },
    { id: 'analytics' as const, label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl md:text-5xl mb-2">
            Learning <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your progress, set goals, and analyze your learning patterns
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-smooth whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900'
                    : 'bg-slate-800/50 text-muted-foreground hover:bg-slate-700/50'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnalyticsDashboard
                analytics={calculatedAnalytics}
                weakAreas={weakAreas}
                stageNames={stageNames}
              />
              <GoalsPanel
                weeklyGoals={weeklyGoals}
                dailyChecklist={dailyChecklist}
                streakDays={calculatedAnalytics.streakDays}
                onAddGoal={addWeeklyGoal}
                onToggleGoal={toggleWeeklyGoal}
                onDeleteGoal={deleteWeeklyGoal}
                onAddChecklistItem={addDailyChecklistItem}
                onToggleChecklistItem={toggleDailyChecklistItem}
              />
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <SchedulingPanel
              stages={stages}
              schedules={schedules}
              onScheduleChange={setStageSchedule}
            />
          )}

          {/* Goals Tab */}
          {activeTab === 'goals' && (
            <GoalsPanel
              weeklyGoals={weeklyGoals}
              dailyChecklist={dailyChecklist}
              streakDays={calculatedAnalytics.streakDays}
              onAddGoal={addWeeklyGoal}
              onToggleGoal={toggleWeeklyGoal}
              onDeleteGoal={deleteWeeklyGoal}
              onAddChecklistItem={addDailyChecklistItem}
              onToggleChecklistItem={toggleDailyChecklistItem}
            />
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <AnalyticsDashboard
              analytics={calculatedAnalytics}
              weakAreas={weakAreas}
              stageNames={stageNames}
            />
          )}
        </div>

        {/* Quick Links */}
        <div className="mt-12 p-6 card-glass">
          <h3 className="font-heading text-lg mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/"
              className="p-4 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg transition-smooth text-center"
            >
              <p className="font-semibold text-cyan-300 mb-1">Back to Roadmap</p>
              <p className="text-xs text-muted-foreground">Continue learning</p>
            </a>
            <button
              onClick={() => setActiveTab('schedule')}
              className="p-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg transition-smooth text-center"
            >
              <p className="font-semibold text-blue-300 mb-1">Plan Schedule</p>
              <p className="text-xs text-muted-foreground">Set your timeline</p>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className="p-4 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg transition-smooth text-center"
            >
              <p className="font-semibold text-purple-300 mb-1">View Analytics</p>
              <p className="text-xs text-muted-foreground">Track progress</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
