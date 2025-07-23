
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
  background: string;
  surface: string;
  border: string;
}

export interface ThemeVariants {
  light: ThemeColors;
  dark: ThemeColors;
}

export class ThemeManager {
  private static instance: ThemeManager;
  private currentTheme: string = 'fintech';
  private prefersDark: boolean = false;

  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  constructor() {
    this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.initializeThemeListener();
  }

  private initializeThemeListener() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      this.prefersDark = e.matches;
      this.applySystemTheme();
    });
  }

  private applySystemTheme() {
    const theme = this.getStoredTheme();
    if (theme) {
      this.applyTheme(theme);
    }
  }

  applyTheme(theme: any) {
    const root = document.documentElement;
    
    // Apply theme colors with automatic dark mode adaptation
    const colors = this.prefersDark && theme.darkColors ? theme.darkColors : theme.colors;
    
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${this.camelToKebab(key)}`, value as string);
    });

    // Store theme preference
    localStorage.setItem('preferred-theme', JSON.stringify({
      id: theme.id,
      timestamp: Date.now()
    }));

    // Dispatch theme change event
    window.dispatchEvent(new CustomEvent('themeChanged', {
      detail: { theme, isDark: this.prefersDark }
    }));
  }

  private camelToKebab(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }

  getStoredTheme(): any | null {
    const stored = localStorage.getItem('preferred-theme');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  }

  generateColorVariants(baseColor: string): Record<string, string> {
    const variants: Record<string, string> = {};
    const opacities = [10, 20, 30, 40, 50, 60, 70, 80, 90];
    
    opacities.forEach(opacity => {
      variants[`${baseColor}-${opacity}`] = this.hexToRgba(baseColor, opacity / 100);
    });
    
    return variants;
  }

  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  getContrastColor(backgroundColor: string): string {
    const rgb = this.hexToRgb(backgroundColor);
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }
}

export const themeManager = ThemeManager.getInstance();
