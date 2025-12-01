import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { environment } from '../../../../environments/environment';
import get from 'lodash/get';
import has from 'lodash/has';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ImageChooser {
  field?: 'image' | 'externalImage' | 'noOverlay';
  image?: {
    '@link': string;
  };
  imageAlt?: string;
  externalImage?: string;
  externalImageAlt?: string;
}

interface ViewButton {
  field?: 'noButton' | 'withButton';
  buttonText?: string;
  buttonLink?: {
    field?: 'fileLink' | 'internalPageLink' | 'externalPageLink';
    file?: {
      '@link': string;
    };
    internalLink?: string;
    externalLink?: string;
  };
}

interface IReportJProps {
  title: string;
  imageChooser?: ImageChooser;
  overlayImageChooser?: ImageChooser;
  viewButton?: ViewButton;
}

const ReportJ: React.FC<IReportJProps> = ({
  title,
  imageChooser,
  overlayImageChooser,
  viewButton,
}) => {
  // Get image source
  const getImageSrc = (imageChooser?: ImageChooser): string => {
    if (!imageChooser || imageChooser.field === 'noOverlay') return '';
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

  // Get button link
  const getButtonLink = (): string => {
    if (!viewButton || viewButton.field !== 'withButton' || !viewButton.buttonLink) {
      return '';
    }
    if (viewButton.buttonLink.field === 'fileLink' && viewButton.buttonLink.file) {
      return `${environment.damRawBase}${get(viewButton.buttonLink, "file['@link']")}`;
    }
    if (viewButton.buttonLink.field === 'internalPageLink') {
      return viewButton.buttonLink.internalLink || '';
    }
    if (viewButton.buttonLink.field === 'externalPageLink') {
      return viewButton.buttonLink.externalLink || '';
    }
    return '';
  };

  const buttonLink = getButtonLink();
  const buttonText = viewButton?.field === 'withButton' ? viewButton.buttonText : '';
  const isExternal = viewButton?.buttonLink?.field === 'fileLink' || viewButton?.buttonLink?.field === 'externalPageLink';

  const renderButton = () => {
    if (!buttonText) return null;

    const buttonContent = (
      <div className='flex gap-[10px] items-center justify-center pl-0 pr-[10px] py-[6px]'>
        <Typography
          variant='body-large'
          weight='regular'
          className='text-[#c33b32] text-[20px] leading-[1.5] whitespace-pre'
        >
          {buttonText}
        </Typography>
        <div className='flex h-[10.307px] items-center justify-center w-[14.645px]'>
          <div className='flex-none rotate-90'>
            <ArrowRight className='h-[14.645px] w-[10.307px] text-[#c33b32]' />
          </div>
        </div>
      </div>
    );

    if (buttonLink) {
      return (
        <Link
          href={buttonLink}
          target={isExternal ? '_blank' : '_self'}
          rel={isExternal ? 'noopener noreferrer' : ''}
          className='inline-block'
        >
          {buttonContent}
        </Link>
      );
    }

    return <div>{buttonContent}</div>;
  };

  return (
    <div
      data-name='J / Reports'
      className='flex flex-col gap-5 items-start justify-center w-full'
    >
      {/* Image Section */}
      <div className='flex flex-col gap-6 items-start relative shadow-[0px_12px_16px_-4px_rgba(0,0,0,0.08),0px_4px_6px_-2px_rgba(0,0,0,0.03)] w-full'>
        <div className='aspect-[360/510] relative shrink-0 w-full'>
          <div aria-hidden='true' className='absolute inset-0 pointer-events-none'>
            {imageSrc && (
              <Image
                src={imageSrc}
                alt={getImageAlt(imageChooser)}
                fill
                unoptimized
                className='absolute max-w-none object-center object-cover size-full'
              />
            )}
            {overlayImageSrc && (
              <Image
                src={overlayImageSrc}
                alt={getImageAlt(overlayImageChooser)}
                fill
                unoptimized
                className='absolute max-w-none object-center object-cover size-full'
              />
            )}
          </div>
        </div>
      </div>

      {/* Title */}
      <Typography
        variant='body-large'
        weight='medium'
        className='text-[#3f4c54] text-[20px] leading-[1.5] w-full'
      >
        {title}
      </Typography>

      {/* View Button */}
      {renderButton() && (
        <div className='flex gap-6 items-center w-full'>
          {renderButton()}
        </div>
      )}
    </div>
  );
};

export default ReportJ;

