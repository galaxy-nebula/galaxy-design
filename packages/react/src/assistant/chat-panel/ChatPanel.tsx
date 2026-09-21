import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ChatMessage } from './ChatMessage';
import { ChatComposer } from './ChatComposer';
import type { ChatPanelProps } from './types';

export const ChatPanel: React.FC<ChatPanelProps> = ({
  title = 'Assistant',
  model,
  messages,
  placeholder,
  disabled = false,
  onSendMessage,
  onStop,
  className,
}) => {
  const busy = messages.some((m) => m.streaming);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      className={cn(
        'flex h-[500px] w-full max-w-sm flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{title}</span>
          {model && (
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
              {model}
            </span>
          )}
        </div>
        <span
          className={cn(
            'h-2 w-2 rounded-full',
            busy ? 'animate-pulse bg-blue-500' : 'bg-emerald-500'
          )}
        />
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Composer */}
      <ChatComposer
        placeholder={placeholder}
        disabled={disabled}
        busy={busy}
        onSend={onSendMessage}
        onStop={onStop}
      />
    </div>
  );
};
