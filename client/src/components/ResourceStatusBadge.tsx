import { Play, Clock, CheckCircle2 } from 'lucide-react';
import { ResourceStatus } from '@/hooks/useAdvancedTracking';

/**
 * Resource Status Badge Component
 * Displays the current status of a learning resource
 */

interface ResourceStatusBadgeProps {
  status: ResourceStatus;
  onStatusChange: (status: ResourceStatus) => void;
  timeSpent?: number;
}

export default function ResourceStatusBadge({
  status,
  onStatusChange,
  timeSpent = 0,
}: ResourceStatusBadgeProps) {
  const statusConfig = {
    'not-started': {
      icon: <Play size={14} />,
      label: 'Not Started',
      color: 'bg-slate-600 text-slate-100',
      hoverColor: 'hover:bg-slate-500',
    },
    watching: {
      icon: <Clock size={14} />,
      label: 'Watching',
      color: 'bg-amber-600 text-amber-100',
      hoverColor: 'hover:bg-amber-500',
    },
    completed: {
      icon: <CheckCircle2 size={14} />,
      label: 'Completed',
      color: 'bg-green-600 text-green-100',
      hoverColor: 'hover:bg-green-500',
    },
  };

  const config = statusConfig[status];

  const getNextStatus = (): ResourceStatus => {
    if (status === 'not-started') return 'watching';
    if (status === 'watching') return 'completed';
    return 'not-started';
  };

  return (
    <button
      onClick={() => onStatusChange(getNextStatus())}
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-smooth ${config.color} ${config.hoverColor}`}
      title={`Click to change status. Time spent: ${Math.round(timeSpent / 60)}h ${timeSpent % 60}m`}
    >
      {config.icon}
      <span>{config.label}</span>
      {timeSpent > 0 && <span className="ml-1 opacity-75">({Math.round(timeSpent / 60)}m)</span>}
    </button>
  );
}
