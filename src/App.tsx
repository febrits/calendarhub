import { useState } from 'react';
import type { CalendarEvent, ViewMode } from './types';
import { useEvents } from './hooks/useEvents';
import { Header } from './components/Header';
import { CalendarGrid } from './components/CalendarGrid';
import { EventList } from './components/EventList';
import { EventForm } from './components/EventForm';
import { formatDate } from './utils/dateUtils';

function App() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  const { events, addEvent, updateEvent, deleteEvent } = useEvents();

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() - 1);
      return d;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + 1);
      return d;
    });
  };

  const handleToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const handleDayDoubleClick = (date: Date) => {
    setSelectedDate(date);
    setEditingEvent(null);
    setShowForm(true);
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setShowForm(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEvent(null);
  };

  const selectedDateStr = formatDate(selectedDate);

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <Header
        currentMonth={currentMonth}
        viewMode={viewMode}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
        onViewChange={setViewMode}
        onAddEvent={handleAddEvent}
      />

      <main className="flex-1 overflow-auto">
        {viewMode === 'calendar' ? (
          <div className="h-full">
            <CalendarGrid
              currentMonth={currentMonth}
              selectedDate={selectedDate}
              events={events}
              onSelectDate={handleSelectDate}
              onDayDoubleClick={handleDayDoubleClick}
            />
          </div>
        ) : (
          <EventList
            events={events}
            onEdit={handleEditEvent}
            onDelete={deleteEvent}
          />
        )}
      </main>

      {showForm && (
        <EventForm
          event={editingEvent}
          selectedDate={selectedDateStr}
          onSave={addEvent}
          onUpdate={updateEvent}
          onDelete={deleteEvent}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}

export default App;
