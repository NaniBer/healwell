/**
 * Section Component
 * A reusable section component with optional heading and consistent spacing.
 */

import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  heading?: string;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ children, heading, className = '' }) => {
  return (
    <div className={`px-5 pt-8 pb-8 ${className}`}>
      {heading && (
        <>
          <h2 className="text-[18px] font-semibold text-healwell-black mb-6">
            {heading}
          </h2>
          <div className="mb-4">
            {children}
          </div>
        </>
      )}
      {!heading && children}
    </div>
  );
};

export default Section;