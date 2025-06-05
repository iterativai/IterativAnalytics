import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ThumbsUp, ThumbsDown, Zap, LightbulbIcon, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { triggerConfetti } from '@/lib/celebrations';
import { useMentor } from './MentorContext';

type SuggestionType = 'financial' | 'valueProposition' | 'marketResearch' | 'competitiveAnalysis';

interface SuggestionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: SuggestionType;
  onApply?: (suggestionType: SuggestionType) => void;
}

const suggestions = {
  financial: {
    title: 'Financial Projection Improvement',
    description: 'I noticed your financial projections could be more detailed. Would you like help with this?',
    tips: [
      'Include monthly projections for the first year, quarterly for year 2',
      'Add sensitivity analysis for different growth scenarios',
      'Include detailed cost breakdowns by category',
      'Calculate key metrics like CAC, LTV, and payback period'
    ],
    icon: <Zap className="h-5 w-5 text-yellow-500" />
  },
  valueProposition: {
    title: 'Value Proposition Enhancement',
    description: 'Your value proposition could be more compelling. Would you like some suggestions?',
    tips: [
      'Clearly articulate the problem you are solving',
      'Quantify the benefits customers will receive',
      'Differentiate from alternatives more clearly',
      'Use specific customer examples or case studies'
    ],
    icon: <ThumbsUp className="h-5 w-5 text-blue-500" />
  },
  marketResearch: {
    title: 'Market Research Suggestions',
    description: 'I think your market analysis could benefit from more data. Would you like some suggestions?',
    tips: [
      'Include specific market size data with credible sources',
      'Add growth trends and projections for your market',
      'Break down demographics of your target customers',
      'Include regulatory considerations or market barriers'
    ],
    icon: <LightbulbIcon className="h-5 w-5 text-green-500" />
  },
  competitiveAnalysis: {
    title: 'Competitive Analysis Improvement',
    description: 'Your competitive analysis could be strengthened. Would you like some tips?',
    tips: [
      'Create a detailed comparison matrix with key competitors',
      'Analyze pricing strategies across the market',
      'Identify competitor strengths and weaknesses',
      'Explain your sustainable competitive advantage'
    ],
    icon: <Sparkles className="h-5 w-5 text-purple-500" />
  }
};

const SuggestionModal: React.FC<SuggestionModalProps> = ({ 
  open, 
  onOpenChange,
  type = 'financial',
  onApply
}) => {
  const { closeSuggestionModal } = useMentor();
  const [selectedType, setSelectedType] = useState<SuggestionType>(type);
  const [animatingTip, setAnimatingTip] = useState(-1);
  
  useEffect(() => {
    if (type) {
      setSelectedType(type);
    }
  }, [type]);
  
  useEffect(() => {
    if (open) {
      // Animate tips one by one
      let tipIndex = 0;
      const interval = setInterval(() => {
        if (tipIndex < suggestions[selectedType].tips.length) {
          setAnimatingTip(tipIndex);
          tipIndex++;
        } else {
          clearInterval(interval);
        }
      }, 400);
      
      return () => clearInterval(interval);
    } else {
      setAnimatingTip(-1);
    }
  }, [open, selectedType]);
  
  const handleApply = () => {
    if (onApply) {
      onApply(selectedType);
    }
    // Trigger a celebratory confetti effect
    triggerConfetti({ 
      particleCount: 80,
      spread: 50,
      origin: { x: 0.5, y: 0.6 } 
    });
    onOpenChange(false);
    closeSuggestionModal();
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {suggestions[selectedType].icon}
            <DialogTitle>{suggestions[selectedType].title}</DialogTitle>
          </div>
          <DialogDescription>
            {suggestions[selectedType].description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-3">
          <h4 className="text-sm font-medium mb-3 flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-primary" />
            Suggested Improvements
          </h4>
          
          <ul className="space-y-2">
            {suggestions[selectedType].tips.map((tip, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: animatingTip >= index ? 1 : 0, 
                  x: animatingTip >= index ? 0 : -20 
                }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-2 text-sm"
              >
                <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <motion.span 
                    animate={{ scale: [0.8, 1.2, 1] }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="h-1.5 w-1.5 rounded-full bg-primary"
                  />
                </div>
                <span>{tip}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        
        <DialogFooter className="flex sm:justify-between gap-3">
          <Button 
            variant="outline" 
            size="sm"
            className="gap-1"
            onClick={() => {
              onOpenChange(false);
              closeSuggestionModal();
            }}
          >
            <ThumbsDown className="h-4 w-4" />
            <span>Not now</span>
          </Button>
          
          <Button 
            size="sm"
            className="gap-1"
            onClick={handleApply}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>Apply suggestions</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuggestionModal;