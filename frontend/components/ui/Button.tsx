/**
 * Button Component - KITA Design System
 *
 * Implements Indonesian-inspired warm color palette with tactile feedback.
 * Uses hard shadows (ExportReadyAI style) and press-down interactions.
 *
 * Usage:
 * <Button variant="primary" size="lg">Click Me</Button>
 * <Button variant="outline" disabled>Disabled</Button>
 */

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant =
  | 'primary'   // Amber gradient - main CTAs
  | 'secondary' // Teal - secondary actions
  | 'outline'   // Border only - tertiary actions
  | 'ghost'     // Minimal - inline actions
  | 'success'   // Green - confirmations
  | 'danger';   // Red - destructive actions

type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary: cn(
    'bg-gradient-to-r from-secondary-500 to-secondary-600', // Amber for CTAs (10% rule)
    'text-white font-semibold',
    'shadow-hard-amber-md hover:shadow-hard-amber-lg',
    'hover:from-secondary-600 hover:to-orange-700'
  ),
  secondary: cn(
    'bg-gradient-to-r from-primary-500 to-primary-600', // Blue-teal for secondary
    'text-white font-semibold',
    'shadow-hard-sm hover:shadow-hard-md',
    'hover:from-primary-600 hover:to-primary-700'
  ),
  outline: cn(
    'border-2 border-stone-600 bg-transparent',
    'text-stone-200 font-medium',
    'hover:bg-stone-700/30 hover:border-stone-500'
  ),
  ghost: cn(
    'bg-transparent',
    'text-stone-300 font-medium',
    'hover:bg-stone-700/20 hover:text-white'
  ),
  success: cn(
    'bg-green-500',
    'text-white font-semibold',
    'shadow-hard-sm hover:shadow-hard-md',
    'hover:bg-green-600'
  ),
  danger: cn(
    'bg-red-500',
    'text-white font-semibold',
    'shadow-hard-sm hover:shadow-hard-md',
    'hover:bg-red-600'
  ),
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-2.5 text-base rounded-xl',
  lg: 'px-8 py-3 text-lg rounded-xl',
  xl: 'px-10 py-4 text-xl rounded-2xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className,
    disabled,
    children,
    ...props
  }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-2',
          'transition-all duration-150',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-stone-900',

          // Tactile feedback (ExportReadyAI 3D push style)
          'hover:-translate-y-0.5',
          'active:translate-y-1 active:shadow-none', // Push down on click

          // Variant styles
          buttonVariants[variant],

          // Size styles
          buttonSizes[size],

          // Full width
          fullWidth && 'w-full',

          // Disabled state
          disabled && 'opacity-50 cursor-not-allowed hover:translate-y-0 hover:shadow-none',

          // Custom className
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
