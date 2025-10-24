import { useState, useEffect, useCallback } from 'react';
import { 
  canInstall, 
  showInstallPrompt, 
  isStandalone,
  registerServiceWorker,
  setupInstallPrompt,
  updateServiceWorker
} from '@/lib/pwa';

export const usePWA = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(isStandalone());
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    const handleInstallable = () => {
      setIsInstallable(canInstall());
    };

    const handleInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
    };

    const handleSWUpdated = (event: Event) => {
      const customEvent = event as CustomEvent<ServiceWorkerRegistration>;
      setRegistration(customEvent.detail);
      setUpdateAvailable(true);
    };

    window.addEventListener('pwaInstallable', handleInstallable);
    window.addEventListener('pwaInstalled', handleInstalled);
    window.addEventListener('swUpdated', handleSWUpdated);

    setupInstallPrompt();
    registerServiceWorker().then(reg => {
      if (reg) {
        setRegistration(reg);
      }
    });

    return () => {
      window.removeEventListener('pwaInstallable', handleInstallable);
      window.removeEventListener('pwaInstalled', handleInstalled);
      window.removeEventListener('swUpdated', handleSWUpdated);
    };
  }, []);

  const install = useCallback(async () => {
    const accepted = await showInstallPrompt();
    if (accepted) {
      setIsInstallable(false);
    }
    return accepted;
  }, []);

  const update = useCallback(() => {
    if (registration) {
      updateServiceWorker(registration);
      setUpdateAvailable(false);
    }
  }, [registration]);

  return {
    isInstallable,
    isInstalled,
    updateAvailable,
    install,
    update,
  };
};

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};
