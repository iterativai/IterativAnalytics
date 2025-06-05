import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, AlertCircle, Zap, TrendingUp, Award } from 'lucide-react';

interface FloatingBannerItem {
  id: string;
  icon: React.ComponentType<any>;
  text: string;
  type: 'urgency' | 'social' | 'achievement';
  color: string;
}

export const FloatingUrgencyBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const bannerItems: FloatingBannerItem[] = [
    {
      id: '1',
      icon: Clock,
      text: 'Limited Beta Access - Only 23 spots remaining this month',
      type: 'urgency',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: '2',
      icon: Users,
      text: '1,247 startups analyzed this week across Africa',
      type: 'social',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: '3',
      icon: TrendingUp,
      text: 'Average score improvement: 89% after AI analysis',
      type: 'achievement',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: '4',
      icon: Award,
      text: '156 funding rounds supported in Q4 2024',
      type: 'achievement',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: '5',
      icon: AlertCircle,
      text: 'Beta program closing in 30 days - Secure your spot now',
      type: 'urgency',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: '6',
      icon: Zap,
      text: 'Real-time: 3 startups just received 90+ scores',
      type: 'social',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bannerItems.length]);

  return (
    <div className="w-full bg-black/20 backdrop-blur-sm border-y border-orange-500/20 py-3 overflow-hidden">
      <div className="relative h-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className={`flex items-center space-x-3 px-6 py-2 rounded-full bg-gradient-to-r ${bannerItems[currentIndex].color} text-white shadow-lg`}>
              {React.createElement(bannerItems[currentIndex].icon, {
                className: "h-5 w-5 animate-pulse"
              })}
              <span className="font-medium text-sm md:text-base whitespace-nowrap">
                {bannerItems[currentIndex].text}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export const CountdownBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-sm border border-orange-500/30 py-4"
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <Clock className="h-6 w-6 text-orange-400 animate-pulse" />
          <div>
            <h3 className="text-orange-400 font-bold text-lg">Beta Launch Countdown</h3>
            <p className="text-orange-200 text-sm">Limited spots remaining - Don't miss out!</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="text-center">
              <motion.div
                key={value}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="bg-orange-500/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-orange-400/30"
              >
                <div className="text-2xl font-bold text-orange-300">
                  {value.toString().padStart(2, '0')}
                </div>
                <div className="text-xs text-orange-400 uppercase font-medium">
                  {unit}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};