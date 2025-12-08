import { decodeIfEscaped } from '@/app/services/content-service';
import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { SafeImage } from '@/components/ui/safe-image';
import { environment } from '@/environments/environment';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface CtaChooser {
  label: string;
  isExternal: boolean;
  href: string;
}

export interface HeroA1Item {
  title: string;
  description: string;
  image?: string; // Resolved asset path or uuid
  ctaChooser?: CtaChooser;
}

interface HeroA1ListProps {
  items: HeroA1Item[];
  className?: string;
}

const HeroA1List: React.FC<HeroA1ListProps> = ({ items, className }) => {
  if (!items || items.length === 0) return null;

  return (
    <section className={cn('relative w-full', className)}>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className='w-full'
      >
        <CarouselContent className='-ml-0'>
          {items.map((item, index) => {
            const imageUrl = item.image
              ? `${environment.damRawBase}/magnoliaAuthor/dam/${item.image}`
              : '';

            return (
              <CarouselItem
                key={index}
                className='pl-0 relative min-h-[600px] lg:min-h-[700px] w-full'
              >
                {/* Background Image */}
                <div className='absolute inset-0 z-0'>
                  {imageUrl && (
                    <SafeImage
                      src={imageUrl}
                      alt={item.title}
                      fill
                      className='object-cover'
                      priority={index === 0}
                    />
                  )}
                  {/* Gradient Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10' />
                </div>

                {/* Content */}
                <div className='relative z-20 container mx-auto px-4 h-full flex flex-col justify-center min-h-[600px] lg:min-h-[700px]'>
                  <div className='max-w-2xl text-white flex flex-col gap-4 lg:gap-8'>
                    <Typography
                      variant='hero-heading' // Adjust variant in typography if needed for big serif
                      // className='text-5xl lg:text-7xl font-serif italic mb-6 leading-tight'
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant={'body-large'}
                      dangerouslySetInnerHTML={{
                        __html: decodeIfEscaped(item.description),
                      }}
                    />

                    <div>
                      {item.ctaChooser && (
                        <Button
                          asChild
                          variant='outline'
                          // className='bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors rounded-none px-6 py-6 text-lg'
                          color='white'
                        >
                          <Link
                            href={item.ctaChooser.href}
                            target={
                              item.ctaChooser.isExternal ? '_blank' : undefined
                            }
                          >
                            {item.ctaChooser.label}{' '}
                            <ArrowRight className='ml-2 w-5 h-5' />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Navigation/Indicators could be added here. 
            Standard Shadcn CarouselNext/Prev are buttons. 
            The design shows bottom bars. We might need custom indicators later. 
            For now, relying on swipe/default behavior or Autoplay (if we add plugin). 
        */}
      </Carousel>
    </section>
  );
};

export default HeroA1List;
