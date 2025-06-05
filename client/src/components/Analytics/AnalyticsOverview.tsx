
import { MetricsCard } from "./MetricsCard";
import { useAnalytics } from "./AnalyticsProvider";

export function AnalyticsOverview() {
  const { metrics } = useAnalytics();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricsCard
        title="Revenue Growth"
        value={`$${metrics.revenue.toLocaleString()}`}
        trend={12.5}
        icon="fas fa-chart-line"
      />
      <MetricsCard
        title="Customer Base"
        value={metrics.customers.toLocaleString()}
        trend={8.2}
        icon="fas fa-users"
      />
      <MetricsCard
        title="Market Share"
        value={`${metrics.marketShare}%`}
        trend={-2.1}
        icon="fas fa-percentage"
      />
      <MetricsCard
        title="Active Milestones"
        value={metrics.activeMilestones.toString()}
        icon="fas fa-flag"
      />
    </div>
  );
}
