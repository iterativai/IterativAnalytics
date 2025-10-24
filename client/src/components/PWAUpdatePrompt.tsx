import { usePWA } from '@/hooks/usePWA';
import { Button } from '@/components/ui/button';
import { RefreshCw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export const PWAUpdatePrompt = () => {
  const { updateAvailable, update } = usePWA();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!updateAvailable || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed top-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md"
      >
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl shadow-apple-xl p-4 backdrop-blur-xl text-white">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold mb-1">
                Update Available
              </h3>
              <p className="text-sm text-white/90 mb-3">
                A new version is ready. Update now for the latest features
              </p>
              
              <div className="flex gap-2">
                <Button
                  onClick={update}
                  size="sm"
                  className="bg-white text-primary-600 hover:bg-white/90 shadow-apple-button"
                >
                  Update Now
                </Button>
                
                <Button
                  onClick={() => setIsDismissed(true)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                >
                  Later
                </Button>
              </div>
            </div>
            
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-5 h-5 text-white/80" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
