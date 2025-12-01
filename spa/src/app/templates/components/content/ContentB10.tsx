import { environment } from '../../../../environments/environment';
import get from 'lodash/get';
import has from 'lodash/has';
import Image from 'next/image';
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

interface IContentB10Props {
  imageChooser?: ImageChooser;
  overlayImageChooser?: ImageChooser;
}

const ContentB10: React.FC<IContentB10Props> = ({
  imageChooser,
  overlayImageChooser,
}) => {
  // Get image source
  const getImageSrc = (imageChooser?: ImageChooser): string => {
    if (!imageChooser) return '';
    if (has(imageChooser, 'externalImage')) {
      return get(imageChooser, 'externalImage') || '';
    }
    if (has(imageChooser, "image['@link']")) {
      return `${environment.damRawBase}${get(imageChooser, "image['@link']")}`;
    }
    return '';
  };

  const getImageAlt = (imageChooser?: ImageChooser): string => {
    if (!imageChooser) return '';
    return (
      get(imageChooser, 'externalImageAlt') ||
      get(imageChooser, 'imageAlt') ||
      ''
    );
  };

  const imageSrc = getImageSrc(imageChooser);
  const overlayImageSrc = getImageSrc(overlayImageChooser);

  return (
    <div
      data-name='B10 / Content'
      className='bg-[#dbe0e4] flex flex-col gap-16 items-center justify-center w-full'
    >
      <div className='h-[772px] relative shrink-0 w-[738px]'>
        <div aria-hidden='true' className='absolute inset-0 pointer-events-none'>
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={getImageAlt(imageChooser)}
              fill
              unoptimized
              className='absolute max-w-none object-center object-contain size-full'
            />
          )}
          {overlayImageSrc && (
            <div className='absolute inset-0 overflow-hidden'>
              <Image
                src={overlayImageSrc}
                alt={getImageAlt(overlayImageChooser)}
                fill
                unoptimized
                className='absolute h-[97.25%] left-0 max-w-none top-[1.37%] w-full object-contain'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentB10;

