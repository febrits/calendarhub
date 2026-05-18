export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string; // HH:mm
  description?: string;
  color: EventColor;
  recurring?: RecurringType;
}

export type RecurringType = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export type EventColor =
  | 'purple'
  | 'blue'
  | 'green'
  | 'red'
  | 'orange'
  | 'pink'
  | 'teal'
  | 'yellow';

export type ViewMode = 'calendar' | 'list';
