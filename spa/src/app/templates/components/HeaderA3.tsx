'use client';
import React, { useEffect, useRef, useState } from 'react';
import { environment } from '../../../environments/environment';
import { Grid } from '@/components/grid';
import { Typography } from '@/components/typography';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { decodeIfEscaped } from '@/app/services/content-service';
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

interface IHeaderA3Props {
  title: string;
  description: string;
  imageChooser?: ImageChooser;
  ctaChooser?: CtaChooser;
  height?: 'h-screen' | 'h-[75vh]' | 'h-[50vh]' | 'h-96' | 'h-80' | 'h-64';
}

const HeaderA3: React.FC<IHeaderA3Props> = ({
  title,
  description,
  ctaChooser,
  height,
}) => {
  let ctaText = '';
  let linkHref = '';
  let isExternal = false;

  const sectionRef = useRef<HTMLElement>(null);
  const [sectionWidth, setSectionWidth] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);

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

  useEffect(() => {
    const handleResize = () => {
      if (sectionRef.current) {
        setSectionWidth(sectionRef.current.offsetWidth);
        setSectionHeight(sectionRef.current.offsetHeight);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn('relative flex items-center', heightClass, 'text-white')}
      style={{
        background:
          'linear-gradient(90deg, hsl(var(--color-uobkh-red)) 0%, hsl(var(--color-uobkh-peach-red)) 63%)',
      }}
    >
      <HeaderMaskGroup
        width={sectionWidth}
        height={sectionHeight}
        className='absolute top-0 left-0 w-full h-full pointer-events-none z-10 opacity-50'
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
                <Typography
                  variant={'h4'}
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
                  <Button asChild variant={'outline'} color='white'>
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
      {/* {imageSrc && (
        <div className='absolute inset-0'>
          <img
            src={imageSrc}
            alt={imageAlt}
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-black opacity-50'></div>
        </div>
      )} */}
      {/* <div className='relative z-10 text-center px-4'>
        {title && (
          <h1 className='text-4xl md:text-6xl font-bold mb-4'>{title}</h1>
        )}
        {description && (
          <p className='text-lg md:text-2xl mb-6'>{description}</p>
        )}
        {ctaChooser &&
          ctaChooser.field === 'withCta' &&
          ctaText &&
          linkHref && (
            <a
              href={linkHref}
              {...(isExternal
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'
            >
              {ctaText}
            </a>
          )}
      </div> */}
    </section>
  );
};

export default HeaderA3;
