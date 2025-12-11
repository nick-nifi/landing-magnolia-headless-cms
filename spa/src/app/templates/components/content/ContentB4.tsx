
import { SafeImage } from "@/components/ui/safe-image";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { environment } from "@/environments/environment";

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

interface ContentB4Props {
  title?: string;
  description?: string;
  backgroundImageChooser?: ImageChooser;
  overlayImageChooser?: ImageChooser;
  ctaChooser?: CtaChooser;
  customClass?: string;
}

export default function ContentB4({
  description,
  backgroundImageChooser,
  overlayImageChooser,
  ctaChooser,
  title = "",
  customClass,
}: ContentB4Props) {
  // Get background image (Layer 1)
  let backgroundImageSrc = '';
  let backgroundImageAlt = title;

  if (backgroundImageChooser) {
    if (backgroundImageChooser.field === 'image' && backgroundImageChooser.image) {
      backgroundImageSrc = `${environment.damRawBase}${backgroundImageChooser.image['@link']}`;
      backgroundImageAlt = backgroundImageChooser.imageAlt || title;
    } else if (backgroundImageChooser.field === 'externalImage' && backgroundImageChooser.externalImage) {
      backgroundImageSrc = backgroundImageChooser.externalImage;
      backgroundImageAlt = backgroundImageChooser.externalImageAlt || title;
    }
  }

  // Get overlay image (Layer 2)
  let overlayImageSrc = '';
  let overlayImageAlt = title;

  if (overlayImageChooser) {
    if (overlayImageChooser.field === 'image' && overlayImageChooser.image) {
      overlayImageSrc = `${environment.damRawBase}${overlayImageChooser.image['@link']}`;
      overlayImageAlt = overlayImageChooser.imageAlt || title;
    } else if (overlayImageChooser.field === 'externalImage' && overlayImageChooser.externalImage) {
      overlayImageSrc = overlayImageChooser.externalImage;
      overlayImageAlt = overlayImageChooser.externalImageAlt || title;
    }
  }

  // Get button from Magnolia CTA
  let buttonLabel = '';
  let buttonHref = '#';

  if (ctaChooser && ctaChooser.field === 'withCta') {
    buttonLabel = ctaChooser.ctaText || '';
    if (ctaChooser.ctaLink) {
      if (ctaChooser.ctaLink.field === 'externalPageLink') {
        buttonHref = ctaChooser.ctaLink.externalLink || buttonHref;
      } else if (ctaChooser.ctaLink.field === 'internalPageLink') {
        buttonHref = ctaChooser.ctaLink.internalLink || buttonHref;
      }
    }
  }

  return (
    <section
      data-name="content-b4"
      className={cn("relative flex items-center justify-center px-[160px] py-8 min-h-[600px]", customClass)}
    >
      {/* Background Images Layer */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {/* Background Image (Layer 1) */}
        {backgroundImageSrc && (
          <div className="absolute inset-0 overflow-hidden">
            <SafeImage
              src={backgroundImageSrc}
              alt={backgroundImageAlt}
              fill
              className="absolute h-[144.46%] left-[-5.54%] max-w-none top-[-21.17%] w-[111.07%] object-cover"
            />
          </div>
        )}
        
        {/* Dark Overlay */}
        <div className="absolute bg-[rgba(0,0,0,0.5)] inset-0" />
        
        {/* Overlay Image (Layer 2) */}
        {overlayImageSrc && (
          <div className="absolute inset-0 overflow-hidden">
            <SafeImage
              src={overlayImageSrc}
              alt={overlayImageAlt}
              fill
              className="absolute h-[128.45%] left-[-1.63%] max-w-none top-[-6.55%] w-[127.45%] object-cover"
            />
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-start max-w-[1280px] px-0 py-8 shrink-0 w-full">
        <div className="flex gap-20 items-end relative shrink-0 w-full">
          {/* Left Column - Text Content */}
          <div className="flex flex-row items-end self-stretch">
            <div className="flex flex-col gap-8 h-full items-start justify-center relative shrink-0 w-[470px]">
              {title && (
                <Typography
                  variant={"h2"}
                  weight={"light"}
                  className="text-[#3f4c54] text-[40px] leading-[1.2] tracking-[-0.4px]"
                >
                  {title}
                </Typography>
              )}

              {description && (
                <Typography
                  variant={"body-large"}
                  weight={"light"}
                  className="text-[#3f4c54] text-[20px] leading-[1.5]"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}

              {buttonLabel && (
                <div className="border border-[#c33b32] border-solid flex gap-2.5 h-[46px] items-center justify-center px-2.5 py-1.5">
                  <Link
                    href={buttonHref}
                    className="flex items-center justify-center gap-2.5 text-[#c33b32] text-[20px] leading-[1.5]"
                  >
                    <span>{buttonLabel}</span>
                    <ArrowRight className="h-[14.645px] w-[10.307px] rotate-90" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Empty space for layout */}
          <div className="h-[375px] shrink-0 w-[570px]" />
        </div>
      </div>
    </section>
  );
}
