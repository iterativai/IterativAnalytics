import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X, BarChart3, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      detectActiveSection();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const detectActiveSection = () => {
    const sections = ['hero', 'about', 'solutions', 'features', 'testimonials', 'waitlist'];
    const currentSection = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });
    setActiveSection(currentSection || '');
  };

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'features', label: 'Features' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setShowMobileMenu(false);
  };

  return (
    <>
      <motion.nav
        className={cn(
          "sticky top-0 z-50 transition-all duration-500 ease-out",
          isScrolled
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-200/20 dark:border-gray-700/20"
            : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Enhanced Logo */}
            <motion.button
              onClick={() => scrollToSection('hero')}
              className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl p-2.5 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <BarChart3 className="h-7 w-7 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-bold text-xl text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  IterativAnalytics
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  AI-Powered Insights
                </span>
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-12">
              <div className="flex items-center space-x-1 bg-gray-50/50 dark:bg-gray-800/50 rounded-full px-2 py-1 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "relative px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105",
                      activeSection === item.id
                        ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/60 dark:hover:bg-gray-700/60"
                    )}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                        layoutId="activeNav"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        style={{ zIndex: -1 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <div className="hidden md:block">
                <div className="p-1 rounded-full bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20">
                  <ThemeToggle />
                </div>
              </div>

              {/* Enhanced CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => scrollToSection('waitlist')}
                  size="lg"
                  className="hidden md:inline-flex relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Join Beta</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                    </motion.div>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </Button>
              </motion.div>

              {/* Enhanced Mobile Menu Toggle */}
              <motion.button
                className="lg:hidden p-2.5 rounded-full bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20 transition-all duration-300 hover:bg-gray-200/60 dark:hover:bg-gray-700/60"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {showMobileMenu ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/20 dark:border-gray-700/20 shadow-2xl"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="px-6 py-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "w-full text-left py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]",
                      activeSection === item.id
                        ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/60 dark:hover:bg-gray-800/60"
                    )}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.button>
                ))}

                {/* Mobile Actions */}
                <div className="border-t border-gray-200/20 dark:border-gray-700/20 pt-4 space-y-4">
                  <div className="flex justify-center">
                    <div className="p-1 rounded-full bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20">
                      <ThemeToggle />
                    </div>
                  </div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      onClick={() => {
                        scrollToSection('waitlist');
                        setShowMobileMenu(false);
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Join Beta
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;