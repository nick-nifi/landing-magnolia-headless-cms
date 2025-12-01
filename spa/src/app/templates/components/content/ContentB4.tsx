import { decodeIfEscaped } from '@/app/services/content-service';
import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { environment } from '@/environments/environment';
import get from 'lodash/get';
import has from 'lodash/has';
import Link from 'next/link';
import { SafeImage } from '@/components/ui/safe-image';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageChooser {
  field?: 'image' | 'externalImage';
  image?: {
    '@link': string;
  };
  imageAlt?: string;
  externalImage?: string;
  externalImageAlt?: string;
}

interface CtaChooser {
  field?: 'noCta' | 'withCta';
  ctaText?: string;
  ctaLink?: {
    field?: 'internalPageLink' | 'externalPageLink';
    internalLink?: string;
    externalLink?: string;
  };
}

interface IContentB4Props {
  title: string;
  description: string;
  backgroundImageChooser?: ImageChooser;
  overlayImageChooser?: ImageChooser;
  ctaChooser?: CtaChooser;
}

const ContentB4: React.FC<IContentB4Props> = ({
  title,
  description,
  backgroundImageChooser,
  overlayImageChooser,
  ctaChooser,
}) => {
  // Get background image source
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

  const backgroundImageSrc = getImageSrc(backgroundImageChooser);
  const overlayImageSrc = getImageSrc(overlayImageChooser);

  // Get CTA link
  const getCtaLink = (): string => {
    if (!ctaChooser || ctaChooser.field !== 'withCta' || !ctaChooser.ctaLink) {
      return '';
    }
    if (ctaChooser.ctaLink.field === 'externalPageLink') {
      return ctaChooser.ctaLink.externalLink || '';
    }
    if (ctaChooser.ctaLink.field === 'internalPageLink') {
      return ctaChooser.ctaLink.internalLink || '';
    }
    return '';
  };

  const ctaLink = getCtaLink();
  const ctaText = ctaChooser?.field === 'withCta' ? ctaChooser.ctaText : '';

  const renderButton = () => {
    if (!ctaText) return null;

    return (
      <Button
        variant={'outline'}
        className='border-[#c33b32] text-[#c33b32] hover:bg-[#c33b32] hover:text-white'
        asChild={!!ctaLink}
      >
        {ctaLink ? (
          <Link href={ctaLink}>
            {ctaText} <ArrowRight className='rotate-90' />
          </Link>
        ) : (
          <>
            {ctaText} <ArrowRight className='rotate-90' />
          </>
        )}
      </Button>
    );
  };

  return (
    <section
      data-name='B4 / Content / full image'
      className='relative w-full flex items-center justify-center px-[160px] py-8'
    >
      {/* Background Images */}
      <div
        aria-hidden='true'
        className='absolute inset-0 pointer-events-none overflow-hidden'
      >
        <div className='absolute inset-0 overflow-hidden'>
          <SafeImage
            src={backgroundImageSrc}
            alt={getImageAlt(backgroundImageChooser)}
            fill
            className='absolute h-[144.46%] left-[-5.54%] max-w-none top-[-21.17%] w-[111.07%] object-cover'
          />
        </div>
        {/* Dark overlay */}
        <div className='absolute bg-black/50 inset-0' />
        <div className='absolute inset-0 overflow-hidden'>
          <SafeImage
            src={overlayImageSrc}
            alt={getImageAlt(overlayImageChooser)}
            fill
            className='absolute h-[128.45%] left-[-1.63%] max-w-none top-[-6.55%] w-[127.45%] object-cover'
          />
        </div>
      </div>

      {/* Content Container */}
      <div className='relative z-10 flex flex-col gap-20 items-start max-w-[1280px] w-[1120px] py-8'>
        <div className='flex gap-20 items-end w-full'>
          {/* Left Column */}
          <div className='flex flex-col gap-8 w-[470px]'>
            <Typography
              variant='h2'
              weight='light'
              className='text-[40px] leading-[1.2] tracking-[-0.4px]'
            >
              {title}
            </Typography>
            <Typography
              variant='body-large'
              weight='light'
              className='text-[20px] leading-[1.5]'
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: decodeIfEscaped(description),
                }}
              />
            </Typography>
            {renderButton()}
          </div>

          {/* Right Column - Empty space for future content */}
          <div className='h-[375px] w-[570px] shrink-0' />
        </div>
      </div>
    </section>
  );
};

export default ContentB4;

