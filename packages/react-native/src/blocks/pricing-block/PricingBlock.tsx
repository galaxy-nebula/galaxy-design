/**
 * @author Bùi Trọng Hiếu
 * @email kevinbui210191@gmail.com
 * @desc Pricing Block - pricing tiers
 */

import * as React from 'react';
import { View, Text, Pressable } from 'react-native';
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
  onSelect?: (tier: PricingTier) => void;
  className?: string;
}

export function PricingBlock({ tiers, title = 'Pricing', subtitle = 'Choose a plan that works for you', onSelect, className }: PricingBlockProps) {
  return (
    <View className={cn('p-6', className)}>
      <Text className="text-3xl font-bold text-center mb-2">{title}</Text>
      <Text className="text-lg text-muted-foreground text-center mb-8">{subtitle}</Text>
      <View className="gap-6">
        {tiers.map((tier) => (
          <View
            key={tier.name}
            className={cn(
              'rounded-lg border border-border bg-card p-6',
              tier.highlighted && 'border-primary ring-2 ring-primary'
            )}
          >
            <Text className="text-lg font-semibold">{tier.name}</Text>
            <Text className="text-sm text-muted-foreground mt-1">{tier.description}</Text>
            <Text className="mt-4 text-3xl font-bold">
              {tier.price}
              <Text className="text-sm font-normal text-muted-foreground">/mo</Text>
            </Text>
            {tier.features.map((f) => (
              <Text key={f} className="mt-2 text-sm">• {f}</Text>
            ))}
            <Pressable
              className={cn(
                'mt-6 h-10 items-center justify-center rounded-md',
                tier.highlighted ? 'bg-primary' : 'border border-input'
              )}
              onPress={() => onSelect?.(tier)}
            >
              <Text className={cn('text-sm font-medium', tier.highlighted && 'text-primary-foreground')}>
                {tier.ctaText || `Get ${tier.name}`}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}
