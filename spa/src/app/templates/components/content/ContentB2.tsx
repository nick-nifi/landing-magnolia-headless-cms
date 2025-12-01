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

interface IContentB2Props {
  title: string;
  description: string;
  imageChooser?: ImageChooser;
  overlayImageChooser?: ImageChooser;
  ctaChooser?: CtaChooser;
}

const ContentB2: React.FC<IContentB2Props> = ({
  title,
  description,
  imageChooser,
  overlayImageChooser,
  ctaChooser,
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
    <div
      data-name='B2 / Content'
      className='flex flex-col gap-20 items-start max-w-[1280px] w-full'
    >
      <div className='flex gap-16 items-center w-full'>
        {/* Image Section */}
        <div className='flex flex-row items-center self-stretch'>
          <div className='h-full min-h-[314px] relative shrink-0 w-[550px]'>
            <div aria-hidden='true' className='absolute inset-0 pointer-events-none'>
              <SafeImage
                src={imageSrc}
                alt={getImageAlt(imageChooser)}
                fill
                className='absolute max-w-none object-center object-cover size-full'
              />
              <SafeImage
                src={overlayImageSrc}
                alt={getImageAlt(overlayImageChooser)}
                fill
                className='absolute max-w-none object-center object-cover size-full'
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className='flex flex-col gap-8 items-start w-[489px]'>
          <div className='flex flex-col gap-8 items-start w-full'>
            <div className='flex flex-col gap-4 items-start w-full'>
              <div className='flex flex-col gap-6 items-start text-[#3f4c54] w-full'>
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
              </div>
            </div>
          </div>
          {renderButton()}
        </div>
      </div>
    </div>
  );
};

export default ContentB2;

