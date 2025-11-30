'use client';
import React, { useEffect, useRef, useState } from 'react';
import { environment } from '../../../environments/environment';
import { Grid } from '@/components/grid';
import { Typography } from '@/components/typography';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import HeaderMaskGroup from './header-mask-group';
import { cn } from '@/lib/utils';

interface ImageChooser {
  field?: 'image' | 'externalImage';
  image?: {
    '@link': string;
  };
  imageAlt?: string;
  externalImage?: string;
  externalImageAlt?: string;
}

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

interface IHeaderA4Props {
  title: string;
  description: string;
  imageChooser?: ImageChooser;
  ctaChooser?: CtaChooser;
  height?: 'h-screen' | 'h-[75vh' | 'h-[50vh]' | 'h-96' | 'h-80' | 'h-64';
}

const HeaderA4: React.FC<IHeaderA4Props> = ({
  title,
  description,
  ctaChooser,
  height,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionWidth, setSectionWidth] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      if (sectionRef.current) {
        setSectionWidth(sectionRef.current.offsetWidth);
        setSectionHeight(sectionRef.current.offsetHeight);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

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

  const heightClass = height ? height : 'h-screen';

  return (
    <section
      ref={sectionRef}
      className={cn('relative flex items-center bg-ring', heightClass)}
    >
      <HeaderMaskGroup
        width={sectionWidth}
        height={sectionHeight}
        className='absolute top-0 left-0 w-full h-full pointer-events-none z-10'
      />
      <div className='container mx-auto px-2 lg:px-0 flex items-center justify-center h-full relative z-20'>
        <Grid cols={1} mdCols={2} className='w-full' gap={4}>
          <Grid>
            <div>
              {title && (
                <Typography variant={'h1'} weight={'light'} className='mb-5'>
                  {title}
                </Typography>
              )}
              {description && (
                <Typography variant={'h4'} weight={'light'}>
                  {description}
                </Typography>
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
                      <ArrowRight />
                    </Link>
                  </Button>
                )}
            </div>
          </Grid>
        </Grid>
      </div>
    </section>
  );
};

export default HeaderA4;
