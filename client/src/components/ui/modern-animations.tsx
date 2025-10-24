import { motion, AnimatePresence, useReducedMotion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

const appleEasing = [0.4, 0, 0.2, 1];

export const appleTransitions = {
  fast: {
    duration: 0.2,
    ease: appleEasing
  },
  normal: {
    duration: 0.3,
    ease: appleEasing
  },
  slow: {
    duration: 0.4,
    ease: appleEasing
  }
};

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: appleTransitions.normal
  },
  exit: { 
    opacity: 0,
    transition: appleTransitions.fast
  }
};

const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: appleTransitions.normal
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: appleTransitions.fast
  }
};

const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: appleTransitions.normal
  },
  exit: { 
    opacity: 0, 
    y: 20,
    transition: appleTransitions.fast
  }
};

const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: appleTransitions.normal
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: appleTransitions.fast
  }
};

interface AnimatedProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const AppleFadeIn = ({ children, delay = 0, className }: AnimatedProps) => {
  const shouldReduceMotion = useReducedMotion();
  
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeInVariants}
      transition={{ ...appleTransitions.normal, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const AppleScaleIn = ({ children, delay = 0, className }: AnimatedProps) => {
  const shouldReduceMotion = useReducedMotion();
  
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={scaleInVariants}
      transition={{ ...appleTransitions.normal, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const AppleSlideUp = ({ children, delay = 0, className }: AnimatedProps) => {
  const shouldReduceMotion = useReducedMotion();
  
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideUpVariants}
      transition={{ ...appleTransitions.normal, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const AppleSlideDown = ({ children, delay = 0, className }: AnimatedProps) => {
  const shouldReduceMotion = useReducedMotion();
  
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideDownVariants}
      transition={{ ...appleTransitions.normal, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface AppleButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const AppleButton = ({ children, onClick, className = '', disabled }: AppleButtonProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!shouldReduceMotion ? { scale: 1.02, y: -2 } : undefined}
      whileTap={!shouldReduceMotion ? { scale: 0.98 } : undefined}
      transition={appleTransitions.fast}
      className={`${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </motion.button>
  );
};

interface AppleCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const AppleCard = ({ children, className = '', onClick }: AppleCardProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      onClick={onClick}
      whileHover={!shouldReduceMotion ? { 
        scale: 1.02, 
        y: -4,
        boxShadow: '0 12px 24px rgba(10, 132, 255, 0.1)'
      } : undefined}
      whileTap={!shouldReduceMotion ? { scale: 0.98 } : undefined}
      transition={appleTransitions.normal}
      className={`${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {children}
    </motion.div>
  );
};

export const AppleStagger = ({ children, staggerDelay = 0.1 }: { children: ReactNode, staggerDelay?: number }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};
