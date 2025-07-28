import React, { useState } from 'react';
import { DashboardCards, AnalysisProgressCard, FeasibilityScoreCard, AzureAIInsightsCard } from '@/components/ui/dashboard-cards';
import { RoleBasedDashboards } from '@/components/ui/role-based-dashboards';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, TrendingUp, Building, CreditCard } from 'lucide-react';
import { Link } from 'wouter';

const DashboardDemo: React.FC = () => {
  const [activeRole, setActiveRole] = useState<'founders' | 'investors' | 'partners' | 'lenders'>('founders');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">Interactive Dashboard Mockups</h1>
            <p className="text-slate-300 text-lg">
              Comprehensive role-based dashboards for Founders, Investors, Partners, and Lenders
            </p>
          </div>
          <Link href="/">
            <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Role Selection Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-slate-700/50 inline-flex">
            <button
              onClick={() => setActiveRole('founders')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                activeRole === 'founders'
                  ? 'bg-gradient-to-r from-cyan-600/50 to-blue-700/50 text-white shadow-md border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Users className="h-4 w-4" />
              Founders
            </button>
            <button
              onClick={() => setActiveRole('investors')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                activeRole === 'investors'
                  ? 'bg-gradient-to-r from-cyan-600/50 to-blue-700/50 text-white shadow-md border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              Investors
            </button>
            <button
              onClick={() => setActiveRole('partners')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                activeRole === 'partners'
                  ? 'bg-gradient-to-r from-cyan-600/50 to-blue-700/50 text-white shadow-md border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Building className="h-4 w-4" />
              Partners
            </button>
            <button
              onClick={() => setActiveRole('lenders')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                activeRole === 'lenders'
                  ? 'bg-gradient-to-r from-cyan-600/50 to-blue-700/50 text-white shadow-md border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <CreditCard className="h-4 w-4" />
              Lenders
            </button>
          </div>
        </div>

        {/* Active Role Dashboard */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6 capitalize">
            {activeRole} Dashboard
          </h2>
          <div className="bg-slate-800/30 backdrop-blur rounded-2xl border border-slate-700/50 p-8">
            {activeRole === 'founders' && <RoleBasedDashboards.FounderDashboard />}
            {activeRole === 'investors' && <RoleBasedDashboards.InvestorDashboard />}
            {activeRole === 'partners' && <RoleBasedDashboards.PartnerDashboard />}
            {activeRole === 'lenders' && <RoleBasedDashboards.LenderDashboard />}
          </div>
        </div>

        {/* Core Dashboard Cards Reference */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6">Core Dashboard Components</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-medium text-slate-300 mb-4">Analysis Progress Card</h3>
              <AnalysisProgressCard />
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-300 mb-4">Feasibility Score Card</h3>
              <FeasibilityScoreCard />
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-300 mb-4">Azure AI Insights Card</h3>
              <AzureAIInsightsCard />
            </div>
          </div>
        </div>

        {/* Dashboard Features Overview */}
        <div className="mt-16 p-6 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Dashboard Components Overview</h3>
          <div className="grid md:grid-cols-2 gap-8 text-sm text-slate-300">
            <div>
              <h4 className="font-medium text-white mb-4">Founder Dashboard Features:</h4>
              <ul className="space-y-2">
                <li>• Revenue Growth tracking with targets</li>
                <li>• Customer Acquisition metrics with churn analysis</li>
                <li>• Product-Market Fit scoring</li>
                <li>• Financial Health indicators (burn rate, runway)</li>
                <li>• AI-powered insights and recommendations</li>
              </ul>
              
              <h4 className="font-medium text-white mb-4 mt-6">Investor Dashboard Features:</h4>
              <ul className="space-y-2">
                <li>• Portfolio Performance vs benchmarks</li>
                <li>• Sector Allocation breakdown</li>
                <li>• Investment Stage distribution</li>
                <li>• Top Performing investments with multiples</li>
                <li>• Pipeline deals tracking</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4">Partner Dashboard Features:</h4>
              <ul className="space-y-2">
                <li>• Network Growth trends</li>
                <li>• Partnership Types distribution</li>
                <li>• Successful Matches by sector</li>
                <li>• Recent Activities timeline</li>
                <li>• Ecosystem engagement metrics</li>
              </ul>
              
              <h4 className="font-medium text-white mb-4 mt-6">Lender Dashboard Features:</h4>
              <ul className="space-y-2">
                <li>• Loan Portfolio performance</li>
                <li>• Risk Assessment distribution</li>
                <li>• Default Rate tracking</li>
                <li>• Loan Types breakdown</li>
                <li>• Application Status management</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDemo;