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
import { ArrowRight, ExternalLink } from 'lucide-react';
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
}

const FeatureC2List: React.FC<FeatureC2ListProps> = ({ title, c2Items }) => {
  return (
    <section className='py-12 lg:py-16'>
      <div className='container mx-auto px-4'>
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
              <Card key={index} className='gap-0'>
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
                        {item.ctaChooser.isExternal ? (
                          <ExternalLink />
                        ) : (
                          <ArrowRight className='w-4 h-4' />
                        )}
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
