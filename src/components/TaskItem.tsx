import React, { memo } from 'react';
import { Task } from '../types/task';
import './TaskItem.css';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = memo(({ task, onToggle, onDelete }) => {
  return (
    <div className="task-item" data-completed={task.completed}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="task-checkbox"
        aria-label={`Mark task "${task.text}" as ${task.completed ? 'pending' : 'completed'}`}
      />
      <span className={`task-text ${task.completed ? 'completed' : ''}`}>
        {task.text}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        className="task-delete-btn"
        aria-label={`Delete task "${task.text}"`}
      >
        ×
      </button>
    </div>
  );
});

TaskItem.displayName = 'TaskItem';

export default TaskItem;
