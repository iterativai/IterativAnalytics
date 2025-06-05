
import { Card, CardContent } from "@/components/ui/card";

interface MetricsCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: string;
}

export function MetricsCard({ title, value, trend, icon }: MetricsCardProps) {
  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-2">{value}</h3>
          </div>
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <i className={`${icon} text-primary`}></i>
          </div>
        </div>
        {trend !== undefined && (
          <div className="mt-4 flex items-center">
            <span className={`text-sm font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend >= 0 ? '+' : ''}{trend}%
            </span>
            <i className={`fas fa-arrow-${trend >= 0 ? 'up' : 'down'} ml-1 text-xs ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}></i>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
