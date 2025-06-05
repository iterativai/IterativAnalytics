import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const StickyHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-apple-gray-100 shadow-apple-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <div className="apple-icon-bg w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  IP
                </div>
                <span className="font-semibold text-apple-gray-900">Iterativ</span>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#about" className="text-apple-gray-600 hover:text-primary transition-colors">About</a>
                <a href="#solutions" className="text-apple-gray-600 hover:text-primary transition-colors">Solutions</a>
                <a href="#features" className="text-apple-gray-600 hover:text-primary transition-colors">Features</a>
                <a href="#pricing" className="text-apple-gray-600 hover:text-primary transition-colors">Pricing</a>
              </nav>

              {/* CTA Button */}
              <div className="hidden md:block">
                <Button className="apple-button text-white px-6 py-2 rounded-xl font-medium hover:scale-105 transition-transform">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-apple-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden border-t border-apple-gray-100 py-4"
                >
                  <nav className="flex flex-col space-y-4">
                    <a href="#about" className="text-apple-gray-600 hover:text-primary transition-colors py-2">About</a>
                    <a href="#solutions" className="text-apple-gray-600 hover:text-primary transition-colors py-2">Solutions</a>
                    <a href="#features" className="text-apple-gray-600 hover:text-primary transition-colors py-2">Features</a>
                    <a href="#pricing" className="text-apple-gray-600 hover:text-primary transition-colors py-2">Pricing</a>
                    <Button className="apple-button text-white px-6 py-3 rounded-xl font-medium mt-4">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};