import { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import type { CalendarEvent, EventColor, RecurringType } from '../types';
import { eventColors, getEventColorClasses } from '../utils/colors';
import { clsx } from 'clsx';

interface EventFormProps {
  event?: CalendarEvent | null;
  selectedDate: string;
  onSave: (event: Omit<CalendarEvent, 'id'>) => void;
  onUpdate?: (id: string, updates: Partial<CalendarEvent>) => void;
  onDelete?: (id: string) => void;
  onClose: () => void;
}

export function EventForm({
  event,
  selectedDate,
  onSave,
  onUpdate,
  onDelete,
  onClose,
}: EventFormProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(selectedDate);
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState<EventColor>('purple');
  const [recurring, setRecurring] = useState<RecurringType>('none');

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDate(event.date);
      setTime(event.time || '');
      setDescription(event.description || '');
      setColor(event.color);
      setRecurring(event.recurring || 'none');
    }
  }, [event]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (event && onUpdate) {
      onUpdate(event.id, { title, date, time: time || undefined, description, color, recurring });
    } else {
      onSave({ title, date, time: time || undefined, description, color, recurring });
    }
    onClose();
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-bg-secondary border border-border rounded-2xl w-full max-w-md mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">
            {event ? 'Edit Event' : 'New Event'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-bg-tertiary text-text-muted hover:text-text-primary transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Event Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title..."
              className="w-full px-3 py-2.5 bg-bg-tertiary border border-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
              autoFocus
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-bg-tertiary border border-border rounded-xl text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2.5 bg-bg-tertiary border border-border rounded-xl text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description..."
              rows={2}
              className="w-full px-3 py-2.5 bg-bg-tertiary border border-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors resize-none"
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Color
            </label>
            <div className="flex gap-2 flex-wrap">
              {eventColors.map((c) => {
                const colors = getEventColorClasses(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={clsx(
                      'w-7 h-7 rounded-full transition-all',
                      colors.dot,
                      color === c
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-bg-secondary scale-110'
                        : 'opacity-60 hover:opacity-100'
                    )}
                  />
                );
              })}
            </div>
          </div>

          {/* Recurring */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Repeat
            </label>
            <select
              value={recurring}
              onChange={(e) => setRecurring(e.target.value as RecurringType)}
              className="w-full px-3 py-2.5 bg-bg-tertiary border border-border rounded-xl text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors [color-scheme:dark]"
            >
              <option value="none">No repeat</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            {event && onDelete ? (
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-danger hover:bg-danger-bg rounded-lg transition-colors"
              >
                <Trash2 size={15} />
                Delete
              </button>
            ) : (
              <div />
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm font-medium bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors"
              >
                {event ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
