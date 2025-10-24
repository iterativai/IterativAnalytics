import { useState, useEffect, useRef, ImgHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { SkeletonPulse } from './ui/loading-states';

interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  aspectRatio?: string;
}

export const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder,
  aspectRatio,
  ...props 
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {!isLoaded && (
        <SkeletonPulse className="absolute inset-0" />
      )}
      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={`w-full h-full object-cover ${isLoaded ? 'visible' : 'invisible'}`}
          {...(props as any)}
        />
      )}
    </div>
  );
};

export const OptimizedImage = ({ 
  src, 
  alt, 
  sizes,
  className = '',
  ...props 
}: LazyImageProps & { sizes?: string }) => {
  const srcSet = generateSrcSet(src);
  
  return (
    <LazyImage
      src={src}
      alt={alt}
      {...(srcSet && { srcSet })}
      sizes={sizes || '100vw'}
      className={className}
      {...props}
    />
  );
};

function generateSrcSet(src: string): string | undefined {
  if (src.startsWith('http') || src.startsWith('data:')) {
    return undefined;
  }
  
  const widths = [320, 640, 768, 1024, 1280, 1536];
  const ext = src.split('.').pop();
  const baseSrc = src.replace(`.${ext}`, '');
  
  return widths
    .map(width => `${baseSrc}-${width}w.${ext} ${width}w`)
    .join(', ');
}
