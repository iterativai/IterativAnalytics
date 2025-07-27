
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Package, 
  ArrowRight, 
  CheckCircle,
  Clock,
  Sparkles,
  Globe,
  TrendingUp,
  Star,
  ChevronDown,
  Play,
  Menu,
  X,
  Shield,
  Zap,
  Target
} from 'lucide-react';

// Enhanced Glass Morphism Card Component
export const GlassCard = ({ children, className = "", hover = true, ...props }) => (
  <motion.div 
    className={`
      bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl
      ${hover ? 'hover:bg-white/10 hover:border-white/20 transition-all duration-300' : ''}
      ${className}
    `}
    whileHover={hover ? { scale: 1.02, y: -5 } : {}}
    transition={{ duration: 0.3 }}
    {...props}
  >
    {children}
  </motion.div>
);

// Enhanced Button with Advanced Animations
export const EnhancedButton = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  className = "", 
  disabled = false,
  loading = false,
  ...props 
}) => {
  const baseClasses = "relative inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl",
    secondary: "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-xl",
    ghost: "text-white hover:bg-white/10 backdrop-blur-sm",
    outline: "border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-xl hover:border-white/50",
    gradient: "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:shadow-orange-500/25"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  return (
    <motion.button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
        animate={{
          translateX: ["100%", "100%", "-100%", "-100%"]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3
        }}
        style={{ width: "100%", skewX: "-20deg" }}
      />
      
      <span className="relative z-10 flex items-center space-x-2">
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        {children}
      </span>
    </motion.button>
  );
};

// Enhanced Badge Component
export const EnhancedBadge = ({ children, variant = "default", className = "", animate = true }) => {
  const variants = {
    default: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    success: "bg-green-500/20 text-green-300 border-green-500/30",
    warning: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    outline: "border border-white/20 text-white/70",
    gradient: "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30"
  };
  
  return (
    <motion.span 
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm
        ${variants[variant]} ${className}
      `}
      initial={animate ? { scale: 0, opacity: 0 } : {}}
      animate={animate ? { scale: 1, opacity: 1 } : {}}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.span>
  );
};

// Animated Progress Indicator
export const AnimatedProgress = ({ progress, className = "" }) => (
  <div className={`w-full bg-white/10 rounded-full h-2 backdrop-blur-sm ${className}`}>
    <motion.div
      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 1, ease: "easeOut" }}
    />
  </div>
);

// Floating Elements with Physics
export const FloatingElement = ({ 
  children, 
  className = "",
  intensity = 1,
  duration = 3 
}) => (
  <motion.div
    className={className}
    animate={{ 
      y: [0, -10 * intensity, 0],
      rotate: [0, 2 * intensity, 0]
    }}
    transition={{ 
      duration,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

// Reveal Animation Wrapper
export const RevealOnScroll = ({ 
  children, 
  direction = 'up',
  delay = 0,
  className = ""
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const directions = {
    up: { y: 100, x: 0 },
    down: { y: -100, x: 0 },
    left: { y: 0, x: 100 },
    right: { y: 0, x: -100 }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0, 
        ...directions[direction]
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0 
      } : {}}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
};

// Interactive 3D Card
export const Interactive3DCard = ({ 
  children, 
  className = "",
  maxRotation = 10 
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateXValue = ((e.clientY - centerY) / (rect.height / 2)) * maxRotation;
    const rotateYValue = ((centerX - e.clientX) / (rect.width / 2)) * maxRotation;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <GlassCard className="relative p-6 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
        {children}
      </GlassCard>
    </motion.div>
  );
};

// Staggered Animation Container
export const StaggerContainer = ({ 
  children, 
  className = "",
  staggerDelay = 0.1 
}) => {
  const childrenArray = React.Children.toArray(children);
  
  return (
    <motion.div
      className={className}
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

// Enhanced Loading Spinner
export const LoadingSpinner = ({ size = "md", className = "" }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <motion.div
      className={`${sizes[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <div className="w-full h-full border-2 border-current border-t-transparent rounded-full" />
    </motion.div>
  );
};

// Gradient Text Component
export const GradientText = ({ 
  children, 
  gradient = "from-blue-400 to-purple-400",
  className = ""
}) => (
  <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}>
    {children}
  </span>
);

// Particle Background Effect
export const ParticleBackground = () => {
  const particles = Array.from({ length: 50 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};
