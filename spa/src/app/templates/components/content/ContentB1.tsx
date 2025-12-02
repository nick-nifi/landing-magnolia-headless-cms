import { SafeImage } from '@/components/ui/safe-image';
import React from 'react';
import { environment } from '@/environments/environment';
import { decodeIfEscaped } from '@/app/services/content-service';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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

interface IContentB1Props {
  title: string;
  description: string;
  imageChooser?: ImageChooser;
  ctaChooser?: CtaChooser;
  buttonLabel?: string;
  buttonUrl?: string;
  customClass?: string;
}

const ContentB1: React.FC<IContentB1Props> = ({
  title,
  description,
  imageChooser,
  ctaChooser,
  buttonLabel,
  buttonUrl,
  customClass = '',
}) => {
  let imageSrc = '';
  let imageAlt = 'Image';

  if (
    imageChooser &&
    imageChooser.field &&
    (imageChooser.image || imageChooser.externalImage)
  ) {
    if (imageChooser.field === 'image' && imageChooser.image) {
      imageSrc = `${environment.damRawBase}${imageChooser.image['@link']}`;
      imageAlt = imageChooser.imageAlt || 'Image';
    } else if (
      imageChooser.field === 'externalImage' &&
      imageChooser.externalImage
    ) {
      imageSrc = imageChooser.externalImage;
      imageAlt = imageChooser.externalImageAlt || 'Image';
    }
  }

  // Get CTA link - same logic as B2
  const getCtaLink = (): string => {
    if (!ctaChooser || ctaChooser.field !== 'withCta' || !ctaChooser.ctaLink) {
      return buttonUrl || '';
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
  const ctaText = ctaChooser?.field === 'withCta' ? ctaChooser.ctaText : buttonLabel;

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
            {ctaText} <ArrowRight className='w-4 h-4 rotate-90' />
          </Link>
        ) : (
          <span className='flex items-center gap-2.5'>
            {ctaText} <ArrowRight className='w-4 h-4 rotate-90' />
          </span>
        )}
      </Button>
    );
  };


  return (
    <section
      data-name='B1 / Content'
      className={cn('bg-white py-16 px-4 md:px-20 lg:px-[160px]', customClass)}
    >
      <div className='flex flex-col gap-20 items-center max-w-[1280px] mx-auto w-full'>
        <div className='flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-center w-full'>
          {/* Left Content */}
          <div className='flex flex-col gap-8 w-full lg:w-[506px] lg:shrink-0'>
            <div className='flex flex-col gap-8 w-full'>
              <div className='flex flex-col gap-4 w-full'>
                <div className='flex flex-col gap-6 w-full'>
                  <h2 className='font-light text-3xl lg:text-[40px] leading-[1.2] tracking-[-0.4px] text-[#3f4c54]'>
                    {title}
                  </h2>
                  <div 
                    className='text-lg lg:text-[20px] font-light text-[#3f4c54]
                    [&_p]:leading-[1.5] [&_p]:mb-2.5 [&_p:last-child]:mb-0
                    [&_strong]:font-medium [&_b]:font-medium
                    [&_span]:leading-[1.5]'
                    dangerouslySetInnerHTML={{
                      __html: decodeIfEscaped(description),
                    }}
                  />
                </div>
              </div>
            </div>

            {/* CTA Button */}
            {renderButton()}
          </div>

          {/* Right Image */}
          <div className='flex flex-row items-center self-stretch flex-1 w-full'>
            <div className='relative w-full h-64 lg:h-full min-h-[314px]'>
              <SafeImage
                src={imageSrc}
                alt={imageAlt}
                fill
                className='object-cover object-center'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentB1;
