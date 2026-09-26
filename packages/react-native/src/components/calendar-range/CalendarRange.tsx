/**
 * @author Bùi Trọng Hiếu
 * @email kevinbui210191@gmail.com
 * @desc Calendar Range - start/end date selection
 */

import * as React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cn } from '@/lib/utils';

export interface CalendarRangeValue {
  start?: Date;
  end?: Date;
}

export interface CalendarRangeProps {
  value?: CalendarRangeValue;
  onChange?: (value: CalendarRangeValue) => void;
  className?: string;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function CalendarRange({ value, onChange, className }: CalendarRangeProps) {
  const [month, setMonth] = React.useState(new Date());
  const [pendingStart, setPendingStart] = React.useState<Date | undefined>(value?.start);

  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay();

  const cells: Array<Date | null> = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(month.getFullYear(), month.getMonth(), d));

  const inRange = (d: Date) =>
    value?.start && value?.end && d >= value.start && d <= value.end;

  const pick = (d: Date) => {
    if (!pendingStart || (value?.start && value?.end)) {
      setPendingStart(d);
      onChange?.({ start: d });
      return;
    }
    if (d < pendingStart) {
      setPendingStart(d);
      onChange?.({ start: d });
      return;
    }
    onChange?.({ start: pendingStart, end: d });
ec  };
  return (
    <View className={cn('p-3 rounded-lg border border-border', className)}>
      <View className="flex-row items-center justify-between mb-3">
        <Pressable className="h-7 w-7 items-center justify-center rounded-md" onPress={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}>
          <Text className="text-muted-foreground">‹</Text>
        </Pressable>
        <Text className="text-sm font-semibold">{MONTHS[month.getMonth()]} {month.getFullYear()}</Text>
        <Pressable className="h-7 w-7 items-center justify-center rounded-md" onPress={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}>
          <Text className="text-muted-foreground">›</Text>
        </Pressable>
      </View>
      <View className="flex-row mb-1">
        {WEEKDAYS.map((d) => (
          <Text key={d} className="w-[14.28%] text-center text-xs text-muted-foreground">{d}</Text>
        ))}
      </View>
      <View className="flex-row flex-wrap">
        {cells.map((d, i) =>
          d ? (
            <Pressable
              key={d.toISOString()}
              onPress={() => pick(d)}
              className={cn(
                'w-[14.28%] h-9 items-center justify-center',
                inRange(d) || d.getTime() === pendingStart?.getTime() ? 'bg-primary rounded-md' : undefined
              )}
            >
              <Text className={cn('text-sm', inRange(d) && 'text-primary-foreground')}>{d.getDate()}</Text>
            </Pressable>
          ) : (
            <View key={`e${i}`} className="w-[14.28%] h-9" />
          )
        )}
      </View>
    </View>
  );
}
