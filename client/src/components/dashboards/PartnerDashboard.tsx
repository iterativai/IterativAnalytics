import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users, 
  Handshake, 
  Target, 
  Network,
  BarChart3,
  PieChart,
  Activity,
  Building,
  Calendar
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

interface PartnerMetrics {
  activePartners: number;
  totalConnections: number;
  successfulMatches: number;
  networkGrowth: number;
  avgDealSize: number;
  partnershipsCreated: number;
  eventAttendance: number;
  mentorshipHours: number;
}

const PartnerDashboard = () => {
  const [metrics, setMetrics] = useState<PartnerMetrics>({
    activePartners: 147,
    totalConnections: 2890,
    successfulMatches: 89,
    networkGrowth: 28.5,
    avgDealSize: 450000,
    partnershipsCreated: 34,
    eventAttendance: 1250,
    mentorshipHours: 320
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Network growth data
  const networkGrowthData = [
    { month: 'Jan', partners: 89, connections: 1200 },
    { month: 'Feb', partners: 98, connections: 1450 },
    { month: 'Mar', partners: 112, connections: 1680 },
    { month: 'Apr', connections: 2100, partners: 125 },
    { month: 'May', partners: 138, connections: 2450 },
    { month: 'Jun', partners: 147, connections: 2890 },
  ];

  // Partnership types distribution
  const partnershipTypesData = [
    { name: 'Incubators', value: 35, color: '#3b82f6', count: 51 },
    { name: 'Accelerators', value: 25, color: '#10b981', count: 37 },
    { name: 'Corporate Partners', value: 20, color: '#f59e0b', count: 29 },
    { name: 'Gov Agencies', value: 12, color: '#8b5cf6', count: 18 },
    { name: 'NGOs', value: 8, color: '#ef4444', count: 12 },
  ];

  // Successful matches by sector
  const matchesBySectorData = [
    { sector: 'FinTech', matches: 25, success_rate: 85 },
    { sector: 'HealthTech', matches: 18, success_rate: 78 },
    { sector: 'EdTech', matches: 15, success_rate: 92 },
    { sector: 'CleanTech', matches: 12, success_rate: 67 },
    { sector: 'AgriTech', matches: 10, success_rate: 73 },
    { sector: 'Other', matches: 9, success_rate: 81 },
  ];

  // Recent activities
  const recentActivities = [
    { type: 'Partnership', partner: 'TechHub Nairobi', action: 'New incubator partnership', time: '2 hours ago' },
    { type: 'Match', partner: 'Venture Capital Fund', action: 'Successful founder-investor match', time: '5 hours ago' },
    { type: 'Event', partner: 'Startup Weekend', action: 'Co-hosted networking event', time: '1 day ago' },
    { type: 'Mentorship', partner: 'Industry Expert', action: 'Mentorship session completed', time: '2 days ago' },
  ];

  const MetricCard = ({ title, value, change, icon: Icon, color, suffix = '', prefix = '' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5`} />
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {isLoading ? '...' : `${prefix}${typeof value === 'number' ? value.toLocaleString() : value}${suffix}`}
              </p>
              {change && (
                <div className="flex items-center mt-2">
                  <TrendingUp className={`w-4 h-4 mr-1 ${change > 0 ? 'text-green-500' : 'text-red-500'}`} />
                  <span className={`text-sm font-medium ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {change > 0 ? '+' : ''}{change}%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              )}
            </div>
            <div className={`p-3 rounded-full bg-gradient-to-br ${color}`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-slate-900 dark:to-emerald-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[600px] bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-slate-900 dark:to-emerald-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Partner Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Ecosystem partnerships and network insights</p>
            </div>
            <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-300">
              Network Active
            </Badge>
          </div>
        </motion.div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Active Partners"
            value={metrics.activePartners}
            change={metrics.networkGrowth}
            icon={Handshake}
            color="from-emerald-500 to-teal-600"
          />
          <MetricCard
            title="Total Connections"
            value={metrics.totalConnections}
            change={22.4}
            icon={Network}
            color="from-blue-500 to-cyan-600"
          />
          <MetricCard
            title="Successful Matches"
            value={metrics.successfulMatches}
            change={15.8}
            icon={Target}
            color="from-purple-500 to-pink-600"
          />
          <MetricCard
            title="Partnerships Created"
            value={metrics.partnershipsCreated}
            change={45.2}
            icon={Building}
            color="from-orange-500 to-red-600"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Network Growth */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-emerald-600" />
                  Network Growth Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    partners: { label: "Partners", color: "#10b981" },
                    connections: { label: "Connections", color: "#3b82f6" }
                  }}
                  className="h-80"
                >
                  <AreaChart data={networkGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="connections"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.2}
                    />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="partners"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Matches by Sector */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-purple-600" />
                  Matches by Sector
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    matches: { label: "Total Matches", color: "#8b5cf6" },
                    success_rate: { label: "Success Rate %", color: "#10b981" }
                  }}
                  className="h-80"
                >
                  <BarChart data={matchesBySectorData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="sector" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar yAxisId="left" dataKey="matches" fill="#8b5cf6" radius={4} />
                    <Bar yAxisId="right" dataKey="success_rate" fill="#10b981" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Partnership Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-5 h-5 mr-2 text-blue-600" />
                  Partnership Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {partnershipTypesData.map((type, index) => (
                    <div key={type.name} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: type.color }}
                        />
                        <span className="text-sm font-medium">{type.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">{type.count}</div>
                        <div className="text-xs text-gray-500">{type.value}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-emerald-600" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'Partnership' ? 'bg-emerald-100 text-emerald-600' :
                        activity.type === 'Match' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'Event' ? 'bg-purple-100 text-purple-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {activity.type === 'Partnership' ? <Handshake className="w-4 h-4" /> :
                         activity.type === 'Match' ? <Target className="w-4 h-4" /> :
                         activity.type === 'Event' ? <Calendar className="w-4 h-4" /> :
                         <Users className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{activity.partner}</h4>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{activity.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;