
import Link from "next/link";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
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

interface ContentB1Props {
  title?: string;
  description?: string;
  imageChooser?: ImageChooser;
  ctaChooser?: CtaChooser;
  button?: {
    label?: string;
    href?: string;
  };
  className?: string;
  customClass?: string;
}

export default function ContentB1({
  description,
  imageChooser,
  ctaChooser,
  title,
  button,
  className,
  customClass,
}: ContentB1Props) {

  // Get image from Magnolia
  let thumb = '';
  let imageAlt = title || '';
  
  if (imageChooser) {
    if (imageChooser.field === 'image' && imageChooser.image) {
      thumb = `${environment.damRawBase}${imageChooser.image['@link']}`;
      imageAlt = imageChooser.imageAlt || title || '';
    } else if (imageChooser.field === 'externalImage' && imageChooser.externalImage) {
      thumb = imageChooser.externalImage;
      imageAlt = imageChooser.externalImageAlt || title || '';
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
      data-name="content-b1"
      className={cn("py-12 lg:py-16 bg-muted-foreground", className, customClass)}
    >
      <div className="container mx-auto px-2 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <div className="lg:mb-8">
              <Typography
                variant={"h2"}
                weight={"light"}
                className="mb-5 lg:mb-6"
              >
                {title}
              </Typography>
              {description && (
                <Typography variant={"body-large"} weight={"light"}>
                  {description}
                </Typography>
              )}
            </div>

            {buttonLabel && (
              <div>
                <Link href={buttonHref}>
                  <Button variant={"outline"}>
                    {buttonLabel} <ArrowRight />
                  </Button>
                </Link>
              </div>
            )}
          </div>
          {thumb && (
            <div>
              <div className="relative w-full h-full min-h-[300px]">
                <SafeImage
                  src={thumb}
                  alt={imageAlt}
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
