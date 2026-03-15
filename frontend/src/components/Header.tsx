/**
 * Header Component
 * Fixed header with progress bar and app name.
 */

import React from 'react';
import ProgressBar from './ProgressBar';

interface HeaderProps {
  progress?: number;
  progressLabel?: string;
}

const Header: React.FC<HeaderProps> = ({ progress = 0, progressLabel }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-healwell-cream border-b border-healwell-lightGray h-[70px] flex flex-col items-center justify-center px-5 z-50">
      <div className="w-[90%]">
        <ProgressBar progress={progress} label={progressLabel} />
        <div className="text-[12px] text-healwell-gray text-center mt-2">
          HealWell
        </div>
      </div>
    </header>
  );
};

export default Header;
