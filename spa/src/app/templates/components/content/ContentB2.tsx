
import { SafeImage } from "@/components/ui/safe-image";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { environment } from "@/environments/environment";
import get from "lodash/get";
import has from "lodash/has";
import { cn } from "@/lib/utils";

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

interface ContentB2Props {
  title?: string;
  description?: string;
  imageChooser?: ImageChooser;
  ctaChooser?: CtaChooser;
  button?: {
    label?: string;
    href?: string;
  };
  thumb?: string;
  customClass?: string;
}

export default function ContentB2({
  button,
  description,
  imageChooser,
  ctaChooser,
  thumb = "/assets/placeholder-img.png",
  title = "",
  customClass,
}: ContentB2Props) {
  // Get image from Magnolia or use thumb prop
  let imageSrc = thumb;
  let imageAlt = title;

  if (imageChooser) {
    if (imageChooser.field === 'image' && imageChooser.image) {
      imageSrc = `${environment.damRawBase}${imageChooser.image['@link']}`;
      imageAlt = imageChooser.imageAlt || title;
    } else if (imageChooser.field === 'externalImage' && imageChooser.externalImage) {
      imageSrc = imageChooser.externalImage;
      imageAlt = imageChooser.externalImageAlt || title;
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
      data-name="content-b2"
      className={cn("relative py-16 lg:py-28 xl:px-20", customClass)}
    >
      <div className="container mx-auto px-2 lg:px-0">
        <Card className="border-0 shadow-none bg-transparent">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16 items-center">
              {/* Image Section */}
              <div className="relative w-full h-64 lg:h-80">
                <SafeImage
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="w-full h-full object-cover rounded"
                />
              </div>

              {/* Content Section */}
              <div className="flex flex-col gap-8">
                {/* Title and Description */}
                <div className="flex flex-col gap-6">
                  {title && (
                    <Typography variant="h2" weight="light">
                      {title}
                    </Typography>
                  )}

                  {description && (
                    <Typography
                      variant="body-large"
                      weight="light"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  )}
                </div>

                {/* Button */}
                {buttonLabel && (
                  <div>
                    <Button variant="outline" asChild className="w-fit">
                      <Link
                        href={buttonHref}
                        className="flex items-center gap-2"
                      >
                        {buttonLabel} <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
