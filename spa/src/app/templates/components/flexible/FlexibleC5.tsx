import React from 'react';

import { decodeIfEscaped } from '../../../services/content-service';
import { Card, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { environment } from '@/environments/environment';

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

interface Link {
  link: {
    '@link': string;
    '@path': string;
    '@uuid': string;
    '@name': string;
  };
  label: string;
}

interface IFlexibleC5Props {
  title: string;
  description: string;
  schedule?: string;
  link?: Link;
  ctaChooser?: CtaChooser;
  marginTop?: number | string;
}

const FlexibleC5: React.FC<IFlexibleC5Props> = ({
  title,
  description,
  schedule,
  ctaChooser,
  // marginTop = 0,
}) => {
  // const marginTopValue =
  //   typeof marginTop === 'string' ? parseInt(marginTop, 10) : marginTop;
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
      className='shadow-md border h-full'
      // style={{ marginTop: marginTopValue ? `${marginTopValue}px` : undefined }}
    >
      <CardContent className='flex flex-col p-5 overflow-hidden min-h-0 grow'>
        <div className='overflow-hidden min-h-0'>
          <Typography
            variant={'h4'}
            weight={'medium'}
            className='mb-2 line-clamp-3'
          >
            {title}
          </Typography>
          {description && (
            <Typography
              variant={'body-large'}
              weight={'light'}
              dangerouslySetInnerHTML={{ __html: decodeIfEscaped(description) }}
            />
          )}
          {schedule && (
            <Typography
              variant={'body-small'}
              weight={'semibold'}
              className='mt-2'
              dangerouslySetInnerHTML={{ __html: decodeIfEscaped(schedule) }}
            />
          )}
        </div>

        <div className='mt-auto pt-3 shrink-0'>
          {ctaChooser &&
            ctaChooser.field === 'withCta' &&
            ctaText &&
            linkHref && (
              <Button asChild variant={'link'} style={{ paddingLeft: 0 }}>
                <Link
                  href={linkHref}
                  target={isExternal ? '_blank' : undefined}
                >
                  {ctaText} {isExternal ? <ExternalLink /> : <ArrowRight />}
                </Link>
              </Button>
            )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FlexibleC5;
