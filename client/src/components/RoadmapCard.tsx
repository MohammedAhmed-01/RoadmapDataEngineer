import { ChevronDown, ChevronUp, ExternalLink, Check } from 'lucide-react';
import { useState } from 'react';
import { RoadmapStage } from '@/lib/roadmapData';

/**
 * RoadmapCard Component
 * Displays individual learning stages with expandable resources
 * Includes checkboxes for tracking completed resources
 */

interface RoadmapCardProps {
  stage: RoadmapStage;
  index: number;
  onResourceToggle: (resourceId: string) => void;
  isResourceCompleted: (resourceId: string) => boolean;
  stageProgress: number;
}

export default function RoadmapCard({
  stage,
  index,
  onResourceToggle,
  isResourceCompleted,
  stageProgress,
}: RoadmapCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <div className={`flex items-center gap-8 mb-16 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Timeline dot and line */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-500/50"></div>
          {/* Progress ring */}
          {stageProgress > 0 && (
            <div className="absolute inset-0 w-4 h-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 16 16">
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-slate-600"
                />
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray={`${(stageProgress / 100) * 37.7} 37.7`}
                  className="text-cyan-400 transition-all duration-500"
                />
              </svg>
            </div>
          )}
        </div>
        {index < 10 && <div className="w-1 h-24 bg-gradient-to-b from-cyan-400 to-transparent mt-4"></div>}
      </div>

      {/* Card content */}
      <div className="flex-1">
        <div
          className="card-glass hover:shadow-xl hover:shadow-cyan-500/20 cursor-pointer transition-smooth group overflow-hidden"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Background image with overlay */}
          <div className="relative h-32 overflow-hidden">
            <img
              src={stage.backgroundImage}
              alt={stage.title}
              className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-smooth"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-800/60"></div>

            {/* Header content */}
            <div className="absolute inset-0 flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{stage.icon}</span>
                <div>
                  <h3 className="font-heading text-white text-xl">{stage.title}</h3>
                  <p className="text-cyan-300 text-sm mt-1">Stage {stage.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Stage Progress Badge */}
                {stageProgress > 0 && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/20 rounded-full border border-cyan-500/30">
                    <Check size={14} className="text-cyan-400" />
                    <span className="text-xs font-semibold text-cyan-300">{stageProgress}%</span>
                  </div>
                )}
                <div className="text-cyan-400 group-hover:scale-110 transition-smooth">
                  {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-6 border-t border-border/50">
            <p className="text-muted-foreground text-sm leading-relaxed">{stage.description}</p>
          </div>

          {/* Expandable resources section */}
          {isExpanded && (
            <div className="px-6 pb-6 border-t border-border/50 animate-in fade-in slide-in-from-top-2 duration-300">
              <h4 className="font-label text-cyan-400 mb-4 uppercase tracking-wider">Learning Resources</h4>
              <div className="space-y-3">
                {stage.resources.map((resource) => {
                  const isCompleted = isResourceCompleted(resource.id);
                  return (
                    <div
                      key={resource.id}
                      className="flex items-center gap-3 p-3 bg-slate-800/50 hover:bg-slate-700/70 rounded-md transition-smooth group/link"
                    >
                      {/* Checkbox */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onResourceToggle(resource.id);
                        }}
                        className={`flex-shrink-0 w-5 h-5 rounded border-2 transition-all ${
                          isCompleted
                            ? 'bg-gradient-to-r from-cyan-400 to-blue-500 border-cyan-400'
                            : 'border-slate-600 hover:border-cyan-400'
                        }`}
                      >
                        {isCompleted && <Check size={16} className="text-slate-900 m-auto" />}
                      </button>

                      {/* Resource info */}
                      <div className="flex items-center justify-between flex-1 min-w-0">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`flex-1 text-sm ${
                            isCompleted
                              ? 'text-muted-foreground line-through'
                              : 'text-foreground group-hover/link:text-cyan-300'
                          } transition-smooth hover:text-cyan-300`}
                        >
                          {resource.name}
                        </a>
                        <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded ml-2 flex-shrink-0">
                          {resource.type === 'playlist' ? '📹 Playlist' : '🎥 Video'}
                        </span>
                      </div>

                      {/* External link icon */}
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-muted-foreground group-hover/link:text-cyan-400 transition-smooth flex-shrink-0"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  );
                })}
              </div>

              {/* Stage completion message */}
              {stageProgress === 100 && (
                <div className="mt-4 p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-xs text-green-300 font-semibold">✓ Stage completed! Great work!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
