import { ReactNode, useState, useCallback } from 'react';
import { useDrag } from '@use-gesture/react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void>;
  threshold?: number;
}

export const PullToRefresh = ({ children, onRefresh, threshold = 80 }: PullToRefreshProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, threshold], [0, 1]);
  const rotate = useTransform(y, [0, threshold], [0, 360]);

  const bind = useDrag(
    ({ movement: [, my], last, cancel }) => {
      if (my < 0) {
        cancel();
        return;
      }

      if (last) {
        if (my > threshold && !isRefreshing) {
          setIsRefreshing(true);
          onRefresh().finally(() => {
            setIsRefreshing(false);
            y.set(0);
          });
        } else {
          y.set(0);
        }
      } else {
        y.set(Math.min(my, threshold * 1.5));
      }
    },
    {
      axis: 'y',
      filterTaps: true,
      rubberband: true
    }
  );

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center"
        style={{ y: y, opacity }}
      >
        <div className="bg-white dark:bg-neutral-900 rounded-full p-2 shadow-apple-md">
          <motion.div style={{ rotate }}>
            <RefreshCw className="w-5 h-5 text-primary-500" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        {...(bind() as any)}
        style={{ y: isRefreshing ? 0 : y }}
        className="touch-pan-y"
      >
        {children}
      </motion.div>
    </div>
  );
};

interface SwipeableCardProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
  className?: string;
}

export const SwipeableCard = ({ 
  children, 
  onSwipeLeft, 
  onSwipeRight, 
  threshold = 100,
  className = ''
}: SwipeableCardProps) => {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-threshold * 2, 0, threshold * 2], [0, 1, 0]);

  const bind = useDrag(
    ({ movement: [mx], last, cancel }) => {
      if (last) {
        if (mx < -threshold && onSwipeLeft) {
          onSwipeLeft();
          x.set(-1000);
        } else if (mx > threshold && onSwipeRight) {
          onSwipeRight();
          x.set(1000);
        } else {
          x.set(0);
        }
      } else {
        x.set(mx);
      }
    },
    {
      axis: 'x',
      filterTaps: true
    }
  );

  return (
    <motion.div
      {...(bind() as any)}
      style={{ x, opacity }}
      className={`touch-pan-x ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  snapPoints?: number[];
}

export const BottomSheet = ({ isOpen, onClose, children, snapPoints = [0, 0.5, 0.9] }: BottomSheetProps) => {
  const [currentSnap, setCurrentSnap] = useState(1);
  const y = useMotionValue(0);

  const bind = useDrag(
    ({ movement: [, my], last, velocity: [, vy] }) => {
      if (last) {
        const shouldClose = my > 200 || vy > 0.5;
        if (shouldClose) {
          onClose();
        } else {
          const snapIndex = snapPoints.reduce((closest, point, index) => {
            const currentDistance = Math.abs(my - point * window.innerHeight);
            const closestDistance = Math.abs(my - snapPoints[closest] * window.innerHeight);
            return currentDistance < closestDistance ? index : closest;
          }, 0);
          setCurrentSnap(snapIndex);
        }
        y.set(0);
      } else {
        y.set(Math.max(0, my));
      }
    },
    {
      axis: 'y',
      bounds: { top: 0 },
      rubberband: true
    }
  );

  if (!isOpen) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-40"
        onClick={onClose}
      />
      <motion.div
        {...(bind() as any)}
        initial={{ y: '100%' }}
        animate={{ y: `${snapPoints[currentSnap] * 100}%` }}
        exit={{ y: '100%' }}
        style={{ y }}
        className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 rounded-t-3xl shadow-apple-xl z-50 touch-pan-y"
      >
        <div className="w-12 h-1 bg-neutral-300 dark:bg-neutral-700 rounded-full mx-auto mt-3 mb-4" />
        <div className="px-4 pb-safe">
          {children}
        </div>
      </motion.div>
    </>
  );
};
