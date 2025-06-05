
import { NavLink, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutGrid, 
  BarChart3, 
  Rocket, 
  FileText, 
  Users, 
  Settings,
  TrendingUp,
  Target
} from "lucide-react";

const navItems = [
  { path: "/dashboard", icon: <LayoutGrid className="h-5 w-5" />, label: "Overview" },
  { path: "/analytics", icon: <BarChart3 className="h-5 w-5" />, label: "Analytics" },
  { path: "/funding", icon: <Rocket className="h-5 w-5" />, label: "Funding" },
  { path: "/documents", icon: <FileText className="h-5 w-5" />, label: "Documents" },
  { path: "/team", icon: <Users className="h-5 w-5" />, label: "Team" },
  { path: "/insights", icon: <TrendingUp className="h-5 w-5" />, label: "Insights" },
  { path: "/goals", icon: <Target className="h-5 w-5" />, label: "Goals" },
  { path: "/settings", icon: <Settings className="h-5 w-5" />, label: "Settings" },
];

export const DashboardNav = () => {
  const [location] = useLocation();
  
  return (
    <nav className="glass-panel rounded-xl p-3">
      <ul className="space-y-2">
        {navItems.map((item) => {
          const isActive = location === item.path;
          
          return (
            <li key={item.path}>
              <NavLink href={item.path}>
                <a
                  className={cn(
                    "flex items-center p-3 rounded-lg transition-all duration-200 group",
                    isActive 
                      ? "bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/25" 
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <span className={cn(
                    "mr-3 transition-transform group-hover:scale-110",
                    isActive && "text-cyan-400"
                  )}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  )}
                </a>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
