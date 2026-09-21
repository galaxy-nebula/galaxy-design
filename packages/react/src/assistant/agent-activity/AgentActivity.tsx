import React from 'react';
import { cn } from '@/lib/utils';
import { AgentTaskItem } from './AgentTaskItem';
import { ToolCallLog } from './ToolCallLog';
import type { AgentActivityProps } from './types';

export const AgentActivity: React.FC<AgentActivityProps> = ({
  agentName = 'Agent',
  status = 'idle',
  tasks,
  toolEvents = [],
  elapsedLabel,
  className,
}) => {
  const statusLabel =
    status === 'thinking'
      ? 'Thinking…'
      : status === 'working'
        ? 'Working…'
        : 'Idle';

  const completed = tasks.filter((t) => t.status === 'completed').length;

  return (
    <div
      className={cn(
        'w-full max-w-md overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{agentName}</span>
          <span
            className={cn(
              'rounded-full px-2 py-0.5 text-[10px] font-medium',
              status === 'working' || status === 'thinking'
                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                : 'bg-muted text-muted-foreground'
            )}
          >
            {statusLabel}
          </span>
        </div>
        {elapsedLabel && (
          <span className="text-xs text-muted-foreground">{elapsedLabel}</span>
        )}
      </div>

      {/* Progress */}
      <div className="px-4 pt-3">
        <div className="mb-1 flex justify-between text-xs text-muted-foreground">
          <span>
            {completed}/{tasks.length} tasks
          </span>
          <span>
            {Math.round((completed / Math.max(tasks.length, 1)) * 100)}%
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{
              width: `${(completed / Math.max(tasks.length, 1)) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Task list */}
      <div className="divide-y divide-border/50 py-1">
        {tasks.map((task) => (
          <AgentTaskItem key={task.id} task={task} />
        ))}
      </div>

      {/* Tool log */}
      {toolEvents.length > 0 && <ToolCallLog events={toolEvents} />}
    </div>
  );
};
