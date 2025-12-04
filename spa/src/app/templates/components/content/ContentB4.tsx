
import { SafeImage } from "@/components/ui/safe-image";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { environment } from "@/environments/environment";
import get from "lodash/get";
import has from "lodash/has";

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
  imageChooser?: ImageChooser;
  thumb?: string;
  ctaChooser?: CtaChooser;
  button?: {
    label?: string;
    href?: string;
  };
  customClass?: string;
}

export default function ContentB4({
  button,
  description,
  backgroundImageChooser,
  imageChooser,
  ctaChooser,
  thumb = "/assets/placeholder-img.png",
  title = "",
  customClass,
}: ContentB4Props) {
  // Use CSS classes for responsive behavior instead of hooks

  // Get image from Magnolia or use thumb prop
  let imageSrc = thumb;
  let imageAlt = title;

  // Prefer backgroundImageChooser, then imageChooser, then thumb
  const chooser = backgroundImageChooser || imageChooser;
  if (chooser) {
    if (chooser.field === 'image' && chooser.image) {
      imageSrc = `${environment.damRawBase}${chooser.image['@link']}`;
      imageAlt = chooser.imageAlt || title;
    } else if (chooser.field === 'externalImage' && chooser.externalImage) {
      imageSrc = chooser.externalImage;
      imageAlt = chooser.externalImageAlt || title;
    }
  }

  // Get button from Magnolia CTA or fallback to button prop
  let buttonLabel = button?.label;
  let buttonHref = button?.href || '#';

  if (ctaChooser && ctaChooser.field === 'withCta') {
    buttonLabel = ctaChooser.ctaText || buttonLabel;
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
      className={cn("relative py-12 md:py-8 lg:py-16 lg:min-h-[600px] xl:px-20", customClass)}
    >
      <div className="relative z-10 container mx-auto px-2 lg:px-0 h-full pt-25 md:pt-20 lg:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20 h-full">
          <div
            className={cn("h-full flex flex-col justify-between lg:gap-8 text-white lg:text-inherit")}
          >
            {title && (
              <Typography variant={"h2"} weight={"light"}>
                {title}
              </Typography>
            )}

            {description && (
              <Typography
                variant={"body-large"}
                weight={"light"}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}

            {buttonLabel && (
              <div>
                <Button
                  variant={"outline"}
                  asChild
                  className="lg:border-[#c33b32] lg:text-[#c33b32] border-white text-white"
                >
                  <Link
                    href={buttonHref}
                    className="flex items-center justify-between gap-2"
                  >
                    {buttonLabel} <ArrowRight />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className="overlay lg:hidden w-full h-full absolute top-0 left-0 z-5"
        style={{
          background: `linear-gradient(255.53deg, rgba(0, 0, 0, 0) 6.39%, rgba(0, 0, 0, 0.5) 45.28%)`,
        }}
      />

      <SafeImage
        src={imageSrc}
        alt={imageAlt}
        fill
        className="w-full h-full object-cover z-1"
      />
    </section>
  );
}
