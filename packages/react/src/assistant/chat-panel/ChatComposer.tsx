import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface ChatComposerProps {
  placeholder?: string;
  disabled?: boolean;
  busy?: boolean;
  onSend?: (content: string) => void;
  onStop?: () => void;
  className?: string;
}

export const ChatComposer: React.FC<ChatComposerProps> = ({
  placeholder = 'Ask anything…',
  disabled = false,
  busy = false,
  onSend,
  className,
}) => {
  const [value, setValue] = useState('');

  const submit = () => {
    const content = value.trim();
    if (!content || disabled) return;
    onSend?.(content);
    setValue('');
  };

  return (
    <div className={cn('flex items-end gap-2 border-t p-3', className)}>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        rows={1}
        disabled={disabled}
        placeholder={placeholder}
        className="max-h-32 min-h-[38px] flex-1 resize-none rounded-md border bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
      />
      <button
        type="button"
        onClick={busy ? () => onStop?.() : submit}
        disabled={disabled || (!busy && !value.trim())}
        className={cn(
          'h-9 rounded-md px-3 text-sm font-medium transition-colors',
          busy
            ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
            : 'bg-primary text-primary-foreground hover:bg-primary/90',
          'disabled:cursor-not-allowed disabled:opacity-50'
        )}
      >
        {busy ? 'Stop' : 'Send'}
      </button>
    </div>
  );
};
