import { ChevronLeft, ChevronRight, Calendar, List, Plus } from 'lucide-react';
import { formatMonthYear } from '../utils/dateUtils';
import type { ViewMode } from '../types';
import { clsx } from 'clsx';

interface HeaderProps {
  currentMonth: Date;
  viewMode: ViewMode;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onViewChange: (mode: ViewMode) => void;
  onAddEvent: () => void;
}

export function Header({
  currentMonth,
  viewMode,
  onPrevMonth,
  onNextMonth,
  onToday,
  onViewChange,
  onAddEvent,
}: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border-b border-border bg-bg-secondary/50">
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
          <Calendar size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-text-primary leading-tight">
            CalendarHub
          </h1>
          <p className="text-xs text-text-muted">Event Scheduler</p>
        </div>
      </div>

      {/* Center: Month navigation */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToday}
          className="px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-text-primary bg-bg-tertiary hover:bg-border rounded-lg transition-colors"
        >
          Today
        </button>
        <button
          onClick={onPrevMonth}
          className="p-1.5 rounded-lg hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <h2 className="text-sm font-semibold text-text-primary min-w-[140px] text-center">
          {formatMonthYear(currentMonth)}
        </h2>
        <button
          onClick={onNextMonth}
          className="p-1.5 rounded-lg hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Right: View toggle + Add */}
      <div className="flex items-center gap-2">
        <div className="flex bg-bg-tertiary rounded-lg p-0.5">
          <button
            onClick={() => onViewChange('calendar')}
            className={clsx(
              'p-1.5 rounded-md transition-colors',
              viewMode === 'calendar'
                ? 'bg-accent text-white'
                : 'text-text-muted hover:text-text-primary'
            )}
          >
            <Calendar size={16} />
          </button>
          <button
            onClick={() => onViewChange('list')}
            className={clsx(
              'p-1.5 rounded-md transition-colors',
              viewMode === 'list'
                ? 'bg-accent text-white'
                : 'text-text-muted hover:text-text-primary'
            )}
          >
            <List size={16} />
          </button>
        </div>
        <button
          onClick={onAddEvent}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors"
        >
          <Plus size={15} />
          <span className="hidden sm:inline">Add Event</span>
        </button>
      </div>
    </header>
  );
}
