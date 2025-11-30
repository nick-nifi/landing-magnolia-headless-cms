import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
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
}

const Flexiblec6: React.FC<IFlexiblec6Props> = ({
  title,
  description,
  ctaChooser,
}) => {
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
    <Card className='shadow-lg'>
      <CardContent className='p-5 flex flex-col justify-between flex-1 gap-6'>
        <div>
          <Typography variant={'h4'} weight={'medium'} className='mb-4'>
            {title}
          </Typography>
          {description && (
            <Typography
              variant={'body-large'}
              dangerouslySetInnerHTML={{ __html: decodeIfEscaped(description) }}
            />
          )}
        </div>
        <div>
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
                  <ExternalLink />
                </Link>
              </Button>
            )}
        </div>
      </CardContent>
    </Card>
  );
  return <div className='w-full p-4'></div>;
};

export default Flexiblec6;
