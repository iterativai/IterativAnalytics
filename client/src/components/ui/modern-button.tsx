import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ModernButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export const ModernButton: React.FC<ModernButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'left',
  children,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center font-semibold transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-white/10 backdrop-blur-md border border-white/30 text-gray-900 dark:text-white hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
    gradient: 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white hover:shadow-xl hover:shadow-pink-500/30 hover:-translate-y-0.5'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-7 py-3.5 text-lg rounded-xl',
    xl: 'px-10 py-4 text-xl rounded-2xl'
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Shine effect overlay */}
      {variant === 'primary' && (
        <span className="absolute inset-0 rounded-inherit">
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </span>
      )}
      
      {/* Content wrapper */}
      <span className="relative flex items-center gap-2">
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
          </>
        )}
      </span>
    </button>
  );
};

export default ModernButton;
