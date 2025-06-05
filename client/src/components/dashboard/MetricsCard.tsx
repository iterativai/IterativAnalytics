
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MetricsCardProps {
  title: string;
  value: string;
  trend?: number;
  icon: React.ReactNode;
  description?: string;
  className?: string;
}

export const MetricsCard = ({ 
  title, 
  value, 
  trend, 
  icon, 
  description,
  className 
}: MetricsCardProps) => (
  <motion.div
    whileHover={{ y: -2 }}
    transition={{ duration: 0.2 }}
  >
    <Card className={cn("glass-panel hover:border-cyan-500/30 dark:hover:border-cyan-400/30 transition-all duration-300 group", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-gray-600 dark:text-gray-400 font-medium text-sm uppercase tracking-wide">
              {title}
            </h3>
            {description && (
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {description}
              </p>
            )}
          </div>
          {trend !== undefined && (
            <Badge 
              variant={trend >= 0 ? 'default' : 'destructive'}
              className={cn(
                "text-xs",
                trend >= 0 
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" 
                  : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
              )}
            >
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </Badge>
          )}
        </div>
        
        <div className="flex items-end justify-between">
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
            {value}
          </div>
          <div className="p-3 bg-blue-100 dark:bg-cyan-500/10 rounded-xl group-hover:bg-blue-200 dark:group-hover:bg-cyan-500/20 transition-colors">
            <div className="text-blue-600 dark:text-cyan-400">
              {icon}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);
