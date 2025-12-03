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

interface IContentB2Props {
  title: string;
  description: string;
  imageChooser?: ImageChooser;
  overlayImageChooser?: ImageChooser;
  ctaChooser?: CtaChooser;
  customClass?: string;
}

const ContentB2: React.FC<IContentB2Props> = ({
  title,
  description,
  imageChooser,
  overlayImageChooser,
  ctaChooser,
  customClass = '',
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
        className='border-[#c33b32] text-[#c33b32] hover:bg-[#c33b32] hover:text-white h-[42px] px-2.5 py-1.5 w-fit text-[20px]'
        asChild={!!ctaLink}
      >
        {ctaLink ? (
          <Link href={ctaLink} className='flex items-center gap-2.5'>
            {ctaText} <ArrowRight className='w-4 h-4' />
          </Link>
        ) : (
          <span className='flex items-center gap-2.5'>
            {ctaText} <ArrowRight className='w-4 h-4' />
          </span>
        )}
      </Button>
    );
  };

  return (
    <section
      data-name='B2 / Content'
      className={cn('bg-[#dbe0e4] py-16 px-4 md:px-20 lg:px-[160px]', customClass)}
    >
      <div className='flex flex-col gap-20 items-center max-w-[1280px] mx-auto w-full'>
        <div className='flex flex-col-reverse lg:flex-row gap-8 lg:gap-16 items-start lg:items-center w-full'>
          {/* Left Image */}
          <div className='flex flex-row items-center self-stretch w-full lg:w-auto'>
            <div className='relative w-full lg:w-[550px] h-64 lg:h-full min-h-[314px] lg:shrink-0'>
              <div aria-hidden='true' className='absolute inset-0 pointer-events-none overflow-hidden'>
                {imageSrc && (
                  <SafeImage
                    src={imageSrc}
                    alt={getImageAlt(imageChooser)}
                    fill
                    className='object-cover object-center'
                  />
                )}
                {overlayImageSrc && (
                  <div className='absolute inset-0 overflow-hidden'>
                    <SafeImage
                      src={overlayImageSrc}
                      alt={getImageAlt(overlayImageChooser)}
                      fill
                      className='object-cover object-center'
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className='flex flex-col gap-8 w-full lg:w-[489px] lg:shrink-0'>
            <div className='flex flex-col gap-8 w-full'>
              <div className='flex flex-col gap-4 w-full'>
                <div className='flex flex-col gap-6 text-[#3f4c54] w-full'>
                  <Typography
                    variant='h2'
                    weight='light'
                    className='text-3xl lg:text-[40px] leading-[1.2] tracking-[-0.4px]'
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant='body-large'
                    weight='light'
                    className='text-lg lg:text-[20px] leading-[1.5] [&_p]:mb-2.5 [&_p:last-child]:mb-0'
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: decodeIfEscaped(description),
                      }}
                    />
                  </Typography>
                </div>
              </div>
            </div>
            {renderButton()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentB2;

