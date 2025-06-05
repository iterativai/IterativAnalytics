import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export const ProgressIndicator = ({ steps, currentStep, className = "" }: ProgressIndicatorProps) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              {/* Step Circle */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ 
                  scale: index <= currentStep ? 1 : 0.8,
                  opacity: index <= currentStep ? 1 : 0.5
                }}
                transition={{ duration: 0.3 }}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center border-2 relative
                  ${index < currentStep 
                    ? 'bg-primary border-primary text-white' 
                    : index === currentStep 
                    ? 'bg-primary border-primary text-white' 
                    : 'bg-white border-apple-gray-300 text-apple-gray-400'}
                `}
              >
                {index < currentStep ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    <Check className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <span className="font-semibold">{index + 1}</span>
                )}
              </motion.div>

              {/* Step Label */}
              <div className="mt-3 text-center max-w-24">
                <div className={`text-sm font-medium ${
                  index <= currentStep ? 'text-apple-gray-900' : 'text-apple-gray-500'
                }`}>
                  {step.title}
                </div>
                <div className="text-xs text-apple-gray-500 mt-1">
                  {step.description}
                </div>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: index < currentStep ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex-1 h-0.5 bg-primary mx-4 origin-left"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-50"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: scrollProgress }}
      style={{ transformOrigin: "0%" }}
    >
      <motion.div
        className="h-full bg-primary"
        style={{ scaleX: scrollProgress }}
      />
    </motion.div>
  );
};