'use client';

import React from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string | null;
  alt?: string;
  fill?: boolean;
  className?: string;
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
  ...props
}) => {
  if (!isValidImageSrc(src)) {
    return null;
  }

  const fillStyles: React.CSSProperties = fill
    ? {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit,
      }
    : {};

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src as string}
      alt={alt}
      className={className}
      style={{ ...fillStyles, ...style }}
      {...props}
    />
  );
};

export default SafeImage;

