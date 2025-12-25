# Task Manager App

A modern, feature-rich Task Manager application built with React, TypeScript, and Vite. This application demonstrates advanced React patterns including custom hooks, Context API, performance optimization, and modern CSS features.

## Features

### Basic Features

- ✅ Add tasks with validation
- ✅ Mark tasks as completed
- ✅ Delete tasks
- ✅ Filter tasks (All, Completed, Pending)
- ✅ Persistent storage using Local Storage

### Advanced React Features

- **Custom Hooks**: `useLocalStorage` hook for managing localStorage operations
- **Context API**: Task and Theme contexts to avoid prop drilling
- **Performance Optimization**:
  - `React.memo` for component memoization
  - `useCallback` for function memoization
  - `useMemo` for computed values
- **Form Validation**: Prevents empty tasks and enforces character limits

### Advanced CSS Features

- **Theming**: Dark Mode / Light Mode toggle with smooth transitions
- **Animations**: CSS transitions for adding/removing tasks
- **Responsive Design**: Mobile-first approach with breakpoints
- **Drag-and-Drop**: Reorder tasks using `react-beautiful-dnd`

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **react-beautiful-dnd** - Drag and drop functionality
- **CSS3** - Styling with CSS variables for theming

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd assignment
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
assignment/
├── src/
│   ├── components/          # React components
│   │   ├── TaskForm.tsx     # Task input form with validation
│   │   ├── TaskList.tsx     # Task list with drag-and-drop
│   │   ├── TaskItem.tsx     # Individual task item
│   │   ├── FilterButtons.tsx # Filter controls
│   │   └── ThemeToggle.tsx  # Theme switcher
│   ├── context/             # React Context providers
│   │   ├── TaskContext.tsx  # Task state management
│   │   └── ThemeContext.tsx # Theme state management
│   ├── hooks/               # Custom React hooks
│   │   └── useLocalStorage.ts # LocalStorage hook
│   ├── types/               # TypeScript type definitions
│   │   └── task.ts          # Task interface
│   ├── App.tsx              # Main app component
│   ├── App.css              # App styles with theming
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## Key Implementation Details

### Custom Hook: `useLocalStorage`

- Manages localStorage operations with React state
- Handles JSON serialization/deserialization
- Provides error handling

### Context API

- **TaskContext**: Manages all task-related operations (add, toggle, delete, reorder)
- **ThemeContext**: Manages theme state and persistence

### Performance Optimizations

- Components wrapped with `React.memo` to prevent unnecessary re-renders
- Callbacks memoized with `useCallback`
- Computed values memoized with `useMemo`

### Theming System

- CSS variables for dynamic theming
- Smooth transitions between themes
- Theme preference persisted in localStorage

### Drag and Drop

- Implemented using `react-beautiful-dnd`
- Tasks can be reordered by dragging
- Visual feedback during drag operations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)


