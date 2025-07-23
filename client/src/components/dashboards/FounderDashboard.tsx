import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target, 
  Lightbulb,
  BarChart3,
  PieChart,
  Activity
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

interface FounderMetrics {
  revenue: number;
  growth: number;
  customers: number;
  burnRate: number;
  runway: number;
  marketFit: number;
  teamSize: number;
  fundingRaised: number;
}

const FounderDashboard = () => {
  const [metrics, setMetrics] = useState<FounderMetrics>({
    revenue: 125000,
    growth: 23.5,
    customers: 1247,
    burnRate: 15000,
    runway: 18,
    marketFit: 78,
    teamSize: 12,
    fundingRaised: 2500000
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Sample data for charts
  const revenueData = [
    { month: 'Jan', revenue: 45000, target: 50000 },
    { month: 'Feb', revenue: 52000, target: 55000 },
    { month: 'Mar', revenue: 48000, target: 60000 },
    { month: 'Apr', revenue: 67000, target: 65000 },
    { month: 'May', revenue: 89000, target: 70000 },
    { month: 'Jun', revenue: 125000, target: 75000 },
  ];

  const customerAcquisitionData = [
    { week: 'W1', acquired: 23, churned: 2 },
    { week: 'W2', acquired: 31, churned: 4 },
    { week: 'W3', acquired: 28, churned: 1 },
    { week: 'W4', acquired: 45, churned: 3 },
  ];

  const marketSegmentData = [
    { name: 'Enterprise', value: 45, color: '#3b82f6' },
    { name: 'SMB', value: 30, color: '#10b981' },
    { name: 'Startup', value: 25, color: '#f59e0b' },
  ];

  const MetricCard = ({ title, value, change, icon: Icon, color, suffix = '' }) => (
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
                {isLoading ? '...' : `${typeof value === 'number' ? value.toLocaleString() : value}${suffix}`}
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[600px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
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
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Founder Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Your startup's key performance indicators</p>
            </div>
            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
              Live Data
            </Badge>
          </div>
        </motion.div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Monthly Revenue"
            value={metrics.revenue}
            change={metrics.growth}
            icon={DollarSign}
            color="from-green-500 to-emerald-600"
            suffix="$"
          />
          <MetricCard
            title="Active Customers"
            value={metrics.customers}
            change={15.3}
            icon={Users}
            color="from-blue-500 to-cyan-600"
          />
          <MetricCard
            title="Burn Rate"
            value={metrics.burnRate}
            change={-8.2}
            icon={TrendingUp}
            color="from-orange-500 to-red-600"
            suffix="$/mo"
          />
          <MetricCard
            title="Runway"
            value={metrics.runway}
            change={null}
            icon={Target}
            color="from-purple-500 to-pink-600"
            suffix=" months"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                  Revenue vs Target
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    revenue: { label: "Revenue", color: "#3b82f6" },
                    target: { label: "Target", color: "#10b981" }
                  }}
                  className="h-80"
                >
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.2}
                    />
                    <Area
                      type="monotone"
                      dataKey="target"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.1}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Customer Acquisition */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  Customer Acquisition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    acquired: { label: "Acquired", color: "#10b981" },
                    churned: { label: "Churned", color: "#ef4444" }
                  }}
                  className="h-80"
                >
                  <BarChart data={customerAcquisitionData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="acquired" fill="#10b981" radius={4} />
                    <Bar dataKey="churned" fill="#ef4444" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Market Fit Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-purple-600" />
                  Product-Market Fit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">{metrics.marketFit}%</div>
                  <Progress value={metrics.marketFit} className="mb-4" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Strong indicator of market validation
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Market Segments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-5 h-5 mr-2 text-yellow-600" />
                  Market Segments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    enterprise: { label: "Enterprise", color: "#3b82f6" },
                    smb: { label: "SMB", color: "#10b981" },
                    startup: { label: "Startup", color: "#f59e0b" }
                  }}
                  className="h-48"
                >
                  <RechartsPieChart>
                    <RechartsPieChart data={marketSegmentData} cx="50%" cy="50%" outerRadius={80}>
                      {marketSegmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </RechartsPieChart>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </RechartsPieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Revenue Growth Opportunity
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                      Consider expanding enterprise segment
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">
                      Customer Retention
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-300 mt-1">
                      Churn rate improved by 15%
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                      Funding Runway
                    </p>
                    <p className="text-xs text-orange-600 dark:text-orange-300 mt-1">
                      Consider fundraising in Q4
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FounderDashboard;