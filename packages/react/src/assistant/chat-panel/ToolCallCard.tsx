import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import type { ChatToolCall } from './types';

const statusIcon: Record<ChatToolCall['status'], string> = {
  running: '◌',
  completed: '✓',
  error: '✕',
};

const statusColor: Record<ChatToolCall['status'], string> = {
  running: 'text-blue-500',
  completed: 'text-emerald-500',
  error: 'text-red-500',
};

export const ToolCallCard: React.FC<{ toolCall: ChatToolCall }> = ({ toolCall }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        'rounded-md border bg-muted/40 text-xs overflow-hidden',
        'transition-colors'
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-muted/60"
      >
        <span className={cn('font-mono', statusColor[toolCall.status])}>
          {statusIcon[toolCall.status]}
        </span>
        <span className="font-medium text-foreground">{toolCall.name}</span>
        {toolCall.status === 'running' && (
          <span className="ml-auto text-muted-foreground">running…</span>
        )}
        {!open && (
          <span className="ml-auto text-muted-foreground">
            {open ? 'hide' : 'details'}
          </span>
        )}
      </button>
      {open && (toolCall.args || toolCall.result) && (
        <div className="space-y-1 border-t bg-background/60 px-3 py-2 font-mono">
          {toolCall.args && (
            <pre className="whitespace-pre-wrap break-all text-muted-foreground">
              {toolCall.args}
            </pre>
          )}
          {toolCall.result && (
            <pre className="whitespace-pre-wrap break-all text-foreground">
              {toolCall.result}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};
