import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  DollarSign, 
  Shield, 
  Target, 
  CreditCard,
  BarChart3,
  PieChart,
  Activity,
  AlertTriangle,
  CheckCircle
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

interface LenderMetrics {
  totalLoansIssued: number;
  activeLoans: number;
  totalOutstanding: number;
  defaultRate: number;
  avgInterestRate: number;
  portfolioGrowth: number;
  approvalRate: number;
  avgLoanSize: number;
}

const LenderDashboard = () => {
  const [metrics, setMetrics] = useState<LenderMetrics>({
    totalLoansIssued: 3250000,
    activeLoans: 45,
    totalOutstanding: 2850000,
    defaultRate: 3.2,
    avgInterestRate: 12.5,
    portfolioGrowth: 18.7,
    approvalRate: 67.8,
    avgLoanSize: 72000
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Loan portfolio performance
  const loanPerformanceData = [
    { month: 'Jan', issued: 180000, outstanding: 2100000, defaults: 8000 },
    { month: 'Feb', issued: 220000, outstanding: 2250000, defaults: 6500 },
    { month: 'Mar', issued: 195000, outstanding: 2380000, defaults: 12000 },
    { month: 'Apr', issued: 285000, outstanding: 2520000, defaults: 9200 },
    { month: 'May', issued: 310000, outstanding: 2680000, defaults: 7800 },
    { month: 'Jun', issued: 350000, outstanding: 2850000, defaults: 11500 },
  ];

  // Risk distribution
  const riskDistributionData = [
    { risk: 'Low Risk', count: 18, amount: 1425000, color: '#10b981' },
    { risk: 'Medium Risk', count: 21, amount: 1140000, color: '#f59e0b' },
    { risk: 'High Risk', count: 6, amount: 285000, color: '#ef4444' },
  ];

  // Loan types distribution
  const loanTypesData = [
    { name: 'Working Capital', value: 45, color: '#3b82f6', amount: 1282500 },
    { name: 'Equipment Finance', value: 25, color: '#10b981', amount: 712500 },
    { name: 'Bridge Loans', value: 20, color: '#f59e0b', amount: 570000 },
    { name: 'Expansion Loans', value: 10, color: '#8b5cf6', amount: 285000 },
  ];

  // Recent loan applications
  const recentApplications = [
    { company: 'TechFlow Solutions', amount: 150000, risk: 'Low', status: 'Approved', sector: 'FinTech' },
    { company: 'HealthCare Plus', amount: 95000, risk: 'Medium', status: 'Under Review', sector: 'HealthTech' },
    { company: 'GreenEnergy Co', amount: 200000, risk: 'Low', status: 'Approved', sector: 'CleanTech' },
    { company: 'EduSmart Ltd', amount: 75000, risk: 'High', status: 'Rejected', sector: 'EdTech' },
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
              {change !== null && (
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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-slate-900 dark:to-amber-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[600px] bg-gradient-to-br from-amber-50 to-orange-100 dark:from-slate-900 dark:to-amber-900 p-6">
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
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Lender Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Loan portfolio management and risk assessment</p>
            </div>
            <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-300">
              Portfolio Active
            </Badge>
          </div>
        </motion.div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Loans Issued"
            value={metrics.totalLoansIssued}
            change={metrics.portfolioGrowth}
            icon={DollarSign}
            color="from-amber-500 to-orange-600"
            prefix="$"
          />
          <MetricCard
            title="Active Loans"
            value={metrics.activeLoans}
            change={12.5}
            icon={CreditCard}
            color="from-blue-500 to-cyan-600"
          />
          <MetricCard
            title="Outstanding Amount"
            value={metrics.totalOutstanding}
            change={8.3}
            icon={Target}
            color="from-green-500 to-emerald-600"
            prefix="$"
          />
          <MetricCard
            title="Default Rate"
            value={metrics.defaultRate}
            change={-2.1}
            icon={Shield}
            color="from-red-500 to-pink-600"
            suffix="%"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Loan Performance */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-amber-600" />
                  Loan Portfolio Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    issued: { label: "Loans Issued", color: "#f59e0b" },
                    outstanding: { label: "Outstanding", color: "#3b82f6" },
                    defaults: { label: "Defaults", color: "#ef4444" }
                  }}
                  className="h-80"
                >
                  <AreaChart data={loanPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="outstanding"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.2}
                    />
                    <Area
                      type="monotone"
                      dataKey="issued"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.3}
                    />
                    <Area
                      type="monotone"
                      dataKey="defaults"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.1}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Risk Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-red-600" />
                  Risk Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    count: { label: "Number of Loans", color: "#6366f1" },
                    amount: { label: "Amount", color: "#8b5cf6" }
                  }}
                  className="h-80"
                >
                  <BarChart data={riskDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="risk" />
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
          {/* Loan Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-5 h-5 mr-2 text-orange-600" />
                  Loan Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loanTypesData.map((type, index) => (
                    <div key={type.name} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: type.color }}
                        />
                        <span className="text-sm font-medium">{type.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">{type.value}%</div>
                        <div className="text-xs text-gray-500">${type.amount.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Applications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-600" />
                  Recent Loan Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((application, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${
                          application.status === 'Approved' ? 'bg-green-100 text-green-600' :
                          application.status === 'Under Review' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          {application.status === 'Approved' ? <CheckCircle className="w-4 h-4" /> :
                           application.status === 'Under Review' ? <Activity className="w-4 h-4" /> :
                           <AlertTriangle className="w-4 h-4" />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{application.company}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{application.sector}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          ${application.amount.toLocaleString()}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={application.risk === 'Low' ? 'default' : application.risk === 'Medium' ? 'secondary' : 'destructive'}
                            className="text-xs"
                          >
                            {application.risk}
                          </Badge>
                          <Badge 
                            variant={application.status === 'Approved' ? 'default' : application.status === 'Under Review' ? 'secondary' : 'destructive'}
                            className="text-xs"
                          >
                            {application.status}
                          </Badge>
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

export default LenderDashboard;