import React from 'react';
import { DashboardCards, AnalysisProgressCard, FeasibilityScoreCard, AzureAIInsightsCard } from '@/components/ui/dashboard-cards';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

const DashboardDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">Dashboard Cards Demo</h1>
            <p className="text-slate-300 text-lg">
              Exact replicas of the Analysis Progress, Feasibility Score, and Azure AI Insights cards
            </p>
          </div>
          <Link href="/">
            <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Combined Dashboard Cards */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6">Combined Dashboard View</h2>
          <DashboardCards />
        </div>

        {/* Individual Cards for Detail View */}
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6">Individual Card Components</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Analysis Progress Card */}
              <div>
                <h3 className="text-lg font-medium text-slate-300 mb-4">Analysis Progress Card</h3>
                <AnalysisProgressCard />
              </div>

              {/* Feasibility Score Card */}
              <div>
                <h3 className="text-lg font-medium text-slate-300 mb-4">Feasibility Score Card</h3>
                <FeasibilityScoreCard />
              </div>

              {/* Azure AI Insights Card */}
              <div>
                <h3 className="text-lg font-medium text-slate-300 mb-4">Azure AI Insights Card</h3>
                <AzureAIInsightsCard />
              </div>
            </div>
          </div>
        </div>

        {/* Implementation Notes */}
        <div className="mt-16 p-6 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Implementation Notes</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div>
              <h4 className="font-medium text-white mb-2">Design Features:</h4>
              <ul className="space-y-1">
                <li>• Dark theme with slate-800/50 background</li>
                <li>• White/10 border opacity for subtle contrast</li>
                <li>• Gradient progress bars with primary/secondary colors</li>
                <li>• Color-coded status indicators (green, yellow, blue)</li>
                <li>• Consistent spacing and typography</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Technical Implementation:</h4>
              <ul className="space-y-1">
                <li>• Built with shadcn/ui Card components</li>
                <li>• Lucide React icons for visual consistency</li>
                <li>• Tailwind CSS for styling and responsiveness</li>
                <li>• Modular component structure for reusability</li>
                <li>• Matches exact design specifications from provided image</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDemo;