import React, { memo } from 'react';
import './FilterButtons.css';

export type FilterType = 'all' | 'completed' | 'pending';

interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    completed: number;
    pending: number;
  };
}

const FilterButtons: React.FC<FilterButtonsProps> = memo(({ 
  currentFilter, 
  onFilterChange,
  taskCounts 
}) => {
  const filters: { type: FilterType; label: string }[] = [
    { type: 'all', label: 'All' },
    { type: 'pending', label: 'Pending' },
    { type: 'completed', label: 'Completed' },
  ];

  return (
    <div className="filter-buttons" role="tablist" aria-label="Filter tasks">
      {filters.map((filter) => (
        <button
          key={filter.type}
          onClick={() => onFilterChange(filter.type)}
          className={`filter-btn ${currentFilter === filter.type ? 'active' : ''}`}
          role="tab"
          aria-selected={currentFilter === filter.type}
          aria-controls="task-list"
        >
          {filter.label}
          <span className="filter-count">({taskCounts[filter.type]})</span>
        </button>
      ))}
    </div>
  );
});

FilterButtons.displayName = 'FilterButtons';

export default FilterButtons;
