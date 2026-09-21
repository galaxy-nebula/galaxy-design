import React from 'react';
import { cn } from '@/lib/utils';
import { FileDiffCard } from './FileDiffCard';
import type { DiffReviewProps } from './types';

export const DiffReview: React.FC<DiffReviewProps> = ({
  files,
  onAccept,
  onReject,
  onAcceptAll,
  onRejectAll,
  className,
}) => {
  const pending = files.filter((f) => f.status === 'pending').length;
  const additions = files.reduce((sum, f) => sum + f.additions, 0);
  const deletions = files.reduce((sum, f) => sum + f.deletions, 0);

  return (
    <div
      className={cn(
        'w-full max-w-lg space-y-3 rounded-lg border bg-card p-4 text-card-foreground shadow-sm',
        className
      )}
    >
      {/* Summary */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Review changes</h3>
          <p className="text-xs text-muted-foreground">
            {files.length} files ·{' '}
            <span className="text-emerald-600 dark:text-emerald-400">
              +{additions}
            </span>{' '}
            <span className="text-red-600 dark:text-red-400">
              −{deletions}
            </span>
            {pending > 0 && ` · ${pending} pending`}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onAcceptAll}
            className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={onRejectAll}
            className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-accent"
          >
            Reject all
          </button>
        </div>
      </div>

      {/* Files */}
      <div className="space-y-2">
        {files.map((file) => (
          <FileDiffCard key={file.path} file={file} onAccept={onAccept} onReject={onReject} />
        ))}
      </div>
    </div>
  );
};
