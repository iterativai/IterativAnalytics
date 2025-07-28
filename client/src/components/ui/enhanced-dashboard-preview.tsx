import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, DollarSign, Brain, ChartLine, CheckCircle, Lightbulb, TriangleAlert } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'; // Assuming you have a Card component

interface DashboardMetrics {
  analysisProgress: number;
  feasibilityScore: number;
  aiInsightsReady: boolean;
}

interface EnhancedDashboardPreviewProps {
  metrics: DashboardMetrics;
}

const EnhancedDashboardPreview: React.FC<EnhancedDashboardPreviewProps> = ({ 
  metrics = { 
    analysisProgress: 75, 
    feasibilityScore: 87, 
    aiInsightsReady: true 
  } 
}) => {
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">AI Business Intelligence</h3>
            <p className="text-white/60 text-sm">Live Analytics Dashboard</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-xs font-medium">Live</span>
          </div>
        </div>

        {/* Enhanced Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Analysis Progress Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="bg-slate-800/50 border-white/10 h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white">Analysis Progress</CardTitle>
                  <ChartLine className="h-5 w-5 text-blue-400" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Document Processing</span>
                  <span className="text-green-400">Complete</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Market Analysis</span>
                  <span className="text-yellow-400">In Progress</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${metrics.analysisProgress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feasibility Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="bg-slate-800/50 border-white/10 h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white">Feasibility Score</CardTitle>
                  <Target className="h-5 w-5 text-purple-400" />
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <motion.div 
                  className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  {metrics.feasibilityScore}/100
                </motion.div>
                <div className="text-sm text-slate-400 mb-4">High Potential</div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="text-green-400 font-semibold">92</div>
                    <div className="text-slate-500">Market</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-400 font-semibold">85</div>
                    <div className="text-slate-500">Tech</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-400 font-semibold">84</div>
                    <div className="text-slate-500">Finance</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Azure AI Insights Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="bg-slate-800/50 border-white/10 h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white">Azure AI Insights</CardTitle>
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <motion.div 
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">Strong market opportunity identified in East Africa</span>
                </motion.div>
                <motion.div 
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Lightbulb className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">Consider B2B pivot for faster growth</span>
                </motion.div>
                <motion.div 
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <TriangleAlert className="h-4 w-4 text-orange-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">Regulatory compliance review needed</span>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Enhanced AI Status */}
        <div className="text-center bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Brain className="w-5 h-5 text-orange-400" />
            <p className="text-white/80 font-medium">AI Engine Processing</p>
          </div>
          <div className="flex justify-center space-x-2">
            <motion.div 
              className="w-3 h-3 bg-orange-400 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
            <motion.div 
              className="w-3 h-3 bg-pink-400 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.3
              }}
            />
            <motion.div 
              className="w-3 h-3 bg-blue-400 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.6
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedDashboardPreview;