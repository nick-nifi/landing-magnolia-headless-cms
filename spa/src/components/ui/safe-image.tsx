'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src?: string | null;
  alt?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const isValidImageSrc = (src: string | undefined | null): boolean => {
  if (!src || typeof src !== 'string' || src.trim() === '') return false;
  if (src.startsWith('/') || src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return true;
  }
  return false;
};

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = '',
  fill = false,
  className = '',
  objectFit = 'cover',
  style,
  width,
  height,
  sizes,
  ...props
}) => {
  const [useFallback, setUseFallback] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!isValidImageSrc(src)) {
    return null;
  }

  // Map objectFit to CSS object-fit
  const imageObjectFit = objectFit as 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

  // For external URLs (http/https), use img tag as fallback if Next.js Image fails
  const isExternalUrl = src?.startsWith('http://') || src?.startsWith('https://') || src?.startsWith('data:');

  // If error occurred or explicitly using fallback, use img tag
  if (useFallback || imageError || isExternalUrl) {
    const fillStyles: React.CSSProperties = fill
      ? {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: imageObjectFit,
        }
      : { objectFit: imageObjectFit };

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src as string}
        alt={alt}
        className={className}
        style={{ ...fillStyles, ...style }}
        onError={() => setImageError(true)}
        {...(props as React.ImgHTMLAttributes<HTMLImageElement>)}
      />
    );
  }

  // Try Next.js Image first
  const handleImageError = () => {
    setUseFallback(true);
  };

  // If fill is true, or width/height is 0, use fill layout
  if (fill || width === 0 || height === 0) {
    return (
      <Image
        src={src as string}
        alt={alt}
        fill
        className={className}
        style={{ objectFit: imageObjectFit, ...style }}
        sizes={sizes}
        unoptimized={isExternalUrl}
        onError={handleImageError}
        {...props}
      />
    );
  }

  // Otherwise use width/height layout
  return (
    <Image
      src={src as string}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      style={{ objectFit: imageObjectFit, ...style }}
      unoptimized={isExternalUrl}
      onError={handleImageError}
      {...props}
    />
  );
};

export default SafeImage;

