import { clsx } from 'clsx';
import type { CalendarEvent } from '../types';
import {
  getMonthDays,
  formatDate,
  isCurrentMonth,
  isTodayDate,
  isSelectedDate,
  getEventsForDate,
} from '../utils/dateUtils';
import { getEventColorClasses } from '../utils/colors';

interface CalendarGridProps {
  currentMonth: Date;
  selectedDate: Date;
  events: CalendarEvent[];
  onSelectDate: (date: Date) => void;
  onDayDoubleClick: (date: Date) => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function CalendarGrid({
  currentMonth,
  selectedDate,
  events,
  onSelectDate,
  onDayDoubleClick,
}: CalendarGridProps) {
  const days = getMonthDays(currentMonth);

  return (
    <div className="flex flex-col h-full">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 border-b border-border">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="py-3 text-center text-xs font-medium text-text-muted uppercase tracking-wider"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 flex-1 auto-rows-fr">
        {days.map((day, idx) => {
          const dateStr = formatDate(day);
          const dayEvents = getEventsForDate(events, day);
          const inMonth = isCurrentMonth(day, currentMonth);
          const today = isTodayDate(day);
          const selected = isSelectedDate(day, selectedDate);

          return (
            <div
              key={`${dateStr}-${idx}`}
              onClick={() => onSelectDate(day)}
              onDoubleClick={() => onDayDoubleClick(day)}
              className={clsx(
                'relative border-b border-r border-border p-1.5 cursor-pointer transition-colors group min-h-[80px]',
                !inMonth && 'opacity-30',
                selected && 'bg-accent-bg',
                !selected && 'hover:bg-bg-tertiary'
              )}
            >
              {/* Day number */}
              <div className="flex items-center justify-between">
                <span
                  className={clsx(
                    'inline-flex items-center justify-center w-7 h-7 text-sm rounded-full transition-colors',
                    today && 'bg-today text-bg-primary font-bold',
                    selected && !today && 'bg-accent text-white font-medium',
                    !today && !selected && 'text-text-secondary group-hover:text-text-primary'
                  )}
                >
                  {day.getDate()}
                </span>
              </div>

              {/* Events */}
              <div className="mt-0.5 space-y-0.5 overflow-hidden">
                {dayEvents.slice(0, 3).map((event) => {
                  const colors = getEventColorClasses(event.color);
                  return (
                    <div
                      key={event.id}
                      className={clsx(
                        'text-xs px-1.5 py-0.5 rounded truncate',
                        colors.bg,
                        colors.text
                      )}
                    >
                      {event.time && (
                        <span className="font-medium">{event.time} </span>
                      )}
                      {event.title}
                    </div>
                  );
                })}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-text-muted px-1.5">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
