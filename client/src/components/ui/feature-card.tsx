import { ReactNode } from 'react';
import { Card, CardContent } from './card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
  variant?: 'default' | 'elevated' | 'glass';
}

export const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  className,
  variant = "default" 
}: FeatureCardProps) => {
  const baseClasses = "p-6 rounded-xl transition-all duration-300 hover:scale-105";
  const variantClasses = {
    default: "bg-white shadow-lg hover:shadow-xl border border-gray-200",
    elevated: "bg-white shadow-xl hover:shadow-2xl border border-gray-100 hover:border-blue-200",
    minimal: "bg-gray-50 hover:bg-gray-100 border border-gray-200",
    glass: "bg-gray-800/30 backdrop-blur border border-gray-700/50 hover:border-cyan-500/30"
  };

  const textClasses = variant === 'glass' 
    ? "text-white mb-2" 
    : "text-gray-900 mb-2";

  const descriptionClasses = variant === 'glass' 
    ? "text-gray-400" 
    : "text-gray-600";

  return (
    <Card className={cn(baseClasses, variantClasses[variant])}>
      <CardContent className="p-0">
        <div className="mb-4">{icon}</div>
        <h3 className={cn("text-xl font-semibold", textClasses)}>{title}</h3>
        <p className={descriptionClasses}>{description}</p>
      </CardContent>
    </Card>
  );
};

interface MetricCardProps {
  value: string | number;
  label: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export const MetricCard = ({
  value,
  label,
  icon,
  trend,
  trendValue,
  className
}: MetricCardProps) => {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <Card className={cn("bg-white shadow-sm hover:shadow-md transition-shadow", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {value}
            </div>
            <div className="text-sm text-gray-600">
              {label}
            </div>
            {trend && trendValue && (
              <div className={cn("text-xs mt-1", trendColors[trend])}>
                {trendValue}
              </div>
            )}
          </div>
          {icon && (
            <div className="text-blue-600">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};