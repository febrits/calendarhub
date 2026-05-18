import { Calendar, Clock, Repeat, Trash2, Edit3 } from 'lucide-react';
import type { CalendarEvent } from '../types';
import { getUpcomingEvents } from '../utils/dateUtils';
import { getEventColorClasses } from '../utils/colors';
import { clsx } from 'clsx';
import { format, parseISO } from 'date-fns';

interface EventListProps {
  events: CalendarEvent[];
  onEdit: (event: CalendarEvent) => void;
  onDelete: (id: string) => void;
}

export function EventList({ events, onEdit, onDelete }: EventListProps) {
  const upcoming = getUpcomingEvents(events);

  if (upcoming.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-text-muted">
        <Calendar size={48} className="mb-4 opacity-40" />
        <p className="text-lg font-medium text-text-secondary">No upcoming events</p>
        <p className="text-sm mt-1">Double-click a date on the calendar to add one</p>
      </div>
    );
  }

  // Group events by date
  const grouped: Record<string, CalendarEvent[]> = {};
  for (const event of upcoming) {
    if (!grouped[event.date]) grouped[event.date] = [];
    grouped[event.date].push(event);
  }

  return (
    <div className="p-4 space-y-6 max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
        <Calendar size={20} className="text-accent" />
        Upcoming Events
      </h2>

      {Object.entries(grouped).map(([dateStr, dayEvents]) => {
        const date = parseISO(dateStr);
        const isToday =
          format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

        return (
          <div key={dateStr}>
            {/* Date header */}
            <div className="flex items-center gap-2 mb-3">
              <h3
                className={clsx(
                  'text-sm font-semibold',
                  isToday ? 'text-today' : 'text-text-secondary'
                )}
              >
                {isToday ? 'Today' : format(date, 'EEEE')}
              </h3>
              <span className="text-xs text-text-muted">
                {format(date, 'MMM d, yyyy')}
              </span>
              {isToday && (
                <span className="text-xs bg-today-bg text-today px-2 py-0.5 rounded-full font-medium">
                  Today
                </span>
              )}
            </div>

            {/* Events for this date */}
            <div className="space-y-2">
              {dayEvents.map((event) => {
                const colors = getEventColorClasses(event.color);
                return (
                  <div
                    key={event.id}
                    className={clsx(
                      'flex items-start gap-3 p-3 rounded-xl border bg-bg-card hover:bg-bg-tertiary transition-colors group',
                      colors.border
                    )}
                  >
                    {/* Color indicator */}
                    <div className={clsx('w-1 h-full min-h-[40px] rounded-full', colors.dot)} />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-text-primary truncate">
                        {event.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                        {event.time && (
                          <span className="flex items-center gap-1 text-xs text-text-muted">
                            <Clock size={12} />
                            {event.time}
                          </span>
                        )}
                        {event.recurring && event.recurring !== 'none' && (
                          <span className="flex items-center gap-1 text-xs text-text-muted">
                            <Repeat size={12} />
                            {event.recurring}
                          </span>
                        )}
                      </div>
                      {event.description && (
                        <p className="text-xs text-text-muted mt-1 line-clamp-2">
                          {event.description}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(event)}
                        className="p-1.5 rounded-lg hover:bg-bg-secondary text-text-muted hover:text-text-primary transition-colors"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => onDelete(event.id)}
                        className="p-1.5 rounded-lg hover:bg-danger-bg text-text-muted hover:text-danger transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
