import { decodeIfEscaped } from '@/app/services/content-service';
import { Grid } from '@/components/grid';
import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { environment } from '@/environments/environment';
import { cn } from '@/lib/utils';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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
  customClass = '',
}) => {
  let imageSrc = '';
  let imageAlt = 'Image';
  let isExternalImage = false;

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
      isExternalImage = true;
    }
  }

  let ctaText = '';
  let linkHref = '';
  let isExternal = false;

  if (ctaChooser && ctaChooser.field === 'withCta') {
    ctaText = ctaChooser.ctaText || '';

    const ctaLink = ctaChooser.ctaLink;

    if (ctaLink) {
      if (ctaLink.field === 'internalPageLink' && ctaLink.internalLink) {
        const origin =
          typeof window !== 'undefined' ? window.location.origin : '';
        let link = ctaLink.internalLink;
        if (link.startsWith(environment.appBase)) {
          link = link.slice(environment.appBase.length);
          if (!link.startsWith('/')) {
            link = '/' + link;
          }
        }
        linkHref = `${origin}${link}`;
      } else if (ctaLink.field === 'externalPageLink' && ctaLink.externalLink) {
        linkHref = ctaLink.externalLink;
        isExternal = true;
      }
    }
  }

  return (
    <section
      data-name='B1 / Content'
      className={cn('md:py-16 py-12', customClass)}
    >
      <div className='container'>
        <Grid cols={1} lgCols={2} className='lg:gap-16 gap-12'>
          <Grid>
            <div className='lg:mb-6'>
              {title && (
                <Typography variant='h2' weight={'light'} className='mb-5'>
                  {title}
                </Typography>
              )}
              {description && (
                <Typography
                  variant={'body-large'}
                  weight={'light'}
                  dangerouslySetInnerHTML={{
                    __html: decodeIfEscaped(description),
                  }}
                />
              )}
            </div>
            <div>
              {ctaChooser &&
                ctaChooser.field === 'withCta' &&
                ctaText &&
                linkHref && (
                  <Button asChild variant={'outline'}>
                    <Link
                      href={linkHref}
                      {...(isExternal
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {ctaText}
                      {isExternal ? <ExternalLink /> : <ArrowRight />}
                    </Link>
                  </Button>
                )}
            </div>
          </Grid>
          <Grid className='relative'>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className='min-h-[250px] object-cover'
              unoptimized={isExternalImage}
              loading='lazy'
            />
          </Grid>
        </Grid>
      </div>
    </section>
  );
};

export default ContentB1;
