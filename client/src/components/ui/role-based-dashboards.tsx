import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Target, 
  AlertTriangle,
  CheckCircle2,
  PieChart,
  BarChart3,
  Activity,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
  FileText,
  Building,
  CreditCard,
  Wallet,
  Shield,
  Network
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  description?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, trend, icon, description }) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <ArrowUpRight className="h-4 w-4" />;
      case 'down': return <ArrowDownRight className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <Card className="bg-slate-800/50 border-white/10 hover:border-white/20 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-slate-400 text-sm">{title}</div>
          <div className="text-cyan-400">{icon}</div>
        </div>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <div className={`flex items-center gap-1 text-sm ${getTrendColor()}`}>
          {getTrendIcon()}
          <span>{change}</span>
        </div>
        {description && (
          <div className="text-xs text-slate-500 mt-2">{description}</div>
        )}
      </CardContent>
    </Card>
  );
};

export const FounderDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Key Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Monthly Revenue"
          value="$24.5K"
          change="+18.2% vs last month"
          trend="up"
          icon={<DollarSign className="h-5 w-5" />}
          description="Target: $30K by Q2"
        />
        <MetricCard
          title="Active Users"
          value="2,847"
          change="+12.5% growth"
          trend="up"
          icon={<Users className="h-5 w-5" />}
          description="Churn rate: 3.2%"
        />
        <MetricCard
          title="Burn Rate"
          value="$8.2K/mo"
          change="18 months runway"
          trend="neutral"
          icon={<TrendingDown className="h-5 w-5" />}
          description="Cash: $147K remaining"
        />
        <MetricCard
          title="PMF Score"
          value="72/100"
          change="+8 points"
          trend="up"
          icon={<Target className="h-5 w-5" />}
          description="Strong product-market fit"
        />
      </div>

      {/* Revenue & Growth Analysis */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-cyan-400" />
              Revenue Growth Trajectory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Q4 2024</span>
                <span className="text-white font-semibold">$67.2K</span>
              </div>
              <Progress value={85} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Q1 2025 (Projected)</span>
                <span className="text-cyan-400 font-semibold">$89.5K</span>
              </div>
              <Progress value={65} className="h-2" />
              
              <div className="pt-2 border-t border-slate-700">
                <div className="text-sm text-slate-300">
                  <div className="flex justify-between">
                    <span>ARR Growth Rate:</span>
                    <span className="text-green-400">+142%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer LTV:</span>
                    <span className="text-white">$2,840</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CAC Payback:</span>
                    <span className="text-white">8.2 months</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI-Powered Insights */}
        <Card className="bg-slate-800/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-400" />
              AI Strategic Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-green-900/20 rounded-lg border border-green-800/50">
              <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <div className="text-green-300 font-medium">Ready for Series A</div>
                <div className="text-slate-400">Strong unit economics & growth metrics indicate readiness for $2M+ round</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg border border-blue-800/50">
              <Target className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <div className="text-blue-300 font-medium">Expand to Nigeria Market</div>
                <div className="text-slate-400">Market analysis shows 340% opportunity in Lagos fintech sector</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-orange-900/20 rounded-lg border border-orange-800/50">
              <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <div className="text-orange-300 font-medium">Customer Concentration Risk</div>
                <div className="text-slate-400">Top 3 customers represent 42% of revenue - diversify client base</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const InvestorDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Portfolio Value"
          value="$12.4M"
          change="+23.7% YTD"
          trend="up"
          icon={<Wallet className="h-5 w-5" />}
          description="32 active investments"
        />
        <MetricCard
          title="IRR Performance"
          value="34.2%"
          change="vs 28% benchmark"
          trend="up"
          icon={<TrendingUp className="h-5 w-5" />}
          description="Top quartile performance"
        />
        <MetricCard
          title="Active Pipeline"
          value="18 deals"
          change="$4.2M requested"
          trend="neutral"
          icon={<FileText className="h-5 w-5" />}
          description="Due diligence: 6 companies"
        />
        <MetricCard
          title="Exits This Year"
          value="3 exits"
          change="2.4x avg multiple"
          trend="up"
          icon={<ArrowUpRight className="h-5 w-5" />}
          description="$8.7M total returns"
        />
      </div>

      {/* Portfolio Performance & Sector Analysis */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PieChart className="h-5 w-5 text-purple-400" />
              Sector Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { sector: 'Fintech', allocation: 35, value: '$4.3M', performance: '+28.4%', color: 'bg-blue-500' },
                { sector: 'Healthtech', allocation: 22, value: '$2.7M', performance: '+41.2%', color: 'bg-green-500' },
                { sector: 'Agritech', allocation: 18, value: '$2.2M', performance: '+15.8%', color: 'bg-yellow-500' },
                { sector: 'EdTech', allocation: 15, value: '$1.9M', performance: '+22.1%', color: 'bg-purple-500' },
                { sector: 'Logistics', allocation: 10, value: '$1.3M', performance: '+8.7%', color: 'bg-red-500' }
              ].map((item) => (
                <div key={item.sector} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-white font-medium">{item.sector}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white text-sm">{item.value}</div>
                      <div className="text-green-400 text-xs">{item.performance}</div>
                    </div>
                  </div>
                  <Progress value={item.allocation} className="h-2" />
                  <div className="text-slate-400 text-xs">{item.allocation}% of portfolio</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Investments */}
        <Card className="bg-slate-800/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { company: 'PayFlow Africa', sector: 'Fintech', multiple: '4.2x', invested: '$250K', current: '$1.05M', stage: 'Series A' },
                { company: 'MedConnect', sector: 'Healthtech', multiple: '3.8x', invested: '$180K', current: '$684K', stage: 'Seed+' },
                { company: 'FarmLink', sector: 'Agritech', multiple: '2.9x', invested: '$200K', current: '$580K', stage: 'Series A' },
                { company: 'EduTech Pro', sector: 'EdTech', multiple: '2.1x', invested: '$150K', current: '$315K', stage: 'Seed' }
              ].map((investment, index) => (
                <div key={index} className="p-3 bg-slate-700/30 rounded-lg border border-slate-600/50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-white font-medium">{investment.company}</div>
                      <div className="text-slate-400 text-sm">{investment.sector} • {investment.stage}</div>
                    </div>
                    <Badge className="bg-green-900/30 text-green-400 border-green-800/50">
                      {investment.multiple}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Invested: {investment.invested}</span>
                    <span className="text-white">Current: {investment.current}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const PartnerDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Network Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Network Size"
          value="1,247"
          change="+156 this month"
          trend="up"
          icon={<Network className="h-5 w-5" />}
          description="Startups & organizations"
        />
        <MetricCard
          title="Active Partnerships"
          value="89"
          change="+12 new matches"
          trend="up"
          icon={<Building className="h-5 w-5" />}
          description="Cross-sector collaborations"
        />
        <MetricCard
          title="Successful Matches"
          value="234"
          change="94% success rate"
          trend="up"
          icon={<CheckCircle2 className="h-5 w-5" />}
          description="Completed partnerships"
        />
        <MetricCard
          title="Total Deal Value"
          value="$18.9M"
          change="+31% vs last quarter"
          trend="up"
          icon={<DollarSign className="h-5 w-5" />}
          description="Partnership transactions"
        />
      </div>

      {/* Partnership Analytics */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-cyan-400" />
              Partnership Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'Strategic Alliances', count: 45, value: '$8.2M', growth: '+24%' },
                { type: 'Technology Integration', count: 32, value: '$4.8M', growth: '+18%' },
                { type: 'Market Expansion', count: 28, value: '$3.1M', growth: '+35%' },
                { type: 'Supply Chain', count: 19, value: '$2.8M', growth: '+12%' }
              ].map((partnership, index) => (
                <div key={index} className="p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{partnership.type}</span>
                    <Badge className="bg-cyan-900/30 text-cyan-400 border-cyan-800/50">
                      {partnership.growth}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">{partnership.count} partnerships</span>
                    <span className="text-white">{partnership.value} in deals</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Feed */}
        <Card className="bg-slate-800/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-400" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: 'New partnership', company: 'TechCorp & FinanceFlow', time: '2 hours ago', type: 'success' },
                { action: 'Deal signed', company: 'AgriTech Solutions', time: '5 hours ago', type: 'success' },
                { action: 'Meeting scheduled', company: 'HealthConnect partnership', time: '1 day ago', type: 'pending' },
                { action: 'Due diligence', company: 'LogiFlow integration review', time: '2 days ago', type: 'in-progress' },
                { action: 'Partnership inquiry', company: 'EduTech expansion request', time: '3 days ago', type: 'new' }
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-2">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-green-400' :
                    activity.type === 'pending' ? 'bg-yellow-400' :
                    activity.type === 'in-progress' ? 'bg-blue-400' : 'bg-gray-400'
                  }`}></div>
                  <div className="flex-1">
                    <div className="text-white text-sm">{activity.action}</div>
                    <div className="text-slate-400 text-xs">{activity.company}</div>
                    <div className="text-slate-500 text-xs">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const LenderDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Lending Portfolio Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Loans Outstanding"
          value="$4.2M"
          change="+15.8% growth"
          trend="up"
          icon={<CreditCard className="h-5 w-5" />}
          description="147 active loans"
        />
        <MetricCard
          title="Default Rate"
          value="2.3%"
          change="-0.7% improvement"
          trend="up"
          icon={<Shield className="h-5 w-5" />}
          description="Below 3% target"
        />
        <MetricCard
          title="Avg Interest Rate"
          value="12.5%"
          change="Market competitive"
          trend="neutral"
          icon={<TrendingUp className="h-5 w-5" />}
          description="Risk-adjusted pricing"
        />
        <MetricCard
          title="Applications This Month"
          value="89"
          change="+23% vs last month"
          trend="up"
          icon={<FileText className="h-5 w-5" />}
          description="$2.1M total requested"
        />
      </div>

      {/* Risk Assessment & Loan Performance */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-400" />
              Risk Assessment Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { risk: 'Low Risk (A)', percentage: 42, amount: '$1.76M', rate: '8.5%', color: 'bg-green-500' },
                { risk: 'Medium Risk (B)', percentage: 35, amount: '$1.47M', rate: '12.5%', color: 'bg-yellow-500' },
                { risk: 'High Risk (C)', percentage: 18, amount: '$756K', rate: '18.0%', color: 'bg-orange-500' },
                { risk: 'Watch List (D)', percentage: 5, amount: '$210K', rate: '24.0%', color: 'bg-red-500' }
              ].map((risk, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${risk.color}`}></div>
                      <span className="text-white font-medium">{risk.risk}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white text-sm">{risk.amount}</div>
                      <div className="text-slate-400 text-xs">{risk.rate} avg rate</div>
                    </div>
                  </div>
                  <Progress value={risk.percentage} className="h-2" />
                  <div className="text-slate-400 text-xs">{risk.percentage}% of portfolio</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Loan Applications Pipeline */}
        <Card className="bg-slate-800/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-400" />
              Application Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { company: 'TechStart Solutions', amount: '$150K', stage: 'Under Review', risk: 'B', sector: 'Fintech' },
                { company: 'GreenAgri Corp', amount: '$89K', stage: 'Approved', risk: 'A', sector: 'Agritech' },
                { company: 'HealthPlus Med', amount: '$200K', stage: 'Due Diligence', risk: 'B', sector: 'Healthtech' },
                { company: 'LogiFlow Express', amount: '$75K', stage: 'Documentation', risk: 'A', sector: 'Logistics' }
              ].map((application, index) => (
                <div key={index} className="p-3 bg-slate-700/30 rounded-lg border border-slate-600/50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-white font-medium">{application.company}</div>
                      <div className="text-slate-400 text-sm">{application.sector}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{application.amount}</div>
                      <Badge className={`text-xs ${
                        application.risk === 'A' ? 'bg-green-900/30 text-green-400 border-green-800/50' :
                        'bg-yellow-900/30 text-yellow-400 border-yellow-800/50'
                      }`}>
                        Risk {application.risk}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge className={`text-xs ${
                      application.stage === 'Approved' ? 'bg-green-900/30 text-green-400 border-green-800/50' :
                      application.stage === 'Under Review' ? 'bg-blue-900/30 text-blue-400 border-blue-800/50' :
                      'bg-orange-900/30 text-orange-400 border-orange-800/50'
                    }`}>
                      {application.stage}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const RoleBasedDashboards = {
  FounderDashboard,
  InvestorDashboard,
  PartnerDashboard,
  LenderDashboard
};