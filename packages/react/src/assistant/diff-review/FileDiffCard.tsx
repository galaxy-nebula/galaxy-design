import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import type { DiffFile } from './types';

export const FileDiffCard: React.FC<{
  file: DiffFile;
  onAccept?: (path: string) => void;
  onReject?: (path: string) => void;
}> = ({ file, onAccept, onReject }) => {
  const [open, setOpen] = useState(false);
  const fileName = file.path.split('/').pop() || file.path;
  const dir = file.path.slice(0, file.path.length - fileName.length);

  return (
    <div className="overflow-hidden rounded-md border">
      {/* File header */}
      <div className="flex items-center gap-2 bg-muted/40 px-3 py-2">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="min-w-0 flex-1 text-left"
        >
          <span className="block truncate text-sm font-medium">{fileName}</span>
          <span className="block truncate text-xs text-muted-foreground">
            {dir || 'root'}
          </span>
        </button>
        <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
          +{file.additions}
        </span>
        <span className="font-mono text-xs text-red-600 dark:text-red-400">
          −{file.deletions}
        </span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => onAccept?.(file.path)}
            disabled={file.status !== 'pending'}
            className={cn(
              'rounded px-2 py-1 text-xs font-medium transition-colors',
              file.status === 'accepted'
                ? 'bg-emerald-600 text-white'
                : 'border hover:bg-accent',
              'disabled:cursor-not-allowed disabled:opacity-40'
            )}
          >
            ✓
          </button>
          <button
            type="button"
            onClick={() => onReject?.(file.path)}
            disabled={file.status !== 'pending'}
            className={cn(
              'rounded px-2 py-1 text-xs font-medium transition-colors',
              file.status === 'rejected'
                ? 'bg-red-600 text-white'
                : 'border hover:bg-accent',
              'disabled:cursor-not-allowed disabled:opacity-40'
            )}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Diff body */}
      {open && (
        <div className="overflow-x-auto bg-background font-mono text-xs">
          {file.lines.map((line, i) => (
            <div
              key={i}
              className={cn(
                'whitespace-pre px-3 py-0.5',
                line.startsWith('+') && 'bg-emerald-500/10 text-emerald-900 dark:text-emerald-200',
                line.startsWith('-') && 'bg-red-500/10 text-red-900 dark:text-red-200',
                !line.startsWith('+') && !line.startsWith('-') && 'text-muted-foreground'
              )}
            >
              {line || ' '}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
