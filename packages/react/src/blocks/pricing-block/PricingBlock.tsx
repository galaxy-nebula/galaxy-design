/**
 * @author Bùi Trọng Hiếu
 * @email kevinbui210191@gmail.com
 * @desc Pricing block - Pricing cards with tiers
 */

import { cn } from '@/lib/utils';

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText?: string;
}

export interface PricingBlockProps {
  tiers: PricingTier[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function PricingBlock({
  tiers,
  title = 'Pricing',
  subtitle = 'Choose a plan that works for you',
  className,
}: PricingBlockProps) {
  return (
    <div className={cn('py-16', className)}>
      <div className="mx-auto max-w-2xl text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              'rounded-lg border bg-card p-6 shadow-sm relative',
              tier.highlighted && 'border-primary ring-2 ring-primary shadow-lg'
            )}
          >
            {tier.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">
                Most Popular
              </span>
            )}
            <h3 className="text-lg font-semibold">{tier.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {tier.description}
            </p>
            <p className="mt-4 text-3xl font-bold">
              {tier.price}
              <span className="text-sm font-normal text-muted-foreground">
                /mo
              </span>
            </p>
            <ul className="mt-6 space-y-2">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <svg
                    className="h-4 w-4 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={cn(
                'mt-6 w-full inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium',
                tier.highlighted
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'border border-input bg-background hover:bg-accent'
              )}
            >
              {tier.ctaText || `Get ${tier.name}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
PricingBlock.displayName = 'PricingBlock';
