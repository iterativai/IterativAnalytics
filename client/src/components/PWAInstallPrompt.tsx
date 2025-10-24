import { useState, useEffect } from 'react';
import { usePWA } from '@/hooks/usePWA';
import { Button } from '@/components/ui/button';
import { X, Download, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PWAInstallPrompt = () => {
  const { isInstallable, install } = usePWA();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      setIsDismissed(true);
    }
  }, []);

  const handleInstall = async () => {
    setIsInstalling(true);
    const accepted = await install();
    if (accepted) {
      setIsDismissed(true);
    }
    setIsInstalling(false);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (!isInstallable || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md"
      >
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-apple-xl border border-neutral-200 dark:border-neutral-800 p-4 backdrop-blur-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-1">
                Install Iterativ
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                Get the full app experience with offline access and faster loading
              </p>
              
              <div className="flex gap-2">
                <Button
                  onClick={handleInstall}
                  disabled={isInstalling}
                  size="sm"
                  className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-apple-button"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isInstalling ? 'Installing...' : 'Install'}
                </Button>
                
                <Button
                  onClick={handleDismiss}
                  variant="ghost"
                  size="sm"
                  className="text-neutral-600 dark:text-neutral-400"
                >
                  Not now
                </Button>
              </div>
            </div>
            
            <button
              onClick={handleDismiss}
              className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-5 h-5 text-neutral-400" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
