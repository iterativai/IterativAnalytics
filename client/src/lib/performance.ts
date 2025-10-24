export const reportWebVitals = (metric: any) => {
  if (process.env.NODE_ENV === 'production') {
    console.log(metric);
  }
};

export const prefetchResources = (urls: string[]) => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      urls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
      });
    });
  }
};

export const preconnectDomains = (domains: string[]) => {
  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

export const deferNonCritical = (callback: () => void) => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback, { timeout: 2000 });
  } else {
    setTimeout(callback, 1);
  }
};

export const measurePerformance = (metricName: string, startMark: string, endMark: string) => {
  if ('performance' in window && 'measure' in performance) {
    try {
      performance.measure(metricName, startMark, endMark);
      const measure = performance.getEntriesByName(metricName)[0];
      console.log(`${metricName}: ${measure.duration}ms`);
      return measure.duration;
    } catch (error) {
      console.error('Performance measurement error:', error);
    }
  }
};

export const observeWebVitals = () => {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('Web Vital:', entry.name, entry);
        }
      });

      observer.observe({ 
        entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift', 'first-input'] 
      });

      return () => observer.disconnect();
    } catch (error) {
      console.error('PerformanceObserver error:', error);
    }
  }
};

export const criticalCSS = (styles: string) => {
  const style = document.createElement('style');
  style.textContent = styles;
  document.head.appendChild(style);
};

export const loadScriptAsync = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
};

interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
}

export const optimizeImageUrl = (url: string, options: ImageOptimizationOptions = {}): string => {
  if (url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }

  const params = new URLSearchParams();
  if (options.width) params.set('w', options.width.toString());
  if (options.height) params.set('h', options.height.toString());
  if (options.quality) params.set('q', options.quality.toString());
  if (options.format) params.set('format', options.format);

  return params.toString() ? `${url}?${params.toString()}` : url;
};

export const supportsWebP = (): boolean => {
  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
};

export const supportsAVIF = async (): Promise<boolean> => {
  if (!('createImageBitmap' in window)) {
    return false;
  }
  
  const avifData = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  
  try {
    const blob = await fetch(avifData).then(r => r.blob());
    await createImageBitmap(blob);
    return true;
  } catch {
    return false;
  }
};
