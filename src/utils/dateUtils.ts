import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  parseISO,
  addDays,
  addWeeks,
  addYears,
} from 'date-fns';

import type { CalendarEvent } from '../types';

export function getMonthDays(date: Date): Date[] {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  return eachDayOfInterval({ start: calStart, end: calEnd });
}

export function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function formatMonthYear(date: Date): string {
  return format(date, 'MMMM yyyy');
}

export function isCurrentMonth(date: Date, currentMonth: Date): boolean {
  return isSameMonth(date, currentMonth);
}

export function isTodayDate(date: Date): boolean {
  return isToday(date);
}

export function isSelectedDate(date: Date, selected: Date): boolean {
  return isSameDay(date, selected);
}

export function nextMonth(date: Date): Date {
  return addMonths(date, 1);
}

export function prevMonth(date: Date): Date {
  return subMonths(date, 1);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function getEventsForDate(
  events: CalendarEvent[],
  date: Date
): CalendarEvent[] {
  const dateStr = formatDate(date);
  return events.filter((event) => {
    if (event.date === dateStr) return true;
    if (event.recurring && event.recurring !== 'none') {
      return isRecurringOnDate(event, date);
    }
    return false;
  });
}

function isRecurringOnDate(event: CalendarEvent, date: Date): boolean {
  const eventDate = parseISO(event.date);
  const checkDate = date;

  if (checkDate < eventDate) return false;

  switch (event.recurring) {
    case 'daily':
      return true;
    case 'weekly':
      return eventDate.getDay() === checkDate.getDay();
    case 'monthly':
      return eventDate.getDate() === checkDate.getDate();
    case 'yearly':
      return (
        eventDate.getDate() === checkDate.getDate() &&
        eventDate.getMonth() === checkDate.getMonth()
      );
    default:
      return false;
  }
}

export function getUpcomingEvents(
  events: CalendarEvent[],
  limit = 20
): CalendarEvent[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming: CalendarEvent[] = [];

  for (const event of events) {
    if (event.recurring && event.recurring !== 'none') {
      // Generate next occurrences for recurring events
      const nextDate = getNextRecurringDate(event, today);
      if (nextDate) {
        upcoming.push({ ...event, date: formatDate(nextDate) });
      }
    } else {
      const eventDate = parseISO(event.date);
      if (eventDate >= today) {
        upcoming.push(event);
      }
    }
  }

  upcoming.sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    return (a.time || '').localeCompare(b.time || '');
  });

  return upcoming.slice(0, limit);
}

function getNextRecurringDate(
  event: CalendarEvent,
  from: Date
): Date | null {
  const eventDate = parseISO(event.date);
  let current = eventDate;

  // Safety: don't look more than 2 years ahead
  const maxDate = addYears(from, 2);

  while (current < from) {
    switch (event.recurring) {
      case 'daily':
        current = addDays(current, 1);
        break;
      case 'weekly':
        current = addWeeks(current, 1);
        break;
      case 'monthly':
        current = addMonths(current, 1);
        break;
      case 'yearly':
        current = addYears(current, 1);
        break;
      default:
        return null;
    }
  }

  if (current > maxDate) return null;
  return current;
}


