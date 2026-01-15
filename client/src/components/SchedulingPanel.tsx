import { Calendar, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { StageSchedule } from '@/hooks/useAdvancedTracking';

/**
 * Scheduling Panel Component
 * Allows users to set start/end dates and view Gantt-style timeline
 */

interface SchedulingPanelProps {
  stages: Array<{ id: number; title: string }>;
  schedules: Record<number, StageSchedule>;
  onScheduleChange: (stageId: number, startDate: string, endDate: string) => void;
}

export default function SchedulingPanel({
  stages,
  schedules,
  onScheduleChange,
}: SchedulingPanelProps) {
  const [expandedStage, setExpandedStage] = useState<number | null>(null);
  const [startDates, setStartDates] = useState<Record<number, string>>({});
  const [endDates, setEndDates] = useState<Record<number, string>>({});

  const handleSaveSchedule = (stageId: number) => {
    if (startDates[stageId] && endDates[stageId]) {
      onScheduleChange(stageId, startDates[stageId], endDates[stageId]);
      setExpandedStage(null);
    }
  };

  const getGanttPosition = (date: string, minDate: Date, maxDate: Date) => {
    const current = new Date(date).getTime();
    const min = minDate.getTime();
    const max = maxDate.getTime();
    return ((current - min) / (max - min)) * 100;
  };

  // Calculate overall timeline
  const allDates = Object.values(schedules)
    .filter((s) => s.startDate && s.endDate)
    .flatMap((s) => [new Date(s.startDate!), new Date(s.endDate!)]);

  const minDate = allDates.length > 0 ? new Date(Math.min(...allDates.map((d) => d.getTime()))) : new Date();
  const maxDate = allDates.length > 0 ? new Date(Math.max(...allDates.map((d) => d.getTime()))) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

  return (
    <div className="card-glass p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="text-cyan-400" size={24} />
        <h3 className="font-heading text-xl text-white">Learning Schedule</h3>
      </div>

      {/* Gantt Chart */}
      <div className="space-y-3">
        <h4 className="font-label text-cyan-400 text-sm uppercase tracking-wider">Timeline Overview</h4>
        <div className="space-y-2">
          {stages.map((stage) => {
            const schedule = schedules[stage.id];
            if (!schedule?.startDate || !schedule?.endDate) return null;

            const startDate = new Date(schedule.startDate);
            const endDate = new Date(schedule.endDate);
            const startPos = getGanttPosition(schedule.startDate, minDate, maxDate);
            const width = getGanttPosition(schedule.endDate, minDate, maxDate) - startPos;

            return (
              <div key={stage.id} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-24 truncate">{stage.title}</span>
                <div className="flex-1 h-6 bg-slate-800 rounded relative overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded transition-all"
                    style={{
                      left: `${startPos}%`,
                      width: `${Math.max(width, 2)}%`,
                    }}
                  >
                    <div className="h-full flex items-center justify-center text-xs font-semibold text-slate-900 opacity-0 hover:opacity-100 transition-smooth">
                      {schedule.estimatedDuration}d
                    </div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground w-20 text-right">
                  {schedule.estimatedDuration}d
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Schedule Settings */}
      <div className="space-y-3 border-t border-border/50 pt-6">
        <h4 className="font-label text-cyan-400 text-sm uppercase tracking-wider">Set Schedule</h4>
        <div className="space-y-2">
          {stages.map((stage) => (
            <div key={stage.id} className="border border-border/50 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedStage(expandedStage === stage.id ? null : stage.id)}
                className="w-full flex items-center justify-between p-3 hover:bg-slate-800/50 transition-smooth"
              >
                <span className="text-sm font-medium text-foreground">{stage.title}</span>
                <ChevronDown
                  size={18}
                  className={`text-cyan-400 transition-transform ${expandedStage === stage.id ? 'rotate-180' : ''}`}
                />
              </button>

              {expandedStage === stage.id && (
                <div className="p-4 bg-slate-800/50 border-t border-border/50 space-y-3">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-2">Start Date</label>
                    <input
                      type="date"
                      value={startDates[stage.id] || schedules[stage.id]?.startDate?.split('T')[0] || ''}
                      onChange={(e) => setStartDates({ ...startDates, [stage.id]: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-700 border border-border/50 rounded text-foreground text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-2">End Date</label>
                    <input
                      type="date"
                      value={endDates[stage.id] || schedules[stage.id]?.endDate?.split('T')[0] || ''}
                      onChange={(e) => setEndDates({ ...endDates, [stage.id]: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-700 border border-border/50 rounded text-foreground text-sm"
                    />
                  </div>
                  <button
                    onClick={() => handleSaveSchedule(stage.id)}
                    className="w-full px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-semibold rounded hover:shadow-lg hover:shadow-cyan-500/50 transition-smooth text-sm"
                  >
                    Save Schedule
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
