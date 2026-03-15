/**
 * ProgressBar Component
 * Displays a progress bar with an optional label.
 * The progress is clamped between 0-100.
 */

import React from 'react';

interface ProgressBarProps {
  progress?: number;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress = 0, label }) => {
  const percentage = Math.max(0, Math.min(100, progress));

  return (
    <div className="flex flex-col items-center">
      {label && (
        <span className="text-[12px] text-healwell-gray mb-2">
          {label}
        </span>
      )}
      <div className="w-[90%] h-1 bg-healwell-lightGray rounded-[2px] overflow-hidden">
        <div
          className="h-full bg-healwell-sage transition-all duration-300 ease-in-out rounded-[2px]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
