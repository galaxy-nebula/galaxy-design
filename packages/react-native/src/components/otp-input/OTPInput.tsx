/**
 * @author Bùi Trọng Hiếu
 * @email kevinbui210191@gmail.com
 * @desc OTP Input - 4-6 digit one-time password input with auto-focus
 */

import * as React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { cn } from '@/lib/utils';

export interface OTPInputProps {
  length?: number;
  value?: string;
  onValueChange?: (value: string | undefined) => void;
  disabled?: boolean;
  className?: string;
}

export function OTPInput({ length = 6, value, onValueChange, disabled, className }: OTPInputProps) {
  const digits = Array.from({ length }, (_, i) => value?.[i] ?? '');
  const refs = React.useRef<Array<TextInput | null>>([]);

  const setDigit = (index: number, char: string) => {
    const next = [...digits];
    next[index] = char;
    const joined = next.join('').slice(0, length);
    onValueChange?.(joined.length === length ? joined : joined || undefined);
    if (char && index < length - 1) refs.current[index + 1]?.focus();
  };

  const handleKey = (index: number, key: string) => {
    if (key === 'Backspace' && !digits[index] && index > 0) refs.current[index - 1]?.focus();
  };

  return (
    <View className={cn('flex-row items-center gap-2', className)}>
      {digits.map((digit, i) => (
        <TextInput
          key={i}
          ref={(r) => { refs.current[i] = r; }}
          value={digit}
          editable={!disabled}
          keyboardType="number-pad"
          maxLength={1}
          onChangeText={(t) => setDigit(i, t.replace(/[^0-9]/g, ''))}
          onKeyPress={({ nativeEvent }) => handleKey(i, nativeEvent.key)}
          className={cn(
            'h-12 w-10 rounded-md border border-border bg-background text-center text-lg font-medium',
            digit && 'border-primary'
          )}
        />
      ))}
    </View>
  );
}
