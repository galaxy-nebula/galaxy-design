import React from 'react';
import { cn } from '@/lib/utils';
import type { AgentToolEvent } from './types';

export const ToolCallLog: React.FC<{ events: AgentToolEvent[] }> = ({ events }) => (
  <div className="space-y-1 border-t px-3 py-2 font-mono text-xs">
    {events.map((event) => (
      <div key={event.id} className="flex gap-2">
        <span className="text-muted-foreground">
          {event.timestamp
            ? event.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })
            : '—'}
        </span>
        <span className="text-foreground">{event.name}</span>
        <span className="min-w-0 flex-1 truncate text-muted-foreground">
          {event.summary}
        </span>
      </div>
    ))}
  </div>
);
