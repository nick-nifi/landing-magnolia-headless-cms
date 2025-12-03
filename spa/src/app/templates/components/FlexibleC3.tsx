import React from 'react';
import { environment } from '../../../environments/environment';
import { decodeIfEscaped } from '../../services/content-service';
import { Card, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { SafeImage } from '@/components/ui/safe-image';

interface CtaLink {
  field?: 'internalPageLink' | 'externalPageLink';
  internalLink?: string;
  externalLink?: string;
}

interface CtaChooser {
  field?: 'noCta' | 'withCta';
  ctaText?: string;
  ctaLink?: CtaLink;
}

interface ImageChooser {
  field?: 'image' | 'externalImage';
  image?: {
    '@link': string;
  };
  imageAlt?: string;
  externalImage?: string;
  externalImageAlt?: string;
}

interface IFlexibleC3Props {
  title: string;
  description: string;
  imageChooser?: ImageChooser;
  ctaChooser?: CtaChooser;
  marginTop?: number | string;
}

const FlexibleC3: React.FC<IFlexibleC3Props> = ({
  title,
  description,
  imageChooser,
  ctaChooser,
  marginTop = 0,
}) => {
  const marginTopValue =
    typeof marginTop === 'string' ? parseInt(marginTop, 10) : marginTop;
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
    <Card
      className='shadow-md gap-0 h-[420px] flex flex-col overflow-hidden border border-[#e6e7e8]'
      style={{ marginTop: marginTopValue ? `${marginTopValue}px` : undefined }}
    >
      {imageSrc && (
        <div className='relative h-[240px] shrink-0'>
          <SafeImage
            src={imageSrc}
            alt={imageAlt}
            fill
            className='object-cover'
          />
        </div>
      )}
      <CardContent className='flex flex-col items-start p-5 overflow-hidden min-h-0 grow'>
        <div className='overflow-hidden min-h-0'>
          <Typography
            variant={'h4'}
            weight={'medium'}
            className='mb-2 line-clamp-2'
          >
            {title}
          </Typography>
          {description && (
            <Typography
              variant={'body-large'}
              weight={'light'}
              className='line-clamp-2'
              dangerouslySetInnerHTML={{ __html: decodeIfEscaped(description) }}
            />
          )}
        </div>
        <div className='mt-auto pt-2 shrink-0'>
          {ctaChooser &&
            ctaChooser.field === 'withCta' &&
            ctaText &&
            linkHref && (
              <Button asChild variant={'link'} style={{ paddingLeft: 0 }}>
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
      </CardContent>
    </Card>
  );
};

export default FlexibleC3;
