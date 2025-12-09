'use client';
import { decodeIfEscaped } from '@/app/services/content-service';
import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { environment } from '@/environments/environment';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

export interface HeaderA2Item {
  title: string;
  description: string;
  image?: string;
  ctaChooser?: {
    label: string;
    isExternal: boolean;
    href: string;
  };
}

interface HeaderA2Props {
  content: HeaderA2Item;
}

export default function HeaderA2({ content }: HeaderA2Props) {
  const imageUrl = content.image
    ? `${environment.damRawBase}/magnoliaAuthor/dam/${content.image}`
    : '';

  const sectionRef = useRef<HTMLElement>(null);

  if (!content) return null;

  return (
    <section
      ref={sectionRef}
      data-name='header a2'
      className='md:h-[460px] bg-gray-200 relative'
      style={{
        background: 'linear-gradient(101.22deg, #C33B32 1.75%, #D55C4D 58.27%)',
      }}
    >
      <div data-name='content-group' className='w-full h-full z-[3]'>
        <div className='container h-full'>
          <div className='grid grid-cols-1 md:grid-cols-2 h-full'>
            <div className='h-full flex flex-col justify-center text-white gap-4'>
              <Typography variant={'h1'} weight='light'>
                {content.title}
              </Typography>
              {content.description && (
                <Typography
                  variant={'body-large'}
                  weight='light'
                  className='pr-4 line-clamp-3'
                  dangerouslySetInnerHTML={{
                    __html: decodeIfEscaped(content.description),
                  }}
                />
              )}
              {content.ctaChooser?.label && (
                <div>
                  <Button asChild variant={'outline'} color='white'>
                    <Link href={content.ctaChooser.href || '#'}>
                      {content.ctaChooser.label}
                      {content.ctaChooser.isExternal ? (
                        <ExternalLink />
                      ) : (
                        <ArrowRight />
                      )}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        data-name='mask-group'
        className='absolute inset-0 w-full h-full z-[2] pointer-events-none'
      ></div>

      {imageUrl && (
        <div
          data-name='image-group'
          className='absolute inset-0 w-full h-full z-[1] flex grid md:grid-cols-2 pointer-events-none'
        >
          <div />
          <div className='relative w-full h-full'>
            <Image
              fill
              unoptimized
              src={imageUrl}
              alt={content.title || 'Header Image'}
              className='object-cover'
            />
          </div>
        </div>
      )}
    </section>
  );

  // return (
  //   <div className='relative w-full h-[300px] mb-8'>
  //     {imageUrl && (
  //       <Image
  //         src={imageUrl}
  //         alt={content.Title || 'Header Image'}
  //         fill
  //         className='object-cover z-0'
  //         unoptimized
  //       />
  //     )}
  //     <div className='absolute inset-0 bg-black/40 z-10' />
  //     <div className='relative z-20 container mx-auto h-full flex flex-col justify-center text-white px-4'>
  //       <Typography variant='h2' className='mb-4 font-bold'>
  //         {content.Title}
  //       </Typography>
  //       <div
  //         className='prose prose-invert max-w-none'
  //         dangerouslySetInnerHTML={{
  //           __html: decodeIfEscaped(content.Description),
  //         }}
  //       />
  //     </div>
  //   </div>
  // );
}
