import { environment } from '@/environments/environment';
import get from 'lodash/get';
import has from 'lodash/has';
import { SafeImage } from '@/components/ui/safe-image';
import React from 'react';

interface ImageChooser {
  field?: 'image' | 'externalImage';
  image?: {
    '@link': string;
  };
  imageAlt?: string;
  externalImage?: string;
  externalImageAlt?: string;
}

interface ILogoMProps {
  imageChooser?: ImageChooser;
}

const LogoM: React.FC<ILogoMProps> = ({ imageChooser }) => {
  // Get image source
  const getImageSrc = (): string => {
    if (!imageChooser) return '';
    if (has(imageChooser, 'externalImage')) {
      return get(imageChooser, 'externalImage') || '';
    }
    if (has(imageChooser, "image['@link']")) {
      return `${environment.damRawBase}${get(imageChooser, "image['@link']")}`;
    }
    return '';
  };

  const getImageAlt = (): string => {
    if (!imageChooser) return '';
    return (
      get(imageChooser, 'externalImageAlt') ||
      get(imageChooser, 'imageAlt') ||
      'Logo'
    );
  };

  const imageSrc = getImageSrc();
  const imageAlt = getImageAlt();

  if (!imageSrc) return null;

  return (
    <div
      data-name='M / Logos'
      className='h-[90px] relative shrink-0 w-[170px]'
    >
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <SafeImage
          src={imageSrc}
          alt={imageAlt}
          fill
          objectFit='contain'
          className='object-contain object-center pointer-events-none'
        />
      </div>
    </div>
  );
};

export default LogoM;

