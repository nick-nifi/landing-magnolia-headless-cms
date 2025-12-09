import { decodeIfEscaped } from '@/app/services/content-service';
import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

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
      <div className='container'>
        {title && (
          <div className='text-center mb-12 md:mb-16 lg:mb-20'>
            <Typography variant='h2' weight='light'>
              {title}
            </Typography>
          </div>
        )}

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {c5Items?.map((item, index) => (
            <Card
              key={index}
              className='gap-0 border shadow-sm bg-card hover:shadow-md transition-shadow duration-200 flex flex-col h-full overflow-hidden'
            >
              <CardHeader className='pt-5'>
                <Typography variant='h4' weight='medium'>
                  {item.title}
                </Typography>
              </CardHeader>
              <CardContent className='gap-0 flex flex-col flex-1 justify-between pb-6'>
                <Typography
                  variant='body-large'
                  weight='light'
                  dangerouslySetInnerHTML={{
                    __html: decodeIfEscaped(item.description),
                  }}
                />
              </CardContent>
              <CardFooter className='pb-6'>
                {item.ctaChooser && (
                  <Button asChild variant={'link'} style={{ paddingLeft: '0' }}>
                    <Link
                      href={item.ctaChooser.href || '#'}
                      target={item.ctaChooser.isExternal ? '_blank' : undefined}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureC5List;
