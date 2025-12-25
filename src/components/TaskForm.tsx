import React, { useState, useCallback, FormEvent } from 'react';
import { useTaskContext } from '../context/TaskContext';
import './TaskForm.css';

const TaskForm: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const { addTask } = useTaskContext();

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const trimmedValue = inputValue.trim();
    
    if (!trimmedValue) {
      setError('Task cannot be empty');
      return;
    }

    if (trimmedValue.length > 200) {
      setError('Task cannot exceed 200 characters');
      return;
    }

    addTask(trimmedValue);
    setInputValue('');
    setError('');
  }, [inputValue, addTask]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (error) {
      setError('');
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="task-form-group">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Add a new task..."
          className={`task-input ${error ? 'error' : ''}`}
          aria-label="Task input"
          aria-invalid={!!error}
          aria-describedby={error ? 'task-error' : undefined}
          maxLength={200}
        />
        <button type="submit" className="task-submit-btn" aria-label="Add task">
          Add Task
        </button>
      </div>
      {error && (
        <div id="task-error" className="task-error" role="alert">
          {error}
        </div>
      )}
    </form>
  );
};

export default TaskForm;
