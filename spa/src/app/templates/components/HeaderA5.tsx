'use client';
import React, { useEffect, useRef, useState } from 'react';
import { environment } from '../../../environments/environment';
import { cn } from '@/lib/utils';
import HeaderMaskGroup from './header-mask-group';
import { Grid } from '@/components/grid';
import Image from 'next/image';
import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';

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

interface IHeaderA5Props {
  title: string;
  description: string;
  imageChooser?: ImageChooser;
  ctaChooser?: CtaChooser;
  height?: 'h-screen' | 'h-[75vh]' | 'h-[50vh]' | 'h-96' | 'h-80' | 'h-64';
}

const HeaderA5: React.FC<IHeaderA5Props> = ({
  title,
  description,
  imageChooser,
  ctaChooser,
  // height,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionWidth, setSectionWidth] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);

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

  // const heightClass = height ? height : 'h-screen';

  return (
    <section
      ref={sectionRef}
      className={cn(
        `relative flex items-center justify-center text-white h-[85vh] lg:h-[50vh]`
      )}
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

      <div className='absolute top-0 left-0 w-full h-full pointer-events-none'>
        <Grid cols={1} mdCols={2} gap={0} className='h-full'>
          <Grid>
            <div />
          </Grid>
          <Grid className='relative w-full h-full'>
            {imageSrc && (
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                unoptimized
                className='object-cover'
              />
            )}
          </Grid>
        </Grid>
      </div>

      <div className='absolute top-0 left-0 w-full h-full'>
        <div className='container mx-auto h-full w-full py-auto px-2 lg:px-0'>
          <Grid cols={1} mdCols={2} gap={0} className='h-full'>
            <Grid className='w-full h-full'>
              <div
                className={cn('flex flex-col justify-center lg:pr-20 gap-5')}
              >
                {title && (
                  <Typography variant={'h2'} weight={'light'}>
                    {title}
                  </Typography>
                )}
                {description && (
                  <Typography variant={'body-large'} weight={'light'}>
                    {description}
                  </Typography>
                )}
                {ctaChooser &&
                  ctaChooser.field === 'withCta' &&
                  ctaText &&
                  linkHref && (
                    <div>
                      <Button asChild variant={'outline'} color='white'>
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
                    </div>
                  )}
              </div>
            </Grid>
            <Grid>
              <div />
            </Grid>
          </Grid>
        </div>
      </div>

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

export default HeaderA5;
