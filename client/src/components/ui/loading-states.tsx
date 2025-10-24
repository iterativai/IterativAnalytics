import { motion } from 'framer-motion';
import { appleTransitions } from './modern-animations';

export const AppleSpinner = ({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg', className?: string }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </motion.div>
  );
};

export const SkeletonPulse = ({ className = '' }: { className?: string }) => {
  return (
    <motion.div
      className={`bg-neutral-200 dark:bg-neutral-800 rounded ${className}`}
      animate={{
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  );
};

export const CardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center gap-4 mb-4">
        <SkeletonPulse className="w-12 h-12 rounded-xl" />
        <div className="flex-1">
          <SkeletonPulse className="h-4 w-32 mb-2" />
          <SkeletonPulse className="h-3 w-24" />
        </div>
      </div>
      <SkeletonPulse className="h-20 w-full mb-4" />
      <SkeletonPulse className="h-10 w-full" />
    </div>
  );
};

export const ListSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <SkeletonPulse className="w-10 h-10 rounded-full" />
          <div className="flex-1">
            <SkeletonPulse className="h-4 w-3/4 mb-2" />
            <SkeletonPulse className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const LoadingScreen = ({ message = 'Loading...' }: { message?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white dark:bg-neutral-900 flex items-center justify-center z-50"
    >
      <div className="text-center">
        <AppleSpinner size="lg" className="text-primary-500 mx-auto mb-4" />
        <motion.p
          className="text-neutral-600 dark:text-neutral-400 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {message}
        </motion.p>
      </div>
    </motion.div>
  );
};

export const ProgressBar = ({ progress, className = '' }: { progress: number, className?: string }) => {
  return (
    <div className={`h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden ${className}`}>
      <motion.div
        className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={appleTransitions.normal}
      />
    </div>
  );
};
