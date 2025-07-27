
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Menu, X, ChevronDown } from 'lucide-react';
import { EnhancedButton } from '@/components/ui/enhanced-visual-components';

// Mobile Navigation Component
const MobileNav = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
        
        {/* Mobile Menu */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed top-0 right-0 h-full w-80 bg-slate-900/95 backdrop-blur-xl border-l border-white/10 z-50 p-6 md:hidden"
        >
          {/* Close Button */}
          <div className="flex justify-end mb-8">
            <motion.button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-6 w-6 text-white" />
            </motion.button>
          </div>
          
          {/* Navigation Links */}
          <nav className="space-y-6">
            {[
              { name: 'Solutions', href: '#solutions' },
              { name: 'How It Works', href: '#how-it-works' },
              { name: 'Pricing', href: '#pricing' },
              { name: 'About', href: '#about' }
            ].map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="block text-xl font-medium text-white hover:text-blue-300 transition-colors"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
                onClick={onClose}
              >
                {item.name}
              </motion.a>
            ))}
            
            {/* Mobile CTA Buttons */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <EnhancedButton variant="primary" className="w-full">
                Get Started Free
              </EnhancedButton>
              <EnhancedButton variant="outline" className="w-full">
                Sign In
              </EnhancedButton>
            </div>
          </nav>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// Enhanced Navigation Bar
export const EnhancedNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);
  
  const navigationItems = [
    {
      name: 'Solutions',
      href: '#solutions',
      dropdown: [
        { name: 'Iterativ Ventures', href: '#ventures' },
        { name: 'Iterativ Xchange', href: '#xchange' },
        { name: 'Iterativ Sourcing', href: '#sourcing' }
      ]
    },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`
          fixed top-0 left-0 right-0 z-30 transition-all duration-300
          ${isScrolled 
            ? 'bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-xl' 
            : 'bg-transparent'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-2 shadow-lg"
                whileHover={{ rotate: 5 }}
              >
                <BarChart3 className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold text-white">
                Iterativ Analytics
              </span>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <motion.a
                    href={item.href}
                    className="flex items-center text-white/80 hover:text-white transition-colors font-medium py-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.name}
                    {item.dropdown && (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </motion.a>
                  
                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <motion.a
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                              whileHover={{ x: 4 }}
                            >
                              {dropdownItem.name}
                            </motion.a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>
            
            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <EnhancedButton variant="ghost" size="sm">
                Sign In
              </EnhancedButton>
              <EnhancedButton variant="primary" size="sm">
                Get Started Free
              </EnhancedButton>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Menu className="h-6 w-6 text-white" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile Navigation */}
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
};

export default EnhancedNavbar;
