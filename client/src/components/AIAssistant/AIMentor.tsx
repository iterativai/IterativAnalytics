import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMentor } from './MentorContext';
import SuggestionModal from './SuggestionModal';

interface AIMentorProps {
  onSuggest?: (suggestion: string) => void;
}

// Helper function for the typing animation effect
const useTypingAnimation = (text: string, speed: number = 35) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDone, setIsDone] = useState(false);
  
  const startTyping = () => {
    setDisplayedText('');
    setIsTyping(true);
    setIsDone(false);
  };
  
  useEffect(() => {
    if (!isTyping) return;
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setIsDone(true);
      }
    }, speed);
    
    return () => clearInterval(interval);
  }, [text, speed, isTyping]);
  
  return { displayedText, isTyping, isDone, startTyping };
};

export const AIMentor: React.FC<AIMentorProps> = ({ onSuggest }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { isSuggestionModalOpen, openSuggestionModal, lastSuggestion } = useMentor();
  
  const greetingText = "Hi! I'm AI Mentor, your business planning assistant. I can help improve your plan with targeted suggestions.";
  const { displayedText, isTyping, isDone, startTyping } = useTypingAnimation(greetingText);
  
  // Show hint after some time of inactivity
  useEffect(() => {
    if (isDone && !showHint) {
      const timer = setTimeout(() => {
        setShowHint(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isDone, showHint]);
  
  // Start typing when expanded
  useEffect(() => {
    if (isExpanded) {
      startTyping();
      setShowHint(false);
    }
  }, [isExpanded, startTyping]);
  
  const handleOpenModal = (type: 'financial' | 'valueProposition' | 'marketResearch' | 'competitiveAnalysis') => {
    openSuggestionModal(type);
    setIsExpanded(false);
  };
  
  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 500 }}
              className="mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 w-72"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <motion.div
                    animate={{
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                    className="mr-2"
                  >
                    <Bot className="h-5 w-5 text-primary" />
                  </motion.div>
                  <h3 className="font-medium text-sm">AI Mentor</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6" 
                  onClick={() => setIsExpanded(false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="mb-4 min-h-[80px] text-sm text-gray-600 dark:text-gray-300">
                {displayedText}
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="ml-1"
                  >
                    |
                  </motion.span>
                )}
                
                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-3 text-xs text-primary flex items-center"
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      <span>Try one of the suggestions below!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-xs h-auto py-1.5 justify-start"
                  onClick={() => handleOpenModal('financial')}
                >
                  <span className="mr-1.5">💰</span> Financial Tips
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-xs h-auto py-1.5 justify-start"
                  onClick={() => handleOpenModal('valueProposition')}
                >
                  <span className="mr-1.5">💡</span> Value Prop
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-xs h-auto py-1.5 justify-start"
                  onClick={() => handleOpenModal('marketResearch')}
                >
                  <span className="mr-1.5">📊</span> Market Research
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-xs h-auto py-1.5 justify-start"
                  onClick={() => handleOpenModal('competitiveAnalysis')}
                >
                  <span className="mr-1.5">🏆</span> Competition
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isFocused ? {
            y: [0, -10, 0],
            transition: { duration: 1.5, repeat: Infinity, repeatType: 'loop' }
          } : {}}
          onHoverStart={() => setIsFocused(true)}
          onHoverEnd={() => setIsFocused(false)}
          className="bg-primary shadow-lg rounded-full p-3 flex items-center justify-center cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <div className="relative">
              <Bot className="h-6 w-6 text-white" />
              <AnimatePresence>
                {!isExpanded && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-red-500 rounded-full h-3 w-3"
                  />
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
      
      <SuggestionModal 
        open={isSuggestionModalOpen} 
        onOpenChange={(open) => !open && setIsExpanded(false)}
        type={lastSuggestion || undefined}
        onApply={(suggestion) => {
          if (onSuggest) {
            onSuggest(suggestion);
          }
        }}
      />
    </>
  );
};

export default AIMentor;