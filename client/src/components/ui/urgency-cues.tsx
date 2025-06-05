import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, AlertCircle, Zap } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: Date;
  title: string;
  description: string;
}

export const CountdownTimer = ({ targetDate, title, description }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
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
  }, [targetDate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6 text-center"
    >
      <div className="flex items-center justify-center mb-4">
        <Clock className="h-5 w-5 text-red-600 mr-2" />
        <span className="text-red-600 font-medium text-sm uppercase tracking-wide">{title}</span>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-4">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="text-center">
            <motion.div
              key={value}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-xl p-3 shadow-sm border border-red-100"
            >
              <div className="text-2xl font-bold text-red-600">{value.toString().padStart(2, '0')}</div>
              <div className="text-xs text-red-500 uppercase font-medium">{unit}</div>
            </motion.div>
          </div>
        ))}
      </div>
      
      <p className="text-sm text-red-700">{description}</p>
    </motion.div>
  );
};

export const SocialProofBanner = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const stats = [
    { icon: Users, number: 1247, text: "startups analyzed this week" },
    { icon: Zap, number: 89, text: "average score improvement" },
    { icon: AlertCircle, number: 156, text: "funding rounds supported" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 text-center"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStat}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center space-x-3"
        >
          {React.createElement(stats[currentStat].icon, {
            className: "h-5 w-5 text-green-600"
          })}
          <span className="text-green-700">
            <span className="font-bold text-lg">{stats[currentStat].number}+</span>
            {" " + stats[currentStat].text}
          </span>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export const LimitedSpotsBanner = () => {
  const [spotsLeft, setSpotsLeft] = useState(23);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpotsLeft(prev => Math.max(1, prev - Math.floor(Math.random() * 2)));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4 text-center"
    >
      <div className="flex items-center justify-center space-x-2 mb-2">
        <AlertCircle className="h-5 w-5 text-amber-600" />
        <span className="text-amber-700 font-medium">Limited Beta Access</span>
      </div>
      <p className="text-amber-700">
        Only <span className="font-bold text-lg">{spotsLeft}</span> beta spots remaining for this month
      </p>
    </motion.div>
  );
};

export const RecentActivityFeed = () => {
  const [activities, setActivities] = useState([
    { id: 1, user: "TechStart Lagos", action: "received 94/100 score", time: "2 min ago" },
    { id: 2, user: "GreenTech Nairobi", action: "uploaded pitch deck", time: "5 min ago" },
    { id: 3, user: "FinTech Cape Town", action: "improved to 87/100", time: "8 min ago" }
  ]);
  const [nextId, setNextId] = useState(4);

  useEffect(() => {
    const names = [
      "EduTech Accra", "HealthTech Cairo", "AgriTech Kampala", "CleanTech Tunis",
      "PropTech Rabat", "RetailTech Addis", "LogiTech Dar", "EnergyTech Kigali"
    ];
    const actions = [
      "received 91/100 score", "uploaded business plan", "improved to 89/100",
      "completed analysis", "received funding recommendation", "updated metrics"
    ];

    const interval = setInterval(() => {
      const newActivity = {
        id: nextId,
        user: names[Math.floor(Math.random() * names.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        time: "Just now"
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 2)]);
      setNextId(prev => prev + 1);
    }, 15000);

    return () => clearInterval(interval);
  }, [nextId]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl border border-apple-gray-200 p-4 shadow-sm"
    >
      <h4 className="font-medium text-apple-gray-900 mb-3 flex items-center">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
        Recent Activity
      </h4>
      <div className="space-y-3">
        <AnimatePresence>
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-3 text-sm"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-3 h-3 bg-primary rounded-full" />
              </div>
              <div className="flex-1">
                <p className="text-apple-gray-900">
                  <span className="font-medium">{activity.user}</span> {activity.action}
                </p>
                <p className="text-apple-gray-500 text-xs">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};