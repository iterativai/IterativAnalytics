import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageSquare, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuggestionTooltipProps {
  section: string;
  fieldContent?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  onAccept?: (suggestion: string) => void;
  onDismiss?: () => void;
}

// Sample suggestion database based on content patterns
const suggestionPatterns = [
  {
    trigger: /financ(?:ial|e)/i,
    suggestions: [
      "Consider including a cash flow projection for the first 24 months.",
      "Investors typically look for clear break-even analysis. Try adding this.",
      "Your financial section could benefit from a sensitivity analysis.",
    ]
  },
  {
    trigger: /market|customer|audience/i,
    suggestions: [
      "Add specific market size data with credible sources.",
      "Consider breaking down your target market into primary and secondary segments.",
      "Include a brief competitor analysis to strengthen this section.",
    ]
  },
  {
    trigger: /team|founder|leadership/i,
    suggestions: [
      "Highlight specific achievements of key team members.",
      "Consider adding a brief section on planned hires and organizational structure.",
      "Investors value domain expertise. Emphasize relevant experience.",
    ]
  },
  {
    trigger: /product|service|solution/i,
    suggestions: [
      "Include a clear product development timeline.",
      "Consider adding a section on intellectual property strategy.",
      "Describe your product's unfair advantage in more detail.",
    ]
  },
  {
    trigger: /revenue|monetization|pricing/i,
    suggestions: [
      "Consider exploring alternative revenue streams.",
      "Add a brief comparison with competitor pricing models.",
      "Include a section on customer lifetime value calculations.",
    ]
  }
];

const SuggestionTooltip: React.FC<SuggestionTooltipProps> = ({
  section,
  fieldContent = '',
  position = 'top',
  onAccept,
  onDismiss
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isSparkleAnimating, setIsSparkleAnimating] = useState(false);
  
  // Find suggestions based on content and section
  useEffect(() => {
    // Don't show suggestions for empty content or very short content
    if (!fieldContent || fieldContent.length < 15) {
      setSuggestion(null);
      setIsVisible(false);
      return;
    }
    
    // Find matching patterns
    const matches: string[] = [];
    
    suggestionPatterns.forEach(pattern => {
      if (pattern.trigger.test(fieldContent) || pattern.trigger.test(section)) {
        matches.push(...pattern.suggestions);
      }
    });
    
    if (matches.length > 0) {
      // Pick random suggestion
      const randomSuggestion = matches[Math.floor(Math.random() * matches.length)];
      setSuggestion(randomSuggestion);
      
      // Show suggestion with 30% probability
      if (Math.random() < 0.3) {
        setTimeout(() => {
          setIsVisible(true);
          setIsSparkleAnimating(true);
          setTimeout(() => setIsSparkleAnimating(false), 2000);
        }, 1500);
      }
    } else {
      setSuggestion(null);
    }
  }, [fieldContent, section]);
  
  // Set position classes based on the position prop
  const getPositionClasses = () => {
    switch (position) {
      case 'top': return 'bottom-full mb-2';
      case 'bottom': return 'top-full mt-2';
      case 'left': return 'right-full mr-2';
      case 'right': return 'left-full ml-2';
      default: return 'bottom-full mb-2';
    }
  };
  
  const handleAccept = () => {
    if (suggestion && onAccept) {
      onAccept(suggestion);
    }
    setIsVisible(false);
  };
  
  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    }
    setIsVisible(false);
  };
  
  if (!suggestion) return null;
  
  return (
    <div className="relative inline-block">
      <motion.div 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="h-7 w-7 bg-primary/10 rounded-full flex items-center justify-center cursor-pointer"
        onClick={() => setIsVisible(!isVisible)}
      >
        <motion.div
          animate={isSparkleAnimating ? {
            rotate: [0, 15, -15, 0],
            scale: [1, 1.2, 1]
          } : {}}
          transition={{ duration: 1, repeat: isSparkleAnimating ? 2 : 0 }}
        >
          <Sparkles className="h-4 w-4 text-primary" />
        </motion.div>
      </motion.div>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            className={`absolute ${getPositionClasses()} z-50 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 border border-primary/20`}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <div className="flex items-start mb-2">
              <div className="mr-2 mt-0.5">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 3
                  }}
                >
                  <MessageSquare className="h-4 w-4 text-primary" />
                </motion.div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">AI Suggestion</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {suggestion}
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs px-2 flex items-center"
                onClick={handleDismiss}
              >
                <X className="h-3 w-3 mr-1" />
                Dismiss
              </Button>
              <Button
                size="sm"
                className="h-7 text-xs px-2 flex items-center"
                onClick={handleAccept}
              >
                <Check className="h-3 w-3 mr-1" />
                Apply
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SuggestionTooltip;