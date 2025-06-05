import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, Lightbulb, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HelpTip {
  id: string;
  title: string;
  content: string;
  link?: {
    text: string;
    url: string;
  };
  section: string;
}

interface ContextualHelpBubbleProps {
  section: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

// Sample help tips database
const helpTips: HelpTip[] = [
  {
    id: 'financial-projections',
    title: 'Financial Projections Tips',
    content: 'Make sure your financial projections are realistic and well-researched. Include best-case, worst-case, and most likely scenarios.',
    link: {
      text: 'View financial projection templates',
      url: '#templates/financial'
    },
    section: 'financial'
  },
  {
    id: 'market-analysis',
    title: 'Market Analysis Best Practices',
    content: 'Include market size, trends, growth rate, and target customer segments in your market analysis. Use credible sources for your data.',
    link: {
      text: 'Market research resources',
      url: '#resources/market'
    },
    section: 'market'
  },
  {
    id: 'executive-summary',
    title: 'Executive Summary Guidance',
    content: 'Your executive summary should be concise but compelling. Include your value proposition, target market, and growth potential.',
    section: 'summary'
  },
  {
    id: 'team-description',
    title: 'Team Section Tips',
    content: 'Highlight relevant experience and qualifications. Investors invest in people, so make this section stand out.',
    section: 'team'
  },
  {
    id: 'competition',
    title: 'Competitive Analysis',
    content: 'Be honest about your competition. Explain what makes your solution better and how you will maintain a competitive advantage.',
    section: 'competition'
  }
];

const ContextualHelpBubble: React.FC<ContextualHelpBubbleProps> = ({ 
  section, 
  position = 'bottom',
  delay = 2000
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTip, setCurrentTip] = useState<HelpTip | null>(null);
  
  // Set position classes based on the position prop
  const getPositionClasses = () => {
    switch (position) {
      case 'top': return 'bottom-full mb-2';
      case 'bottom': return 'top-full mt-2';
      case 'left': return 'right-full mr-2';
      case 'right': return 'left-full ml-2';
      default: return 'top-full mt-2';
    }
  };
  
  // Find relevant tips for the current section
  useEffect(() => {
    const relevantTips = helpTips.filter(tip => 
      tip.section.toLowerCase() === section.toLowerCase()
    );
    
    if (relevantTips.length > 0) {
      // Choose a random tip from relevant ones
      const randomTip = relevantTips[Math.floor(Math.random() * relevantTips.length)];
      setCurrentTip(randomTip);
      
      // Show the tip after a delay
      const timer = setTimeout(() => {
        setIsVisible(true);
        
        // Auto-hide after 10 seconds
        const hideTimer = setTimeout(() => {
          setIsVisible(false);
        }, 10000);
        
        return () => clearTimeout(hideTimer);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [section, delay]);
  
  if (!currentTip) return null;
  
  return (
    <div className="relative inline-block">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="h-6 w-6 bg-primary/20 rounded-full flex items-center justify-center cursor-help"
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsVisible(!isVisible)}
      >
        <HelpCircle className="h-4 w-4 text-primary" />
      </motion.div>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            className={`absolute ${getPositionClasses()} z-50 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3`}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <Lightbulb className="h-4 w-4 text-yellow-500 mr-2" />
                <h4 className="text-sm font-medium">{currentTip.title}</h4>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsVisible(false)}
                className="h-5 w-5 -mt-1 -mr-1"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
              {currentTip.content}
            </p>
            
            {currentTip.link && (
              <a 
                href={currentTip.link.url} 
                className="inline-flex items-center text-xs text-primary hover:underline mt-1"
              >
                {currentTip.link.text}
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContextualHelpBubble;