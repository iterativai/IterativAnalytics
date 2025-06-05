import React, { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface AnimationProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeIn = ({ 
  children, 
  delay = 0,
  duration = 0.6,
  className = ""
}: AnimationProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export const ScaleIn = ({ 
  children, 
  delay = 0,
  duration = 0.3,
  className = ""
}: AnimationProps) => (
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration, delay, type: "spring", stiffness: 100 }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SlideUp = ({ 
  children, 
  delay = 0,
  duration = 0.5,
  className = ""
}: AnimationProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SlideIn = ({ 
  children, 
  delay = 0,
  duration = 0.5,
  className = "",
  direction = "left"
}: AnimationProps & { direction?: "left" | "right" }) => (
  <motion.div
    initial={{ 
      opacity: 0, 
      x: direction === "left" ? -40 : 40 
    }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export const Stagger = ({ 
  children, 
  className = "",
  staggerDelay = 0.1 
}: { 
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) => {
  const childrenArray = React.Children.toArray(children);
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Enhanced hover animations for buttons and interactive elements
export const HoverScale = ({ 
  children, 
  scale = 1.05,
  className = ""
}: { 
  children: ReactNode;
  scale?: number;
  className?: string;
}) => (
  <motion.div
    whileHover={{ scale }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2 }}
    className={className}
  >
    {children}
  </motion.div>
);

export const FloatingElement = ({ 
  children, 
  className = ""
}: { 
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    animate={{ 
      y: [0, -10, 0]
    }}
    transition={{ 
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className={className}
  >
    {children}
  </motion.div>
);