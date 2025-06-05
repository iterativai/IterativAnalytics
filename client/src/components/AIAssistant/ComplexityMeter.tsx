import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Gauge, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ComplexityMeterProps {
  complexity?: number; // 0-100
  planData?: any;
}

const ComplexityMeter: React.FC<ComplexityMeterProps> = ({ 
  complexity = 0,
  planData
}) => {
  const [currentComplexity, setCurrentComplexity] = useState(0);
  const [expanded, setExpanded] = useState(false);
  
  // Animate complexity value changes
  useEffect(() => {
    // If complexity value changes, animate to new value
    if (complexity !== currentComplexity) {
      const interval = setInterval(() => {
        setCurrentComplexity(prev => {
          if (prev < complexity) {
            return Math.min(prev + 1, complexity);
          } else if (prev > complexity) {
            return Math.max(prev - 1, complexity);
          }
          return prev;
        });
      }, 20);
      
      return () => clearInterval(interval);
    }
  }, [complexity, currentComplexity]);
  
  // Calculate colors and status
  const getStatusColor = (value: number) => {
    if (value < 30) return 'bg-green-500';
    if (value < 60) return 'bg-yellow-500';
    if (value < 80) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  const getStatusText = (value: number) => {
    if (value < 30) return 'Simple & Focused';
    if (value < 60) return 'Moderate';
    if (value < 80) return 'Comprehensive';
    return 'Very Complex';
  };
  
  const getMeterFeedback = (value: number) => {
    if (value < 30) {
      return [
        'Clear and concise plan',
        'Easy for investors to understand',
        'Quick to review and evaluate'
      ];
    }
    if (value < 60) {
      return [
        'Good balance of detail and clarity',
        'Covers important aspects well',
        'Consider simplifying some sections'
      ];
    }
    if (value < 80) {
      return [
        'Highly detailed business plan',
        'May be challenging for quick review',
        'Consider creating an executive summary'
      ];
    }
    return [
      'Extremely detailed and complex',
      'Consider simplifying for investor readability',
      'Break into smaller, focused sections'
    ];
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <Gauge className="h-5 w-5 text-primary" />
          <h3 className="font-medium text-sm">Plan Complexity Meter</h3>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-gray-400 hover:text-gray-600">
                <Info className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-xs">
              <p className="text-xs">
                The complexity meter measures how detailed and comprehensive your business plan is.
                Lower complexity makes it easier for investors to quickly review, while higher
                complexity provides more details but may require more time to evaluate.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
        <motion.div 
          className={`h-full ${getStatusColor(currentComplexity)}`}
          initial={{ width: '0%' }}
          animate={{ width: `${currentComplexity}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        />
      </div>
      
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-500">
          {getStatusText(currentComplexity)}
        </span>
        <span className="text-xs font-medium">
          {currentComplexity}/100
        </span>
      </div>
      
      <button 
        className="w-full flex items-center justify-center text-xs text-gray-500 hover:text-gray-700 mt-1"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? (
          <>
            <span>Show less</span>
            <ChevronUp className="h-3 w-3 ml-1" />
          </>
        ) : (
          <>
            <span>Show details</span>
            <ChevronDown className="h-3 w-3 ml-1" />
          </>
        )}
      </button>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2 mt-2 border-t border-gray-100 dark:border-gray-700">
              <h4 className="text-xs font-medium mb-2">Feedback:</h4>
              <ul className="space-y-1">
                {getMeterFeedback(currentComplexity).map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-xs text-gray-600 dark:text-gray-300 flex items-start"
                  >
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary mt-1 mr-2" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComplexityMeter;