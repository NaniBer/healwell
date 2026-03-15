import { ReactNode } from 'react';

/**
 * Base component props interface
 */
export interface BaseComponentProps {
  className?: string;
  id?: string;
  'data-testid'?: string;
}

/**
 * Button component props
 */
export interface ButtonProps extends BaseComponentProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Input component props
 */
export interface InputProps extends BaseComponentProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number';
  error?: string;
  required?: boolean;
}

/**
 * Card component props
 */
export interface CardProps extends BaseComponentProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
}

/**
 * Modal component props
 */
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}
