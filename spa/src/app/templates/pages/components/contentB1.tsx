import React from 'react';
import { Button } from '@/components/ui/button';
import { SafeImage } from '@/components/ui/safe-image';
import { Typography } from '@/components/typography';
import Link from 'next/link';
import { environment } from '@/environments/environment';
import { decodeIfEscaped } from '@/app/services/content-service';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContentB1Props {
  title: string;
  description: string;
  image?: {
    '@link': string;
  };
  ctaChooser?: {
    label: string;
    isExternal: boolean;
    href: string;
  };
  className?: string;
  customClass?: string;
}

const ContentB1: React.FC<ContentB1Props> = ({
  title,
  description,
  image,
  ctaChooser,
  className,
  customClass,
}) => {
  const imageUrl = image ? environment.damRawBase + image['@link'] : '';

  return (
    <section
      data-name='content-b1'
      className={cn(
        'bg-muted-foreground py-12 lg:py-16',
        className,
        customClass
      )}
    >
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center lg:gap-16'>
          <div className='lg:mb-8'>
            <Typography variant='h2' weight='light' className='mb-6'>
              {title}
            </Typography>
            <Typography
              variant={'body-large'}
              weight={'light'}
              dangerouslySetInnerHTML={{ __html: decodeIfEscaped(description) }}
            />
            {ctaChooser && (
              <Button asChild variant='outline'>
                <Link
                  href={ctaChooser.href}
                  target={ctaChooser.isExternal ? '_blank' : undefined}
                >
                  {ctaChooser.label} <ArrowRight className='ml-2 w-4 h-4' />
                </Link>
              </Button>
            )}
          </div>
          {imageUrl && (
            <div className='relative w-full h-full min-h-[300px] rounded-lg overflow-hidden'>
              <SafeImage
                src={imageUrl}
                alt={title}
                fill
                className='object-cover object-center'
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContentB1;
