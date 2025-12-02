import { Typography } from '@/components/typography';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';
import { environment } from '../../../environments/environment';
import { decodeIfEscaped } from '@/app/services/content-service';
import { ExternalLink } from 'lucide-react';

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

interface IFlexiblec6Props {
  title: string;
  description: string;
  ctaChooser?: CtaChooser;
  marginTop?: number | string;
}

const Flexiblec6: React.FC<IFlexiblec6Props> = ({
  title,
  description,
  ctaChooser,
  marginTop = 0,
}) => {
  const marginTopValue = typeof marginTop === 'string' ? parseInt(marginTop, 10) : marginTop;
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
      className='h-[220px] flex flex-col overflow-hidden border border-[#e6e7e8] shadow-md'
      style={{ marginTop: marginTopValue ? `${marginTopValue}px` : undefined }}
    >
      <CardContent className='p-5 flex flex-col overflow-hidden min-h-0 grow'>
        <div className='overflow-hidden min-h-0'>
          <Typography 
            variant={'h4'} 
            weight={'medium'} 
            className='mb-2 line-clamp-3 text-[#3f4c54] text-[28px] leading-[1.2] tracking-[-0.28px]'
          >
            {title}
          </Typography>
          {description && (
            <Typography
              variant={'body-large'}
              className='line-clamp-2 text-[#3f4c54]'
              dangerouslySetInnerHTML={{ __html: decodeIfEscaped(description) }}
            />
          )}
        </div>
        <div className='mt-auto pt-3 shrink-0'>
          {ctaChooser &&
            ctaChooser.field === 'withCta' &&
            ctaText &&
            linkHref && (
              <Link
                href={linkHref}
                {...(isExternal
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className='inline-flex items-center gap-1.5 text-[#c33b32] text-[20px] font-normal hover:text-[#c33b32]/80'
              >
                {ctaText}
                <ExternalLink className='w-4 h-4' />
              </Link>
            )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Flexiblec6;
