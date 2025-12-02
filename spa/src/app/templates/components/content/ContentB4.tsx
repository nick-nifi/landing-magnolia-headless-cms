import { decodeIfEscaped } from '@/app/services/content-service';
import { Typography } from '@/components/typography';
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
  const getCtaLink = (): { href: string; isExternal: boolean } => {
    if (!ctaChooser || ctaChooser.field !== 'withCta' || !ctaChooser.ctaLink) {
      return { href: '', isExternal: false };
    }
    if (ctaChooser.ctaLink.field === 'externalPageLink') {
      return { href: ctaChooser.ctaLink.externalLink || '', isExternal: true };
    }
    if (ctaChooser.ctaLink.field === 'internalPageLink') {
      return { href: ctaChooser.ctaLink.internalLink || '', isExternal: false };
    }
    return { href: '', isExternal: false };
  };

  const { href: ctaLink, isExternal } = getCtaLink();
  const ctaText = ctaChooser?.field === 'withCta' ? ctaChooser.ctaText : '';

  const renderButton = () => {
    if (!ctaText) return null;

    const buttonContent = (
      <>
        <span className="leading-[1.5]">{ctaText}</span>
        <ArrowRight className="w-[14.645px] h-[10.307px]" />
      </>
    );

    const buttonClassName =
      'inline-flex items-center justify-center gap-2.5 w-fit h-[46px] px-2.5 py-1.5 border border-[#c33b32] text-[#c33b32] text-[20px] font-normal hover:bg-[#c33b32] hover:text-white transition-colors';

    if (ctaLink) {
      return (
        <Link
          href={ctaLink}
          className={buttonClassName}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {buttonContent}
        </Link>
      );
    }

    return <button className={buttonClassName}>{buttonContent}</button>;
  };

  return (
    <section
      data-name="B4 / Content / full image"
      className="relative w-full flex items-center justify-center px-4 md:px-20 lg:px-[160px] py-8"
    >
      {/* Background Images */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Base background image */}
        {backgroundImageSrc && (
          <div className="absolute inset-0 overflow-hidden">
            <SafeImage
              src={backgroundImageSrc}
              alt={getImageAlt(backgroundImageChooser)}
              fill
              className="object-cover"
            />
          </div>
        )}
        {/* Dark overlay */}
        <div className="absolute bg-black/50 inset-0" />
        {/* Overlay image (faded/masked effect) */}
        {overlayImageSrc && (
          <div className="absolute inset-0 overflow-hidden">
            <SafeImage
              src={overlayImageSrc}
              alt={getImageAlt(overlayImageChooser)}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col gap-20 items-start max-w-[1280px] w-full lg:w-[1120px] py-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start lg:items-end w-full">
          {/* Left Column - Content */}
          <div className="flex flex-col gap-8 w-full lg:w-[470px] shrink-0">
            <Typography
              variant="h2"
              weight="light"
              className="text-[#3f4c54] text-[28px] lg:text-[40px] leading-[1.2] tracking-[-0.4px]"
            >
              {title}
            </Typography>
            <div className="text-[#3f4c54] text-[18px] lg:text-[20px] font-light leading-[1.5]">
              <div
                dangerouslySetInnerHTML={{
                  __html: decodeIfEscaped(description),
                }}
              />
            </div>
            {renderButton()}
          </div>

          {/* Right Column - Empty space for background image to show */}
          <div className="hidden lg:block h-[375px] w-[570px] shrink-0" />
        </div>
      </div>
    </section>
  );
};

export default ContentB4;

