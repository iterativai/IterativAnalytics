import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Moon, Sun, Palette, Eye, Sparkles } from 'lucide-react';

// Dark Mode Toggle
export const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <motion.button
      onClick={toggleDarkMode}
      className="fixed top-4 right-20 z-50 p-3 rounded-full bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 text-orange-400 hover:text-orange-300 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </motion.div>
    </motion.button>
  );
};

// Parallax Background Elements
export const ParallaxBackground = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -300]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 left-10 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-40 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
      />
    </div>
  );
};

// Enhanced Visual Cues for Scrolling
export const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40">
      <div className="w-1 h-32 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="w-full bg-gradient-to-t from-orange-500 to-red-500 rounded-full"
          style={{ height: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>
  );
};

// Custom Button with Advanced Hover Effects
export const EnhancedButton = ({ 
  children, 
  variant = 'primary', 
  className = '',
  onClick 
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = "relative px-8 py-4 font-semibold rounded-xl overflow-hidden transition-all duration-300";
  
  const variants = {
    primary: "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:shadow-orange-500/25",
    secondary: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-blue-500/25",
    outline: "border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white"
  };

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="absolute inset-0 bg-white/20"
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '100%' : '-100%' }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10 flex items-center space-x-2">
        {children}
      </span>
    </motion.button>
  );
};

// Reveal on Scroll Animation
export const RevealOnScroll = ({ 
  children, 
  direction = 'up',
  delay = 0 
}: {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}) => {
  const ref = useRef(null);
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

// Interactive Card with 3D Effects
export const Interactive3DCard = ({ 
  children, 
  className = '' 
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateXValue = (e.clientY - centerY) / 10;
    const rotateYValue = (centerX - e.clientX) / 10;

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
      <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-6 shadow-2xl">
        {children}
      </div>
    </motion.div>
  );
};

// Floating Action Bubble
export const FloatingActionBubble = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
    { icon: Eye, label: 'Demo', color: 'bg-blue-500' },
    { icon: Palette, label: 'Customize', color: 'bg-purple-500' },
    { icon: Sparkles, label: 'AI Analysis', color: 'bg-orange-500' }
  ];

  return (
    <div className="fixed bottom-20 right-6 z-50">
      <motion.div
        className="relative"
        initial={false}
        animate={isExpanded ? "open" : "closed"}
      >
        {/* Action Items */}
        <motion.div
          className="absolute bottom-16 right-0 space-y-3"
          variants={{
            open: {
              opacity: 1,
              scale: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
              }
            },
            closed: {
              opacity: 0,
              scale: 0.8,
              transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
              }
            }
          }}
        >
          {actions.map((action, index) => (
            <motion.button
              key={index}
              className={`flex items-center space-x-3 ${action.color} text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow`}
              variants={{
                open: { opacity: 1, y: 0, scale: 1 },
                closed: { opacity: 0, y: 20, scale: 0.8 }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <action.icon className="h-5 w-5" />
              <span className="text-sm font-medium whitespace-nowrap">{action.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Main Toggle Button */}
        <motion.button
          className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg flex items-center justify-center"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isExpanded ? 45 : 0 }}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sparkles className="h-6 w-6" />
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  );
};