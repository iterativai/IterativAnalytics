import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  Briefcase, 
  Heart, 
  Cpu, 
  Leaf, 
  GraduationCap, 
  Utensils,
  Car,
  Building,
  Coins,
  Smartphone,
  Plane
} from 'lucide-react';

export interface SectorTheme {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
    textPrimary: string;
    textSecondary: string;
    background: string;
    surface: string;
    border: string;
  };
  description: string;
}

export const sectorThemes: SectorTheme[] = [
  {
    id: 'fintech',
    name: 'FinTech',
    icon: Coins,
    colors: {
      primary: '#10B981', // emerald-500
      secondary: '#059669', // emerald-600
      accent: '#34D399', // emerald-400
      gradient: 'from-emerald-500 to-green-600',
      textPrimary: '#ECFDF5', // emerald-50
      textSecondary: '#A7F3D0', // emerald-200
      background: 'from-emerald-950 via-green-950 to-black',
      surface: 'emerald-800/20',
      border: 'emerald-500/30'
    },
    description: 'Financial technology and digital banking'
  },
  {
    id: 'healthcare',
    name: 'HealthTech',
    icon: Heart,
    colors: {
      primary: '#EF4444', // red-500
      secondary: '#DC2626', // red-600
      accent: '#F87171', // red-400
      gradient: 'from-red-500 to-pink-600',
      textPrimary: '#FEF2F2', // red-50
      textSecondary: '#FECACA', // red-200
      background: 'from-red-950 via-pink-950 to-black',
      surface: 'red-800/20',
      border: 'red-500/30'
    },
    description: 'Healthcare and medical technology'
  },
  {
    id: 'tech',
    name: 'Technology',
    icon: Cpu,
    colors: {
      primary: '#3B82F6', // blue-500
      secondary: '#2563EB', // blue-600
      accent: '#60A5FA', // blue-400
      gradient: 'from-blue-500 to-cyan-600',
      textPrimary: '#EFF6FF', // blue-50
      textSecondary: '#BFDBFE', // blue-200
      background: 'from-blue-950 via-cyan-950 to-black',
      surface: 'blue-800/20',
      border: 'blue-500/30'
    },
    description: 'Software and technology solutions'
  },
  {
    id: 'investor',
    name: 'Investor Navy',
    icon: Coins,
    colors: {
      primary: '#1E3A8A', // blue-800 (navy)
      secondary: '#1E40AF', // blue-700
      accent: '#3B82F6', // blue-500
      gradient: 'from-blue-800 to-blue-600',
      textPrimary: '#DBEAFE', // blue-100
      textSecondary: '#93C5FD', // blue-300
      background: 'from-blue-950 via-slate-950 to-black',
      surface: 'blue-900/20',
      border: 'blue-700/30'
    },
    description: 'Classic navy theme for investors'
  },
  {
    id: 'sustainability',
    name: 'Sustainability',
    icon: Leaf,
    colors: {
      primary: '#22C55E', // green-500
      secondary: '#16A34A', // green-600
      accent: '#4ADE80', // green-400
      gradient: 'from-green-500 to-emerald-600',
      textPrimary: '#F0FDF4', // green-50
      textSecondary: '#BBF7D0', // green-200
      background: 'from-green-950 via-emerald-950 to-black',
      surface: 'green-800/20',
      border: 'green-500/30'
    },
    description: 'Environmental and sustainable solutions'
  },
  {
    id: 'education',
    name: 'EdTech',
    icon: GraduationCap,
    colors: {
      primary: '#8B5CF6', // violet-500
      secondary: '#7C3AED', // violet-600
      accent: '#A78BFA', // violet-400
      gradient: 'from-violet-500 to-purple-600',
      textPrimary: '#F5F3FF', // violet-50
      textSecondary: '#DDD6FE', // violet-200
      background: 'from-violet-950 via-purple-950 to-black',
      surface: 'violet-800/20',
      border: 'violet-500/30'
    },
    description: 'Educational technology and learning'
  },
  {
    id: 'foodtech',
    name: 'FoodTech',
    icon: Utensils,
    colors: {
      primary: '#F59E0B', // amber-500
      secondary: '#D97706', // amber-600
      accent: '#FBD966', // amber-400
      gradient: 'from-amber-500 to-orange-600',
      textPrimary: '#FFFBEB', // amber-50
      textSecondary: '#FED7AA', // amber-200
      background: 'from-amber-950 via-orange-950 to-black',
      surface: 'amber-800/20',
      border: 'amber-500/30'
    },
    description: 'Food and beverage technology'
  },
  {
    id: 'mobility',
    name: 'Mobility',
    icon: Car,
    colors: {
      primary: '#06B6D4', // cyan-500
      secondary: '#0891B2', // cyan-600
      accent: '#22D3EE', // cyan-400
      gradient: 'from-cyan-500 to-blue-600',
      textPrimary: '#ECFEFF', // cyan-50
      textSecondary: '#A5F3FC', // cyan-200
      background: 'from-cyan-950 via-blue-950 to-black',
      surface: 'cyan-800/20',
      border: 'cyan-500/30'
    },
    description: 'Transportation and mobility solutions'
  },
  {
    id: 'proptech',
    name: 'PropTech',
    icon: Building,
    colors: {
      primary: '#64748B', // slate-500
      secondary: '#475569', // slate-600
      accent: '#94A3B8', // slate-400
      gradient: 'from-slate-500 to-gray-600',
      textPrimary: '#F8FAFC', // slate-50
      textSecondary: '#CBD5E1', // slate-300
      background: 'from-slate-950 via-gray-950 to-black',
      surface: 'slate-800/20',
      border: 'slate-500/30'
    },
    description: 'Real estate and property technology'
  }
];

// Theme Context
interface ThemeContextType {
  currentTheme: SectorTheme;
  setTheme: (theme: SectorTheme) => void;
  isThemeModalOpen: boolean;
  setIsThemeModalOpen: (open: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme Provider
export const SectorThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<SectorTheme>(sectorThemes[0]); // Default to FinTech
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const setTheme = (theme: SectorTheme) => {
    setCurrentTheme(theme);
    // Apply theme to CSS custom properties
    applyThemeToCSS(theme);
    // Store preference in localStorage
    localStorage.setItem('preferred-sector-theme', theme.id);
  };

  // Load saved theme on mount
  useEffect(() => {
    const savedThemeId = localStorage.getItem('preferred-sector-theme');
    if (savedThemeId) {
      const savedTheme = sectorThemes.find(theme => theme.id === savedThemeId);
      if (savedTheme) {
        setCurrentTheme(savedTheme);
        applyThemeToCSS(savedTheme);
      }
    } else {
      // Apply default theme
      applyThemeToCSS(currentTheme);
    }
  }, []);

  const applyThemeToCSS = (theme: SectorTheme) => {
    const root = document.documentElement;
    
    // Apply base theme colors
    root.style.setProperty('--theme-primary', theme.colors.primary);
    root.style.setProperty('--theme-secondary', theme.colors.secondary);
    root.style.setProperty('--theme-accent', theme.colors.accent);
    root.style.setProperty('--theme-text-primary', theme.colors.textPrimary);
    root.style.setProperty('--theme-text-secondary', theme.colors.textSecondary);
    root.style.setProperty('--theme-surface', theme.colors.surface);
    root.style.setProperty('--theme-border', theme.colors.border);
    
    // Generate opacity variants dynamically
    const hex2rgba = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };
    
    // Apply opacity variants
    root.style.setProperty('--theme-primary-10', hex2rgba(theme.colors.primary, 0.1));
    root.style.setProperty('--theme-primary-20', hex2rgba(theme.colors.primary, 0.2));
    root.style.setProperty('--theme-primary-30', hex2rgba(theme.colors.primary, 0.3));
    root.style.setProperty('--theme-primary-50', hex2rgba(theme.colors.primary, 0.5));
    root.style.setProperty('--theme-primary-80', hex2rgba(theme.colors.primary, 0.8));
    
    // Apply semantic colors
    root.style.setProperty('--theme-success', theme.colors.accent);
    root.style.setProperty('--theme-cta-primary', theme.colors.primary);
    root.style.setProperty('--theme-cta-secondary', theme.colors.secondary);
    root.style.setProperty('--theme-link', theme.colors.primary);
    root.style.setProperty('--theme-link-hover', theme.colors.secondary);
    
    // Add theme transition class to body
    document.body.classList.add('theme-transitioning');
    setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 300);
  };

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      setTheme,
      isThemeModalOpen,
      setIsThemeModalOpen
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Theme Selector Button
export const ThemeSelectorButton = () => {
  const { currentTheme, setIsThemeModalOpen } = useTheme();

  return (
    <motion.button
      onClick={() => setIsThemeModalOpen(true)}
      className="fixed top-4 right-36 z-50 p-3 rounded-full backdrop-blur-sm border text-white hover:scale-105 transition-all duration-200"
      style={{
        backgroundColor: `${currentTheme.colors.primary}20`,
        borderColor: `${currentTheme.colors.primary}50`
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Palette className="h-5 w-5" style={{ color: currentTheme.colors.primary }} />
    </motion.button>
  );
};

// Theme Selection Modal
export const ThemeSelectionModal = () => {
  const { currentTheme, setTheme, isThemeModalOpen, setIsThemeModalOpen } = useTheme();

  return (
    <AnimatePresence>
      {isThemeModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsThemeModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900/90 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Choose Your Business Sector</h2>
              <p className="text-gray-400">Select a theme that matches your industry focus</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sectorThemes.map((theme) => (
                <motion.button
                  key={theme.id}
                  onClick={() => {
                    setTheme(theme);
                    setIsThemeModalOpen(false);
                  }}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    currentTheme.id === theme.id
                      ? 'border-white/50 bg-white/10'
                      : 'border-gray-700/50 bg-gray-800/30 hover:bg-gray-700/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className="w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center"
                    style={{ backgroundColor: theme.colors.primary }}
                  >
                    <theme.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{theme.name}</h3>
                  <p className="text-xs text-gray-400 leading-tight">{theme.description}</p>
                  
                  {/* Color Preview */}
                  <div className="flex justify-center space-x-1 mt-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: theme.colors.secondary }}
                    />
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: theme.colors.accent }}
                    />
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsThemeModalOpen(false)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};