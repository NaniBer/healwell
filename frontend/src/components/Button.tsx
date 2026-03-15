/**
 * Button Component
 * Reusable button component with primary/secondary variants, loading, and disabled states.
 */

import React from 'react';
import { ButtonProps as BaseButtonProps } from '../types/component-props';

export interface ButtonProps extends BaseButtonProps {
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  disabled = false,
  loading = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'font-semibold text-[14px] transition-all duration-200';

  const primaryClasses = 'bg-white border-2 border-healwell-black text-healwell-black rounded-lg px-6 py-4 w-full';
  const secondaryClasses = 'text-healwell-darkGray underline px-4 py-3 bg-transparent border-0';
  const disabledClasses = 'border-healwell-lightGray text-healwell-gray cursor-not-allowed';
  const loadingClasses = 'opacity-60';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    props.onClick?.(e);
  };

  const getVariantClasses = (): string => {
    if (variant === 'secondary') return secondaryClasses;
    return primaryClasses;
  };

  const getStateClasses = (): string => {
    const classes: string[] = [];
    if (disabled) classes.push(disabledClasses);
    if (loading) classes.push(loadingClasses);
    return classes.join(' ');
  };

  const getButtonContent = (): React.ReactNode => {
    if (loading) return 'Loading...';
    return children;
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${getVariantClasses()} ${getStateClasses()} ${className}`}
      {...props}
    >
      {getButtonContent()}
    </button>
  );
};

export default Button;
