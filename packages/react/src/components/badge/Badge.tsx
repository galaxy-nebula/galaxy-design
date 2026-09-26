/**
 * @author Bùi Trọng Hiếu
 * @email kevinbui210191@gmail.com
 * @desc Badge component - Displays a badge or a component that looks like a badge
 */

import { cn } from '@/lib/utils';
import { badgeVariants, type BadgeProps } from './variants';

/**
 * Badge Component
 * 
 * Displays a badge with customizable variants.
 * Used for status indicators, labels, or tags.
 * 
 * @param {BadgeProps} props - Badge component props
 * @param {string} [props.className] - CSS class names for the badge
 * @param {BadgeProps['variant']} [props.variant='default'] - Visual style variant (default, secondary, destructive, outline, success, warning, info)
 * @param {BadgeProps['size']} [props.size='md'] - Badge size (sm, md, lg)
 * @param {boolean} [props.dismissable] - Whether the badge can be dismissed
 * @param {() => void} [props.onDismiss] - Callback when badge is dismissed
 * @param {React.ReactNode} [props.children] - Badge content
 * @returns {JSX.Element} Badge element
 */
function Badge({ className, variant, size, dismissable, onDismiss, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {props.children}
      {dismissable && (
        <button
          type="button"
          className="ml-1 hover:bg-black/5 rounded p-0.5"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      )}
    </div>
  );
}

export { Badge };
export type { BadgeProps } from './variants';
