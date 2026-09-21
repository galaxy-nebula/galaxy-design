import React from 'react';
import { cn } from '@/lib/utils';
import type { AgentTask } from './types';

const statusIcon: Record<AgentTask['status'], string> = {
  pending: '○',
  running: '◌',
  completed: '✓',
  error: '✕',
};

const statusColor: Record<AgentTask['status'], string> = {
  pending: 'text-muted-foreground',
  running: 'text-blue-500 animate-pulse',
  completed: 'text-emerald-500',
  error: 'text-red-500',
};

export const AgentTaskItem: React.FC<{ task: AgentTask }> = ({ task }) => (
  <div className="flex items-start gap-3 px-3 py-2">
    <span className={cn('mt-0.5 font-mono text-xs', statusColor[task.status])}>
      {statusIcon[task.status]}
    </span>
    <div className="min-w-0 flex-1">
      <p
        className={cn(
          'text-sm',
          task.status === 'completed' && 'text-muted-foreground line-through',
          task.status === 'pending' && 'text-muted-foreground'
        )}
      >
        {task.label}
      </p>
      {task.detail && (
        <p className="truncate text-xs text-muted-foreground">{task.detail}</p>
      )}
    </div>
  </div>
);
