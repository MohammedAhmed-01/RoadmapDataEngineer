import { Target, Plus, X, Check } from 'lucide-react';
import { useState } from 'react';
import { WeeklyGoal, DailyChecklistItem } from '@/hooks/useAdvancedTracking';

/**
 * Goals & Daily Checklist Panel
 * Manage weekly goals and daily learning checklist
 */

interface GoalsPanelProps {
  weeklyGoals: WeeklyGoal[];
  dailyChecklist: DailyChecklistItem[];
  streakDays: number;
  onAddGoal: (title: string, description: string, targetDate: string) => void;
  onToggleGoal: (goalId: string) => void;
  onDeleteGoal: (goalId: string) => void;
  onAddChecklistItem: (title: string) => void;
  onToggleChecklistItem: (itemId: string) => void;
}

export default function GoalsPanel({
  weeklyGoals,
  dailyChecklist,
  streakDays,
  onAddGoal,
  onToggleGoal,
  onDeleteGoal,
  onAddChecklistItem,
  onToggleChecklistItem,
}: GoalsPanelProps) {
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalDesc, setNewGoalDesc] = useState('');
  const [newGoalDate, setNewGoalDate] = useState('');
  const [newChecklistItem, setNewChecklistItem] = useState('');

  const handleAddGoal = () => {
    if (newGoalTitle && newGoalDate) {
      onAddGoal(newGoalTitle, newGoalDesc, newGoalDate);
      setNewGoalTitle('');
      setNewGoalDesc('');
      setNewGoalDate('');
    }
  };

  const handleAddChecklistItem = () => {
    if (newChecklistItem) {
      onAddChecklistItem(newChecklistItem);
      setNewChecklistItem('');
    }
  };

  const completedGoals = weeklyGoals.filter((g) => g.completed).length;
  const completedChecklist = dailyChecklist.filter((c) => c.completed).length;

  return (
    <div className="card-glass p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Target className="text-cyan-400" size={24} />
        <h3 className="font-heading text-xl text-white">Goals & Tracking</h3>
      </div>

      {/* Streak Counter */}
      <div className="p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Learning Streak</p>
            <p className="text-3xl font-bold text-orange-400">{streakDays} 🔥</p>
          </div>
          <p className="text-xs text-muted-foreground text-right">Keep learning daily<br />to maintain your streak!</p>
        </div>
      </div>

      {/* Weekly Goals */}
      <div className="space-y-3 border-t border-border/50 pt-6">
        <div className="flex items-center justify-between">
          <h4 className="font-label text-cyan-400 text-sm uppercase tracking-wider">Weekly Goals</h4>
          <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">
            {completedGoals}/{weeklyGoals.length}
          </span>
        </div>

        {/* Add new goal */}
        <div className="space-y-2 p-3 bg-slate-800/50 rounded-lg">
          <input
            type="text"
            placeholder="Goal title (e.g., 'Finish SQL joins')"
            value={newGoalTitle}
            onChange={(e) => setNewGoalTitle(e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-border/50 rounded text-foreground text-sm placeholder-muted-foreground"
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={newGoalDesc}
            onChange={(e) => setNewGoalDesc(e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-border/50 rounded text-foreground text-sm placeholder-muted-foreground"
          />
          <input
            type="date"
            value={newGoalDate}
            onChange={(e) => setNewGoalDate(e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-border/50 rounded text-foreground text-sm"
          />
          <button
            onClick={handleAddGoal}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded font-medium transition-smooth text-sm"
          >
            <Plus size={16} />
            Add Goal
          </button>
        </div>

        {/* Goals list */}
        <div className="space-y-2">
          {weeklyGoals.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-3">No goals yet. Create one to get started!</p>
          ) : (
            weeklyGoals.map((goal) => (
              <div
                key={goal.id}
                className={`flex items-start gap-3 p-3 rounded-lg transition-smooth ${
                  goal.completed ? 'bg-green-500/10 border border-green-500/30' : 'bg-slate-800/50 border border-border/50'
                }`}
              >
                <button
                  onClick={() => onToggleGoal(goal.id)}
                  className={`flex-shrink-0 w-5 h-5 rounded border-2 transition-all mt-0.5 ${
                    goal.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-slate-600 hover:border-cyan-400'
                  }`}
                >
                  {goal.completed && <Check size={16} className="text-slate-900" />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${goal.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {goal.title}
                  </p>
                  {goal.description && (
                    <p className="text-xs text-muted-foreground mt-1">{goal.description}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Target: {new Date(goal.targetDate).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => onDeleteGoal(goal.id)}
                  className="flex-shrink-0 text-muted-foreground hover:text-destructive transition-smooth"
                >
                  <X size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Daily Checklist */}
      <div className="space-y-3 border-t border-border/50 pt-6">
        <div className="flex items-center justify-between">
          <h4 className="font-label text-cyan-400 text-sm uppercase tracking-wider">Today's Checklist</h4>
          <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">
            {completedChecklist}/{dailyChecklist.length}
          </span>
        </div>

        {/* Add new checklist item */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a task..."
            value={newChecklistItem}
            onChange={(e) => setNewChecklistItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddChecklistItem()}
            className="flex-1 px-3 py-2 bg-slate-700 border border-border/50 rounded text-foreground text-sm placeholder-muted-foreground"
          />
          <button
            onClick={handleAddChecklistItem}
            className="px-3 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded font-medium transition-smooth"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Checklist items */}
        <div className="space-y-2">
          {dailyChecklist.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-3">No tasks for today. Add one to get started!</p>
          ) : (
            dailyChecklist.map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-3 p-2 rounded transition-smooth ${
                  item.completed ? 'bg-green-500/10' : 'bg-slate-800/50'
                }`}
              >
                <button
                  onClick={() => onToggleChecklistItem(item.id)}
                  className={`flex-shrink-0 w-5 h-5 rounded border-2 transition-all ${
                    item.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-slate-600 hover:border-cyan-400'
                  }`}
                >
                  {item.completed && <Check size={16} className="text-slate-900" />}
                </button>
                <span
                  className={`text-sm flex-1 ${
                    item.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                  }`}
                >
                  {item.title}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
