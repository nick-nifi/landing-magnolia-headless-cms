import { decodeIfEscaped } from '@/app/services/content-service';
import { Typography } from '@/components/typography';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { SafeImage } from '@/components/ui/safe-image';
import { environment } from '@/environments/environment';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

interface CtaChooser {
  label: string;
  isExternal: boolean;
  href: string;
}

export interface FeatureC2Item {
  title: string;
  description: string;
  tag?: string;
  image?: string;
  ctaChooser?: CtaChooser;
}

interface FeatureC2ListProps {
  title: string;
  c2Items: FeatureC2Item[];
  className?: string;
}

const FeatureC2List: React.FC<FeatureC2ListProps> = ({
  title,
  c2Items,
  className = '',
}) => {
  return (
    <section className={cn('py-12 lg:py-16', className)}>
      <div className='container'>
        <div className='text-center mb-12 md:mb-16 lg:mb-20'>
          <Typography variant='h2' weight='light'>
            {title}
          </Typography>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {c2Items?.map((item, index) => {
            const imageUrl = item.image
              ? `${environment.damRawBase}/magnoliaAuthor/dam/${item.image}`
              : '';
            return (
              <Card
                key={index}
                className='gap-0 border shadow-sm bg-card hover:shadow-md transition-shadow duration-200 flex flex-col h-full overflow-hidden'
              >
                <div className='relative aspect-9/5'>
                  <SafeImage
                    src={imageUrl}
                    alt={item.title}
                    fill
                    className='object-cover'
                  />
                  {item.tag && (
                    <Badge
                      className='absolute left-0 bottom-0'
                      variant={'secondary'}
                    >
                      {item.tag}
                    </Badge>
                  )}
                </div>

                <CardHeader className='pt-6'>
                  <Typography variant='h4' weight='medium'>
                    {item.title}
                  </Typography>
                </CardHeader>
                <CardContent className='flex-grow'>
                  <Typography
                    variant='body-large'
                    weight={'light'}
                    className='line-clamp-3'
                    dangerouslySetInnerHTML={{
                      __html: decodeIfEscaped(item.description),
                    }}
                  />
                </CardContent>
                <CardFooter className='pb-6'>
                  {item.ctaChooser && (
                    <Button asChild variant={'outline'}>
                      <Link
                        href={item.ctaChooser.href}
                        target={
                          item.ctaChooser.isExternal ? '_blank' : undefined
                        }
                      >
                        {item.ctaChooser.label}
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureC2List;
