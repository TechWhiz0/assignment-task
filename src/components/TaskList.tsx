import React, { useMemo, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useTaskContext } from '../context/TaskContext';
import { FilterType } from './FilterButtons';
import TaskItem from './TaskItem';
import './TaskList.css';

interface TaskListProps {
  filter: FilterType;
}

const TaskList: React.FC<TaskListProps> = ({ filter }) => {
  const { tasks, toggleTask, deleteTask, reorderTasks } = useTaskContext();

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.completed);
      case 'pending':
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    // Find the actual indices in the full tasks array
    const sourceTask = filteredTasks[result.source.index];
    const destinationTask = filteredTasks[result.destination.index];
    
    const sourceIndex = tasks.findIndex((t) => t.id === sourceTask.id);
    const destinationIndex = tasks.findIndex((t) => t.id === destinationTask.id);

    reorderTasks(sourceIndex, destinationIndex);
  }, [filteredTasks, tasks, reorderTasks]);

  const handleToggle = useCallback((id: string) => {
    toggleTask(id);
  }, [toggleTask]);

  const handleDelete = useCallback((id: string) => {
    deleteTask(id);
  }, [deleteTask]);

  if (filteredTasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>
          {filter === 'all' && 'No tasks yet. Add one above!'}
          {filter === 'completed' && 'No completed tasks.'}
          {filter === 'pending' && 'No pending tasks. Great job!'}
        </p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`task-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
            id="task-list"
          >
            {filteredTasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`task-draggable ${snapshot.isDragging ? 'dragging' : ''}`}
                  >
                    <TaskItem
                      task={task}
                      onToggle={handleToggle}
                      onDelete={handleDelete}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
