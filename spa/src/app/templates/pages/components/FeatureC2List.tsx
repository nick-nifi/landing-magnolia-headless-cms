import React from 'react';
import { Typography } from '@/components/typography';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { SafeImage } from '@/components/ui/safe-image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { environment } from '@/environments/environment';

interface CtaChooser {
  label: string;
  isExternal: boolean;
  href: string;
}

export interface FeatureC2Item {
  title: string;
  description: string;
  tag?: string;
  image?: {
    '@link': string;
  };
  ctaChooser?: CtaChooser;
}

interface FeatureC2ListProps {
  title: string;
  c2Items: FeatureC2Item[];
}

const FeatureC2List: React.FC<FeatureC2ListProps> = ({ title, c2Items }) => {
  return (
    <section className='py-12 lg:py-16 bg-muted/50'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <Typography variant='h2' weight='light'>
            {title}
          </Typography>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {c2Items?.map((item, index) => {
            const imageUrl = item.image
              ? environment.damRawBase + item.image['@link']
              : '';
            return (
              <Card
                key={index}
                className='overflow-hidden border-none shadow-sm flex flex-col h-full'
              >
                <div className='relative h-48 w-full'>
                  {imageUrl && (
                    <SafeImage
                      src={imageUrl}
                      alt={item.title}
                      fill
                      className='object-cover'
                    />
                  )}
                  {item.tag && (
                    <div className='absolute bottom-0 left-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium uppercase'>
                      {item.tag}
                    </div>
                  )}
                </div>
                <CardHeader className='pt-6'>
                  <h3 className='text-xl font-semibold leading-tight'>
                    {item.title}
                  </h3>
                </CardHeader>
                <CardContent className='flex-grow'>
                  <div
                    className='text-muted-foreground text-sm line-clamp-3'
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </CardContent>
                <CardFooter className='pb-6'>
                  {item.ctaChooser && (
                    <Link
                      href={item.ctaChooser.href}
                      target={item.ctaChooser.isExternal ? '_blank' : undefined}
                      className='text-primary hover:underline inline-flex items-center gap-2 text-sm font-medium'
                    >
                      {item.ctaChooser.label} <ArrowRight className='w-4 h-4' />
                    </Link>
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
