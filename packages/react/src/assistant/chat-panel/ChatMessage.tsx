import React from 'react';
import { cn } from '@/lib/utils';
import { ToolCallCard } from './ToolCallCard';
import type { AssistantChatMessage } from './types';

export const ChatMessage: React.FC<{ message: AssistantChatMessage }> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex gap-3', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-primary/10 text-xs font-semibold">
          AI
        </div>
      )}
      <div className={cn('max-w-[80%] space-y-2', isUser && 'items-end')}>
        <div
          className={cn(
            'rounded-lg px-3 py-2 text-sm',
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-foreground',
            message.streaming && 'animate-pulse'
          )}
        >
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
          {message.streaming && (
            <span className="ml-1 inline-block h-3 w-1.5 animate-blink bg-current" />
          )}
        </div>
        {message.toolCalls?.map((toolCall) => (
          <ToolCallCard key={toolCall.id} toolCall={toolCall} />
        ))}
      </div>
    </div>
  );
};
