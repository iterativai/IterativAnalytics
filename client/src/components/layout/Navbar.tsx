import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X, BarChart3 } from "lucide-react";
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
    <nav className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      isScrolled ? "glass-panel shadow-lg" : "bg-transparent",
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg p-2">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-gray-100">Iterativ Analytics</span>
          </button>

          <div className="hidden md:flex items-center justify-between flex-1 ml-8">
            <div className="flex items-center space-x-6">
              {navItems.map(item => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-white/5",
                    activeSection === item.id ? "text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-cyan-500/20" : ""
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="gradient" size="lg" className="glass-glow">
                Join Beta
              </Button>
            </div>
          </div>

          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle menu"
          >
            {showMobileMenu ? (
              <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className={cn(
          "md:hidden glass-panel border-t border-white/10 absolute top-full left-0 right-0 overflow-hidden",
          showMobileMenu ? "block" : "hidden"
        )}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: showMobileMenu ? 1 : 0, 
          height: showMobileMenu ? 'auto' : 0 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col py-4 px-6 space-y-2">
          {navItems.map(item => (
            <button 
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "py-3 px-4 text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-blue-50 dark:hover:bg-cyan-500/20 transition-colors font-medium rounded-lg",
                activeSection === item.id ? "text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-cyan-500/20" : ""
              )}
            >
              {item.label}
            </button>
          ))}
          <Button variant="gradient" className="w-full mt-4 glass-glow">
            Join Beta
          </Button>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;