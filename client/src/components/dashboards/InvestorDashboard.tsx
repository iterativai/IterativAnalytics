import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Briefcase, 
  DollarSign, 
  Target, 
  PieChart,
  BarChart3,
  Activity,
  Users,
  Star
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
  ResponsiveContainer,
  ScatterChart,
  Scatter
} from 'recharts';

interface InvestorMetrics {
  totalPortfolioValue: number;
  totalInvested: number;
  activeInvestments: number;
  avgReturn: number;
  bestPerformer: string;
  portfolioGrowth: number;
  exitValue: number;
  pipelineDeals: number;
}

const InvestorDashboard = () => {
  const [metrics, setMetrics] = useState<InvestorMetrics>({
    totalPortfolioValue: 15750000,
    totalInvested: 8500000,
    activeInvestments: 23,
    avgReturn: 2.85,
    bestPerformer: "TechCorp AI",
    portfolioGrowth: 35.2,
    exitValue: 4200000,
    pipelineDeals: 8
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Portfolio performance data
  const portfolioPerformanceData = [
    { month: 'Jan', value: 12500000, benchmark: 12000000 },
    { month: 'Feb', value: 13200000, benchmark: 12300000 },
    { month: 'Mar', value: 12800000, benchmark: 12600000 },
    { month: 'Apr', value: 14100000, benchmark: 13000000 },
    { month: 'May', value: 15200000, benchmark: 13400000 },
    { month: 'Jun', value: 15750000, benchmark: 13800000 },
  ];

  // Sector allocation data
  const sectorAllocationData = [
    { name: 'FinTech', value: 35, color: '#3b82f6', amount: 5512500 },
    { name: 'HealthTech', value: 25, color: '#10b981', amount: 3937500 },
    { name: 'EdTech', value: 20, color: '#f59e0b', amount: 3150000 },
    { name: 'CleanTech', value: 12, color: '#8b5cf6', amount: 1890000 },
    { name: 'Other', value: 8, color: '#ef4444', amount: 1260000 },
  ];

  // Investment stage distribution
  const stageDistributionData = [
    { stage: 'Seed', count: 8, amount: 2100000 },
    { stage: 'Series A', count: 10, amount: 4800000 },
    { stage: 'Series B', count: 4, amount: 6200000 },
    { stage: 'Series C', count: 1, amount: 2650000 },
  ];

  // Top performing startups
  const topPerformersData = [
    { name: 'TechCorp AI', invested: 500000, currentValue: 2100000, multiple: 4.2, sector: 'FinTech' },
    { name: 'HealthFlow', invested: 300000, currentValue: 1050000, multiple: 3.5, sector: 'HealthTech' },
    { name: 'EduSmart', invested: 400000, currentValue: 1200000, multiple: 3.0, sector: 'EdTech' },
    { name: 'GreenEnergy', invested: 600000, currentValue: 1500000, multiple: 2.5, sector: 'CleanTech' },
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
                  <span className="text-sm text-gray-500 ml-1">vs last quarter</span>
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-slate-900 dark:to-indigo-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[600px] bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-slate-900 dark:to-indigo-900 p-6">
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
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Investor Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Portfolio performance and investment insights</p>
            </div>
            <Badge variant="outline" className="bg-indigo-100 text-indigo-700 border-indigo-300">
              Portfolio Overview
            </Badge>
          </div>
        </motion.div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Portfolio Value"
            value={metrics.totalPortfolioValue}
            change={metrics.portfolioGrowth}
            icon={Briefcase}
            color="from-indigo-500 to-purple-600"
            prefix="$"
          />
          <MetricCard
            title="Total Invested"
            value={metrics.totalInvested}
            change={null}
            icon={DollarSign}
            color="from-green-500 to-emerald-600"
            prefix="$"
          />
          <MetricCard
            title="Active Investments"
            value={metrics.activeInvestments}
            change={12.5}
            icon={Target}
            color="from-blue-500 to-cyan-600"
          />
          <MetricCard
            title="Average Return"
            value={metrics.avgReturn}
            change={18.7}
            icon={TrendingUp}
            color="from-orange-500 to-red-600"
            suffix="x"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Portfolio Performance */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-indigo-600" />
                  Portfolio vs Benchmark
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: { label: "Portfolio Value", color: "#6366f1" },
                    benchmark: { label: "Market Benchmark", color: "#10b981" }
                  }}
                  className="h-80"
                >
                  <AreaChart data={portfolioPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#6366f1"
                      fill="#6366f1"
                      fillOpacity={0.2}
                    />
                    <Area
                      type="monotone"
                      dataKey="benchmark"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.1}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Investment Stage Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-purple-600" />
                  Investment Stages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    count: { label: "Number of Investments", color: "#6366f1" },
                    amount: { label: "Amount Invested", color: "#8b5cf6" }
                  }}
                  className="h-80"
                >
                  <BarChart data={stageDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="stage" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar yAxisId="left" dataKey="count" fill="#6366f1" radius={4} />
                    <Bar yAxisId="right" dataKey="amount" fill="#8b5cf6" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sector Allocation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-5 h-5 mr-2 text-blue-600" />
                  Sector Allocation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sectorAllocationData.map((sector, index) => (
                    <div key={sector.name} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: sector.color }}
                        />
                        <span className="text-sm font-medium">{sector.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">{sector.value}%</div>
                        <div className="text-xs text-gray-500">${sector.amount.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Performers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-600" />
                  Top Performing Investments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformersData.map((company, index) => (
                    <div key={company.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{company.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{company.sector}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          {company.multiple}x
                        </div>
                        <div className="text-sm text-gray-500">
                          ${company.invested.toLocaleString()} → ${company.currentValue.toLocaleString()}
                        </div>
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

export default InvestorDashboard;