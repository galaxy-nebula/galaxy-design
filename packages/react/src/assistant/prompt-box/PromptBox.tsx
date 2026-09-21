import React, { useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import type { PromptBoxProps } from './types';

export const PromptBox: React.FC<PromptBoxProps> = ({
  placeholder = 'Type a message…',
  model,
  disabled = false,
  busy = false,
  attachments = [],
  commands = [],
  onSubmit,
  onStop,
  className,
}) => {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeCommand = useMemo(() => {
    if (!value.startsWith('/')) return null;
    const query = value.slice(1).toLowerCase();
    return (
      commands.find((c) => c.name.toLowerCase().startsWith(query)) || null
    );
  }, [value, commands]);

  const submit = () => {
    const content = value.trim();
    if (!content || disabled) return;
    onSubmit?.(content);
    setValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const resize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  return (
    <div
      className={cn(
        'w-full max-w-lg rounded-lg border bg-card text-card-foreground shadow-sm',
        className
      )}
    >
      {/* Attachments */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-1.5 border-b px-3 pt-3">
          {attachments.map((att) => (
            <span
              key={att.id}
              className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs"
            >
              <span className="max-w-[160px] truncate font-medium">{att.name}</span>
              {att.size && (
                <span className="text-muted-foreground">{att.size}</span>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          resize();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        rows={1}
        disabled={disabled}
        placeholder={placeholder}
        className="block w-full resize-none bg-transparent px-3 py-3 text-sm outline-none placeholder:text-muted-foreground"
      />

      {/* Command hint */}
      {activeCommand && (
        <div className="border-t bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground">
          <span className="font-mono font-medium text-foreground">
            /{activeCommand.name}
          </span>{' '}
          — {activeCommand.description}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between border-t px-3 py-2">
        <div className="flex items-center gap-2">
          {model && (
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
              {model}
            </span>
          )}
          <span className="text-[10px] text-muted-foreground">
            Enter to send · Shift+Enter newline
          </span>
        </div>
        <button
          type="button"
          onClick={busy ? () => onStop?.() : submit}
          disabled={disabled || (!busy && !value.trim())}
          className={cn(
            'h-8 rounded-md px-3 text-xs font-medium transition-colors',
            busy
              ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
              : 'bg-primary text-primary-foreground hover:bg-primary/90',
            'disabled:cursor-not-allowed disabled:opacity-50'
          )}
        >
          {busy ? 'Stop' : 'Send'}
        </button>
      </div>
    </div>
  );
};
