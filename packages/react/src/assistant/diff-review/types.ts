export interface DiffFile {
  path: string;
  additions: number;
  deletions: number;
  /** Unified diff lines with +/-/ ' ' prefixes */
  lines: string[];
  status: 'pending' | 'accepted' | 'rejected';
}

export interface DiffReviewProps {
  files: DiffFile[];
  onAccept?: (path: string) => void;
  onReject?: (path: string) => void;
  onAcceptAll?: () => void;
  onRejectAll?: () => void;
  className?: string;
}
