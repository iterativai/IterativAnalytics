import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  animation = 'wave'
}) => {
  const baseStyles = 'bg-gray-200 dark:bg-gray-700';
  
  const variants = {
    text: 'h-4 w-full rounded-full',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  };
  
  const animations = {
    pulse: 'animate-pulse',
    wave: 'loading-shimmer',
    none: ''
  };
  
  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        animations[animation],
        className
      )}
    />
  );
};

// Predefined skeleton components for common use cases
export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('space-y-4 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700', className)}>
    <Skeleton className="h-8 w-3/4" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" variant="text" />
      <Skeleton className="h-4 w-5/6" variant="text" />
      <Skeleton className="h-4 w-4/6" variant="text" />
    </div>
    <div className="flex gap-2 pt-4">
      <Skeleton className="h-10 w-24 rounded-xl" />
      <Skeleton className="h-10 w-24 rounded-xl" />
    </div>
  </div>
);

export const SkeletonAvatar: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };
  
  return <Skeleton variant="circular" className={sizes[size]} />;
};

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ lines = 3, className }) => (
  <div className={cn('space-y-2', className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        variant="text"
        className={cn(i === lines - 1 && 'w-4/5')}
      />
    ))}
  </div>
);

export const SkeletonTable: React.FC<{ rows?: number; columns?: number }> = ({ rows = 5, columns = 4 }) => (
  <div className="space-y-2">
    {/* Header */}
    <div className="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} className="h-6 w-full" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIdx) => (
      <div key={rowIdx} className="flex gap-4">
        {Array.from({ length: columns }).map((_, colIdx) => (
          <Skeleton key={colIdx} className="h-10 w-full" />
        ))}
      </div>
    ))}
  </div>
);

export default Skeleton;
