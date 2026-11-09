import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className = '', onError, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (hasError) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-[#111118] via-[#0a0a0f] to-[#181824] flex items-center justify-center p-4 border border-[#22222e] rounded-lg text-center ${className}`}>
        <div className="flex flex-col items-center gap-1 text-[#00d4ff]">
          <span className="font-['Bebas_Neue'] text-xl tracking-wider text-white">RAFA 930</span>
          <span className="text-[10px] font-mono text-[#a1a1b5]">{alt || 'Arxiu 930'}</span>
        </div>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={isLoaded ? src : undefined}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={(e) => {
        setHasError(true);
        if (onError) onError(e);
      }}
      className={`${className} transition-opacity duration-700 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      {...props}
    />
  );
};
