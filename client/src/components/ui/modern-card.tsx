import React from 'react';
import { cn } from '@/lib/utils';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'premium' | 'glass' | 'elevated';
  hover?: boolean;
  onClick?: () => void;
}

export const ModernCard: React.FC<ModernCardProps> = ({
  children,
  className,
  variant = 'default',
  hover = true,
  onClick
}) => {
  const baseStyles = 'rounded-2xl transition-all duration-300 ease-out';
  
  const variants = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm',
    premium: 'card-premium',
    glass: 'glass-panel',
    elevated: 'bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl'
  };
  
  const hoverStyles = hover ? 'hover:-translate-y-1 hover:shadow-xl cursor-pointer' : '';
  
  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        hoverStyles,
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface ModernCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const ModernCardHeader: React.FC<ModernCardHeaderProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn('p-6 border-b border-gray-200 dark:border-gray-700', className)}>
      {children}
    </div>
  );
};

interface ModernCardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const ModernCardContent: React.FC<ModernCardContentProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn('p-6', className)}>
      {children}
    </div>
  );
};

interface ModernCardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const ModernCardFooter: React.FC<ModernCardFooterProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn('p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50', className)}>
      {children}
    </div>
  );
};

export default ModernCard;
