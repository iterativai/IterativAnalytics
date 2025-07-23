
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, DollarSign, Brain, ChartLine, CheckCircle, Lightbulb, TriangleAlert, MapPin } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './card';

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
            className="bg-slate-800/80 backdrop-blur border border-slate-700/50 rounded-2xl p-6 h-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-lg font-semibold">Analysis Progress</h3>
              <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                <ChartLine className="h-4 w-4 text-white" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm">Document Processing</span>
                  <span className="text-green-400 text-sm font-medium">Complete</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm">Market Analysis</span>
                  <span className="text-yellow-400 text-sm font-medium">In Progress</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feasibility Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-slate-800/80 backdrop-blur border border-slate-700/50 rounded-2xl p-6 h-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-lg font-semibold">Feasibility Score</h3>
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <Target className="h-4 w-4 text-white" />
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <motion.div 
                className="text-5xl font-bold text-blue-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                87<span className="text-3xl text-slate-400">/100</span>
              </motion.div>
              
              <div className="text-slate-300 text-sm font-medium">High Potential</div>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-green-400 font-bold text-lg">92</div>
                  <div className="text-slate-400 text-xs">Market</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-400 font-bold text-lg">85</div>
                  <div className="text-slate-400 text-xs">Tech</div>
                </div>
                <div className="text-center">
                  <div className="text-purple-400 font-bold text-lg">84</div>
                  <div className="text-slate-400 text-xs">Finance</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Azure AI Insights Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="bg-slate-800/80 backdrop-blur border border-slate-700/50 rounded-2xl p-6 h-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-lg font-semibold">Azure AI Insights</h3>
              <div className="w-6 h-6 bg-blue-500 rounded"></div>
            </div>
            
            <div className="space-y-4">
              <motion.div 
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300 text-sm leading-relaxed">Strong market opportunity identified in East Africa</span>
              </motion.div>
              
              <motion.div 
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <MapPin className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300 text-sm leading-relaxed">Consider B2B pivot for faster growth</span>
              </motion.div>
              
              <motion.div 
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <TriangleAlert className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300 text-sm leading-relaxed">Regulatory compliance review needed</span>
              </motion.div>
            </div>
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
