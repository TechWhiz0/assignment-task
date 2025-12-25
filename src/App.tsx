import React, { useState, useMemo, useCallback } from 'react';
import { TaskProvider } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';
import { useTaskContext } from './context/TaskContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterButtons, { FilterType } from './components/FilterButtons';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

const AppContent: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const { tasks } = useTaskContext();

  const taskCounts = useMemo(() => ({
    all: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  }), [tasks]);

  const handleFilterChange = useCallback((newFilter: FilterType) => {
    setFilter(newFilter);
  }, []);

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">Task Manager</h1>
          <ThemeToggle />
        </header>

        <main className="app-main">
          <TaskForm />
          
          <FilterButtons
            currentFilter={filter}
            onFilterChange={handleFilterChange}
            taskCounts={taskCounts}
          />

          <TaskList filter={filter} />
        </main>

        <footer className="app-footer">
          <p>Total: {taskCounts.all} | Pending: {taskCounts.pending} | Completed: {taskCounts.completed}</p>
        </footer>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <TaskProvider>
        <AppContent />
      </TaskProvider>
    </ThemeProvider>
  );
};

export default App;
