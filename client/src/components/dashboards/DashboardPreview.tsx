
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Briefcase, 
  Handshake, 
  CreditCard,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

import FounderDashboard from './FounderDashboard';
import InvestorDashboard from './InvestorDashboard';
import PartnerDashboard from './PartnerDashboard';
import LenderDashboard from './LenderDashboard';

interface DashboardType {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  component: React.ComponentType;
}

const DashboardPreview = () => {
  const [activeDashboard, setActiveDashboard] = useState<string>('founder');

  const dashboardTypes: DashboardType[] = [
    {
      id: 'founder',
      title: 'Founder Dashboard',
      description: 'Track revenue, growth metrics, customer acquisition, and key business KPIs',
      icon: <Users className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-600',
      component: FounderDashboard,
    },
    {
      id: 'investor',
      title: 'Investor Dashboard',
      description: 'Monitor portfolio performance, investment returns, and sector analysis',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'from-indigo-500 to-purple-600',
      component: InvestorDashboard,
    },
    {
      id: 'partner',
      title: 'Partner Dashboard',
      description: 'View ecosystem partnerships, network connections, and collaboration metrics',
      icon: <Handshake className="w-6 h-6" />,
      color: 'from-emerald-500 to-teal-600',
      component: PartnerDashboard,
    },
    {
      id: 'lender',
      title: 'Lender Dashboard',
      description: 'Manage loan portfolio, assess risk, and track lending performance',
      icon: <CreditCard className="w-6 h-6" />,
      color: 'from-amber-500 to-orange-600',
      component: LenderDashboard,
    },
  ];

  const currentDashboard = dashboardTypes.find(d => d.id === activeDashboard);
  const CurrentComponent = currentDashboard?.component || FounderDashboard;

  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-xl overflow-hidden">
      {/* Dashboard Selector */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                Choose Your Dashboard
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Experience different user perspectives with real-time metrics
              </p>
            </div>
            <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
              Live Demo
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dashboardTypes.map((dashboard) => (
              <motion.div
                key={dashboard.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 ${
                    activeDashboard === dashboard.id 
                      ? 'ring-2 ring-blue-500 shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setActiveDashboard(dashboard.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${dashboard.color} text-white`}>
                        {dashboard.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {dashboard.title}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                          {dashboard.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDashboard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="max-h-[800px] overflow-y-auto"
        >
          <CurrentComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DashboardPreview;
