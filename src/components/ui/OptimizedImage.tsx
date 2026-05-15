"use client";

import { useState, useRef, useEffect } from "react";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: number;
  lazy?: boolean;
}

export function OptimizedImage({
  aspectRatio,
  lazy = true,
  className = "",
  alt = "",
  style,
  ...props
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  const containerStyle: React.CSSProperties = {
    ...style,
    ...(aspectRatio ? { aspectRatio: String(aspectRatio) } : {}),
  };

  return (
    <img
      ref={imgRef}
      alt={alt}
      loading={lazy ? "lazy" : "eager"}
      decoding="async"
      fetchPriority={lazy ? "low" : "high"}
      onLoad={() => setLoaded(true)}
      className={`${className} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
      style={containerStyle}
      {...props}
    />
  );
}
