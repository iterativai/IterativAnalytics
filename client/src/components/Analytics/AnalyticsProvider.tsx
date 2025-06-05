
import React, { createContext, useContext, useState } from 'react';

type AnalyticsContextType = {
  metrics: {
    revenue: number;
    customers: number;
    marketShare: number;
    activeMilestones: number;
  };
};

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [metrics] = useState({
    revenue: 124000,
    customers: 1240,
    marketShare: 23,
    activeMilestones: 8
  });

  return (
    <AnalyticsContext.Provider value={{ metrics }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}
