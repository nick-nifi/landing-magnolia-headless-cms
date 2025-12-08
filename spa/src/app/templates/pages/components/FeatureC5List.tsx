import React from 'react';
import { Typography } from '@/components/typography';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CtaChooser {
  label: string;
  isExternal: boolean;
  href: string;
}

export interface FeatureC5Item {
  title: string;
  description: string;
  ctaChooser?: CtaChooser;
}

interface FeatureC5ListProps {
  title: string;
  c5Items: FeatureC5Item[];
}

const FeatureC5List: React.FC<FeatureC5ListProps> = ({ title, c5Items }) => {
  return (
    <section className='py-12 lg:py-16'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <div className='bg-primary/10 text-primary w-fit mx-auto px-4 py-1 rounded-full text-sm font-medium mb-4'>
            Section Padding/padding-section-medium
          </div>
          <Typography variant='h2' weight='light'>
            {title}
          </Typography>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {c5Items?.map((item, index) => (
            <Card
              key={index}
              className='border-none shadow-none bg-transparent'
            >
              <CardHeader className='p-0 mb-4'>
                <CardTitle className='text-xl font-medium'>
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className='p-0 mb-6'>
                <div
                  className='text-muted-foreground'
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </CardContent>
              <CardFooter className='p-0'>
                {item.ctaChooser && (
                  <Link
                    href={item.ctaChooser.href || '#'}
                    target={item.ctaChooser.isExternal ? '_blank' : undefined}
                    className='text-primary hover:underline inline-flex items-center gap-2'
                  >
                    {item.ctaChooser.label} <ArrowRight className='w-4 h-4' />
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureC5List;
