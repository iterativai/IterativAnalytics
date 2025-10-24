import { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { canShare, shareContent } from '@/lib/pwa';
import { motion, AnimatePresence } from 'framer-motion';

interface WebShareProps {
  title: string;
  text: string;
  url?: string;
  className?: string;
}

export const WebShare = ({ title, text, url, className = '' }: WebShareProps) => {
  const [copied, setCopied] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title,
      text,
      url: url || window.location.href
    };

    if (canShare()) {
      const success = await shareContent(shareData);
      if (!success) {
        setShowFallback(true);
      }
    } else {
      setShowFallback(true);
    }
  };

  const handleCopy = async () => {
    const textToCopy = `${title}\n${text}\n${url || window.location.href}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowFallback(false);
      }, 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  return (
    <div className={className}>
      <Button
        onClick={handleShare}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <Share2 className="w-4 h-4" />
        Share
      </Button>

      <AnimatePresence>
        {showFallback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowFallback(false)}
          >
            <motion.div
              className="bg-white dark:bg-neutral-900 rounded-2xl p-6 max-w-md w-full shadow-apple-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">
                Share Link
              </h3>
              <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 mb-4">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 break-all">
                  {url || window.location.href}
                </p>
              </div>
              <Button
                onClick={handleCopy}
                className="w-full bg-primary-500 hover:bg-primary-600"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
