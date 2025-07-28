
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X, BarChart3, ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItem {
  id: string;
  label: string;
  subItems?: Array<{
    id: string;
    label: string;
    description?: string;
  }>;
}

export const SimplifiedNavbar: React.FC = () => {
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
    const sections = ['hero', 'solutions', 'how-it-works'];
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

  // Simplified navigation structure (3 main items)
  const navItems: NavItem[] = [
    {
      id: 'solutions',
      label: 'Solutions',
      subItems: [
        {
          id: 'ventures',
          label: 'Iterativ Ventures',
          description: 'AI-powered business intelligence & planning'
        },
        {
          id: 'xchange',
          label: 'Iterativ Xchange',
          description: 'Blockchain capital markets & tokenization'
        },
        {
          id: 'sourcing',
          label: 'Iterativ Sourcing',
          description: 'Intelligent supply chain management'
        }
      ]
    },
    {
      id: 'how-it-works',
      label: 'How It Works'
    },
    {
      id: 'get-started',
      label: 'Get Started'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setShowMobileMenu(false);
  };

  const handleSubItemClick = (subItemId: string) => {
    scrollToSection('solutions');
  };

  const NavDropdown: React.FC<{ item: NavItem }> = ({ item }) => {
    if (!item.subItems) {
      return (
        <motion.button
          onClick={() => scrollToSection(item.id)}
          className={cn(
            "px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105",
            activeSection === item.id
              ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg"
              : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/60 dark:hover:bg-gray-700/60"
          )}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.label}
        </motion.button>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.button
            className={cn(
              "flex items-center gap-1 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105",
              activeSection === item.id
                ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/60 dark:hover:bg-gray-700/60"
            )}
            whileHover={{ y: -1 }}
          >
            {item.label}
            <ChevronDown className="h-4 w-4" />
          </motion.button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200/20 dark:border-gray-700/20 shadow-2xl">
          {item.subItems.map((subItem) => (
            <DropdownMenuItem
              key={subItem.id}
              onClick={() => handleSubItemClick(subItem.id)}
              className="cursor-pointer p-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  <span>{subItem.label}</span>
                </div>
                {subItem.description && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 ml-6">
                    {subItem.description}
                  </div>
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const MobileNavItem: React.FC<{ item: NavItem }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!item.subItems) {
      return (
        <motion.button
          onClick={() => scrollToSection(item.id)}
          className="block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 font-medium rounded-lg transition-colors"
          whileTap={{ scale: 0.98 }}
        >
          {item.label}
        </motion.button>
      );
    }

    return (
      <div>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 font-medium rounded-lg transition-colors"
          whileTap={{ scale: 0.98 }}
        >
          {item.label}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50/50 dark:bg-gray-800/50 rounded-lg mt-1 overflow-hidden"
            >
              {item.subItems.map((subItem, index) => (
                <motion.button
                  key={subItem.id}
                  onClick={() => {
                    handleSubItemClick(subItem.id);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-6 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="font-medium flex items-center space-x-2">
                    <Sparkles className="h-3 w-3 text-blue-500" />
                    <span>{subItem.label}</span>
                  </div>
                  {subItem.description && (
                    <div className="text-xs opacity-75 mt-1 ml-5">{subItem.description}</div>
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
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
                  Iterativ Analytics
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Smart Business Solutions
                </span>
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 bg-gray-50/50 dark:bg-gray-800/50 rounded-full px-2 py-1 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20">
              {navItems.map(item => (
                <NavDropdown key={item.id} item={item} />
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <div className="hidden md:block">
                <div className="p-1 rounded-full bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20">
                  <ThemeToggle />
                </div>
              </div>

              {/* Primary CTA */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={() => scrollToSection('get-started')}
                  size="lg"
                  className="hidden md:inline-flex relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Try Free Demo</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2.5 rounded-full bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20 transition-all duration-300 hover:bg-gray-200/60 dark:hover:bg-gray-700/60"
                whileTap={{ scale: 0.95 }}
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

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/20 dark:border-gray-700/20 shadow-2xl"
            >
              <div className="px-6 py-6 space-y-2">
                {navItems.map(item => (
                  <MobileNavItem key={item.id} item={item} />
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
                    transition={{ delay: 0.3 }}
                  >
                    <Button 
                      onClick={() => {
                        scrollToSection('get-started');
                        setShowMobileMenu(false);
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Try Free Demo
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

export default SimplifiedNavbar;
