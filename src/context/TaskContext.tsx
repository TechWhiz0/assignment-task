import React, { createContext, useContext, useCallback, useMemo, ReactNode } from 'react';
import { Task } from '../types/task';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface TaskContextType {
  tasks: Task[];
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  reorderTasks: (startIndex: number, endIndex: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);

  const addTask = useCallback((text: string) => {
    const newTask: Task = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }, [setTasks]);

  const toggleTask = useCallback((id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, [setTasks]);

  const deleteTask = useCallback((id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, [setTasks]);

  const reorderTasks = useCallback((startIndex: number, endIndex: number) => {
    setTasks((prevTasks) => {
      const result = Array.from(prevTasks);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  }, [setTasks]);

  const value = useMemo(
    () => ({
      tasks,
      addTask,
      toggleTask,
      deleteTask,
      reorderTasks,
    }),
    [tasks, addTask, toggleTask, deleteTask, reorderTasks]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
