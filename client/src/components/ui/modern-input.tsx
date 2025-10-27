import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ModernInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  floatingLabel?: boolean;
}

export const ModernInput = forwardRef<HTMLInputElement, ModernInputProps>(
  ({ 
    label, 
    error, 
    hint,
    icon, 
    iconPosition = 'left',
    floatingLabel = false,
    className, 
    ...props 
  }, ref) => {
    const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    if (floatingLabel) {
      return (
        <div className="relative w-full">
          <div className="relative">
            {icon && iconPosition === 'left' && (
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                {icon}
              </div>
            )}
            
            <input
              ref={ref}
              id={inputId}
              className={cn(
                'peer input-enhanced w-full',
                icon && iconPosition === 'left' && 'pl-11',
                icon && iconPosition === 'right' && 'pr-11',
                error && 'border-red-500 dark:border-red-400',
                className
              )}
              placeholder=" "
              {...props}
            />
            
            {label && (
              <label
                htmlFor={inputId}
                className="absolute left-4 top-3.5 text-gray-500 dark:text-gray-400 transition-all duration-200 pointer-events-none peer-focus:text-xs peer-focus:text-blue-600 dark:peer-focus:text-blue-400 peer-focus:-translate-y-8 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-blue-600 dark:peer-[:not(:placeholder-shown)]:text-blue-400"
              >
                {label}
              </label>
            )}
            
            {icon && iconPosition === 'right' && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                {icon}
              </div>
            )}
          </div>
          
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-in slide-in-from-top-1">
              {error}
            </p>
          )}
          
          {hint && !error && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {hint}
            </p>
          )}
        </div>
      );
    }
    
    return (
      <div className="w-full space-y-2">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'input-enhanced w-full',
              icon && iconPosition === 'left' && 'pl-11',
              icon && iconPosition === 'right' && 'pr-11',
              error && 'border-red-500 dark:border-red-400 focus:border-red-500 dark:focus:border-red-400',
              className
            )}
            {...props}
          />
          
          {icon && iconPosition === 'right' && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              {icon}
            </div>
          )}
        </div>
        
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 animate-in slide-in-from-top-1">
            {error}
          </p>
        )}
        
        {hint && !error && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

ModernInput.displayName = 'ModernInput';

export default ModernInput;
