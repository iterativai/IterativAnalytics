import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X, BarChart3, ChevronDown } from "lucide-react";
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
    // Handle navigation to specific solution modules
    scrollToSection('solutions');
    // Additional logic for highlighting specific module
  };

  const NavDropdown: React.FC<{ item: NavItem }> = ({ item }) => {
    if (!item.subItems) {
      return (
        <button
          onClick={() => scrollToSection(item.id)}
          className={cn(
            "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-white/5",
            activeSection === item.id && "text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-white/5"
          )}
        >
          {item.label}
        </button>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-white/5",
              activeSection === item.id && "text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-white/5"
            )}
          >
            {item.label}
            <ChevronDown className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-72">
          {item.subItems.map((subItem) => (
            <DropdownMenuItem
              key={subItem.id}
              onClick={() => handleSubItemClick(subItem.id)}
              className="cursor-pointer p-4"
            >
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {subItem.label}
                </div>
                {subItem.description && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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
        <button
          onClick={() => scrollToSection(item.id)}
          className="block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium"
        >
          {item.label}
        </button>
      );
    }

    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium"
        >
          {item.label}
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </button>
        {isOpen && (
          <div className="bg-gray-50 dark:bg-gray-800">
            {item.subItems.map((subItem) => (
              <button
                key={subItem.id}
                onClick={() => {
                  handleSubItemClick(subItem.id);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-8 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="font-medium">{subItem.label}</div>
                {subItem.description && (
                  <div className="text-sm opacity-75 mt-1">{subItem.description}</div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <nav className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled ? "glass-panel shadow-lg" : "bg-transparent",
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button 
              onClick={() => scrollToSection('hero')} 
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg p-2">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-gray-100">
                Iterativ Analytics
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map(item => (
                <NavDropdown key={item.id} item={item} />
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle - Moved to be less prominent */}
              <div className="hidden md:block">
                <ThemeToggle />
              </div>

              {/* Primary CTA */}
              <Button 
                onClick={() => scrollToSection('get-started')}
                size="sm"
                className="hidden md:inline-flex bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Try Free Demo
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {showMobileMenu ? (
                  <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg"
        >
          <div className="py-4">
            {navItems.map(item => (
              <MobileNavItem key={item.id} item={item} />
            ))}
            
            {/* Mobile Actions */}
            <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-4 space-y-3">
              <ThemeToggle />
              <Button 
                onClick={() => {
                  scrollToSection('get-started');
                  setShowMobileMenu(false);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Try Free Demo
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default SimplifiedNavbar;