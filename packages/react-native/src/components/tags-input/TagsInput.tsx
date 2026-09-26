/**
 * @author Bùi Trọng Hiếu
 * @email kevinbui210191@gmail.com
 * @desc Tags Input - enter tags with chips + remove
 */

import * as React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { cn } from '@/lib/utils';

export interface TagsInputProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function TagsInput({ value = [], onChange, placeholder = 'Add tag...', disabled, className }: TagsInputProps) {
  const [input, setInput] = React.useState('');

  const addTag = () => {
    const tag = input.trim();
    if (!tag || value.includes(tag)) { setInput(''); return; }
    onChange?.([...value, tag]);
    setInput('');
  };

  const removeTag = (tag: string) => onChange?.(value.filter((t) => t !== tag));

  return (
    <View className={cn('flex-row flex-wrap items-center gap-2 rounded-md border border-input bg-background p-2', className)}>
      {value.map((tag) => (
        <View key={tag} className="flex-row items-center gap-1 rounded-md bg-secondary px-2 py-1">
          <Text className="text-sm">{tag}</Text>
          {!disabled && (
            <Pressable onPress={() => removeTag(tag)} hitSlop={8}>
              <Text className="text-muted-foreground">×</Text>
            </Pressable>
          )}
        </View>
      ))}
      <TextInput
        value={input}
        onChangeText={setInput}
        onSubmitEditing={() => { onChange?.([...value, input.trim()]); setInput(''); }}
        onBlur={() => { if (input.trim()) { onChange?.([...value, input.trim()]); setInput(''); } }}
        placeholder={placeholder}
        editable={!disabled}
        className="min-w-[100px] flex-1 text-sm"
      />
    </View>
  );
}
