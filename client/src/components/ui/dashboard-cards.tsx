import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ChartLine, 
  Target, 
  CheckCircle, 
  Lightbulb, 
  TriangleAlert 
} from 'lucide-react';

export const AnalysisProgressCard: React.FC = () => {
  return (
    <Card className="bg-slate-800/50 border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-white">Analysis Progress</CardTitle>
          <ChartLine className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Document Processing</span>
          <span className="text-green-400">Complete</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full w-full"></div>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Market Analysis</span>
          <span className="text-yellow-400">In Progress</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full w-3/4"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export const FeasibilityScoreCard: React.FC = () => {
  return (
    <Card className="bg-slate-800/50 border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-white">Feasibility Score</CardTitle>
          <Target className="h-5 w-5 text-secondary" />
        </div>
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-4xl font-bold text-white mb-2">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            87/100
          </span>
        </div>
        <div className="text-sm text-slate-400 mb-4">High Potential</div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <div className="text-green-400 font-semibold text-sm">92</div>
            <div className="text-slate-500">Market</div>
          </div>
          <div className="text-center">
            <div className="text-blue-400 font-semibold text-sm">85</div>
            <div className="text-slate-500">Tech</div>
          </div>
          <div className="text-center">
            <div className="text-purple-400 font-semibold text-sm">84</div>
            <div className="text-slate-500">Finance</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const AzureAIInsightsCard: React.FC = () => {
  return (
    <Card className="bg-slate-800/50 border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-white">Azure AI Insights</CardTitle>
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex items-start gap-2">
          <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
          <span className="text-slate-300">Strong market opportunity identified in East Africa</span>
        </div>
        <div className="flex items-start gap-2">
          <Lightbulb className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
          <span className="text-slate-300">Consider B2B pivot for faster growth</span>
        </div>
        <div className="flex items-start gap-2">
          <TriangleAlert className="h-4 w-4 text-orange-400 mt-1 flex-shrink-0" />
          <span className="text-slate-300">Regulatory compliance review needed</span>
        </div>
      </CardContent>
    </Card>
  );
};

// Combined dashboard component showing all three cards
export const DashboardCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnalysisProgressCard />
      <FeasibilityScoreCard />
      <AzureAIInsightsCard />
    </div>
  );
};

export default DashboardCards;