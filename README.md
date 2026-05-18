# CalendarHub 🦉

A modern, dark-themed event scheduler and calendar app built with React 19, TypeScript, Vite, and Tailwind CSS v4.

![CalendarHub](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)

## Features

- **Monthly Calendar View** — Navigate between months with smooth controls
- **Event Management** — Add, edit, and delete events with a clean modal form
- **Event Details** — Title, date, time, description, and color coding
- **Recurring Events** — Support for daily, weekly, monthly, and yearly recurring events
- **Event List View** — See all upcoming events grouped by date
- **Today Highlighting** — Current day is prominently highlighted
- **Dark Theme** — Beautiful dark UI with `#0a0a0f` background
- **Persistent Storage** — Events saved to localStorage
- **Responsive Design** — Works on desktop and mobile

## Tech Stack

- **React 19** with TypeScript
- **Vite** for blazing fast builds
- **Tailwind CSS v4** for styling
- **date-fns** for date manipulation
- **lucide-react** for icons
- **clsx** + **tailwind-merge** for class management

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── CalendarGrid.tsx   # Monthly calendar grid
│   ├── EventForm.tsx      # Add/edit event modal
│   ├── EventList.tsx      # Upcoming events list
│   └── Header.tsx         # Navigation header
├── hooks/
│   └── useEvents.ts       # Event state management
├── types/
│   └── index.ts           # TypeScript types
├── utils/
│   ├── colors.ts          # Event color utilities
│   └── dateUtils.ts       # Date helper functions
├── App.tsx                # Main app component
├── main.tsx               # Entry point
└── index.css              # Global styles + Tailwind
```

## Usage

- **Navigate months** — Use the arrow buttons or "Today" button
- **Select a date** — Click any day to select it
- **Add an event** — Double-click a day or click "Add Event"
- **Edit/Delete** — Use the event form or hover actions in list view
- **Switch views** — Toggle between calendar and list view in the header

## License

MIT
