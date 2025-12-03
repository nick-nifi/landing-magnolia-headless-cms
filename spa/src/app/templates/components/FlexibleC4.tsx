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

interface IFlexibleC4Props {
  title: string;
  description: string;
  imageChooser?: ImageChooser;
  ctaChooser?: CtaChooser;
  marginTop?: number | string;
}

const FlexibleC4: React.FC<IFlexibleC4Props> = ({
  title,
  description,
  imageChooser,
  ctaChooser,
  marginTop = 0,
}) => {
  const marginTopValue = typeof marginTop === 'string' ? parseInt(marginTop, 10) : marginTop;
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
      ''
    );
  };

  const imageSrc = getImageSrc();
  const imageAlt = getImageAlt();

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
        variant={'ghost'}
        className='text-[#c33b32] hover:text-[#c33b32] hover:bg-transparent p-0 h-auto pl-0 pr-[10px] py-[6px]'
        asChild={!!ctaLink}
      >
        {ctaLink ? (
          <Link href={ctaLink}>
            {ctaText} <ArrowRight className='w-4 h-4' />
          </Link>
        ) : (
          <>
            {ctaText} <ArrowRight className='w-4 h-4' />
          </>
        )}
      </Button>
    );
  };

  return (
    <div
      data-name='C4 / Feature tiles / Flexible'
      className='bg-white border border-[#e6e7e8] shadow-md flex items-start overflow-hidden relative w-full'
      style={{ marginTop: marginTopValue ? `${marginTopValue}px` : undefined }}
    >
      <div className='flex items-start w-full'>
        {/* Image */}
        {imageSrc && (
          <div className='flex items-start relative self-stretch shrink-0 w-[215px]'>
            <SafeImage
              src={imageSrc}
              alt={imageAlt}
              fill
              className='absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full'
            />
          </div>
        )}

        {/* Content */}
        <div className='basis-0 flex flex-col gap-6 grow items-start justify-center min-h-px min-w-px px-5 py-6 relative self-stretch shrink-0'>
          {/* Content Top */}
          <div className='flex flex-col gap-2 items-start w-full'>
            <div className='flex flex-col gap-2 items-start text-[#3f4c54] w-full'>
              <Typography
                variant='h4'
                weight='medium'
                className='text-[28px] tracking-[-0.28px] leading-[1.2]'
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
            </div>
          </div>

          {/* Actions */}
          <div className='flex gap-6 items-center w-full'>
            {renderButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlexibleC4;

