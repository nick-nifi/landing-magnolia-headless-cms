/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client';

import { Grid } from '@/components/grid';
import { Typography } from '@/components/typography';

interface CarouselImage {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}

export interface SlideProps extends CarouselImage {}

const isValidImageSrc = (src: string | undefined | null): boolean => {
  if (!src || typeof src !== 'string' || src.trim() === '') return false;
  // Check if it's a valid URL or relative path
  if (src.startsWith('/') || src.startsWith('http://') || src.startsWith('https://')) {
    return true;
  }
  return false;
};

export default function Slide({
  description,
  imageAlt,
  imageSrc,
  title,
}: SlideProps) {
  const validImageSrc = isValidImageSrc(imageSrc);

  return (
    <div className='h-screen relative lg:h-[600px]'>
      <div
        className={`
          absolute inset-0
          z-5
          bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_59.24%)]
          sm:bg-[linear-gradient(270deg,rgba(0,0,0,0)_7.42%,rgba(0,0,0,0.5)_82.03%)]
          lg:bg-[linear-gradient(270deg,rgba(0,0,0,0)_24.03%,rgba(0,0,0,0.5)_87.05%)]
          transition-all duration-500
        `}
        style={{ zIndex: 5 }}
      />
      {validImageSrc && (
        <div
          className='absolute top-0 left-0 z-3 w-full h-full'
          style={{ zIndex: 3 }}
        >
          <div className='relative w-full h-full'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={imageAlt ?? ''}
              className='w-full h-full object-cover z-1'
            />
          </div>
        </div>
      )}

      {/* {media && (
        <div className='absolute top-0 left-0 z-3 w-full h-full'>
          <div className='relative w-full h-full'>
            {media.type === 'image' ? (
              <Image
                src={media.src || ''}
                alt={title || ''}
                fill
                className='object-cover'
                unoptimized
              />
            ) : (
              <video
                muted
                src={media.src || ''}
                autoPlay
                poster={media.poster || ''}
                loop
                className='w-full h-full object-cover'
              />
            )}
          </div>
        </div>
      )} */}

      <div className='container px-2 lg:px-0 relative z-10 mx-auto h-full'>
        <Grid mdCols={2} cols={1} className='h-full'>
          <Grid className='h-full justify-center items-center flex'>
            <div className='flex flex-col gap-8'>
              {title && (
                <Typography variant={'hero-heading'}>{title}</Typography>
              )}
              {description && (
                <Typography variant={'body-large'} weight={'light'}>
                  {description}
                </Typography>
              )}

              {/* {actionLabel && (
                <div>
                  {actionHref ? (
                    <Link href={actionHref}>
                      <Button variant={'outline'} color='white'>
                        {actionLabel} <ArrowRight />
                      </Button>
                    </Link>
                  ) : (
                    <Button variant={'outline'} color='white'>
                      {actionLabel} <ArrowRight />
                    </Button>
                  )}
                </div>
              )} */}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
