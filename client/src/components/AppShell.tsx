import { ReactNode, Suspense, lazy } from 'react';
import { LoadingScreen } from './ui/loading-states';

export const AppShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<LoadingScreen message="Loading application..." />}>
        {children}
      </Suspense>
    </div>
  );
};

export const lazyLoadRoute = (importFn: () => Promise<any>) => {
  return lazy(() => 
    importFn().catch((error) => {
      console.error('Route loading error:', error);
      return import('@/pages/not-found');
    })
  );
};

export const preloadRoute = (importFn: () => Promise<any>) => {
  const promise = importFn();
  promise.catch((error) => console.error('Preload error:', error));
  return promise;
};
