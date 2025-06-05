
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button 
      variant="ghost" 
      size="icon"
      onClick={toggleTheme}
      className="rounded-full glass-panel hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
    >
      {theme === 'dark' ? 
        <Sun className="h-4 w-4 text-yellow-500" /> : 
        <Moon className="h-4 w-4 text-blue-600" />
      }
    </Button>
  );
};
