import { decodeIfEscaped } from '@/app/services/content-service';
import { Typography } from '@/components/typography';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { SafeImage } from '@/components/ui/safe-image';
import { environment } from '@/environments/environment';
import { cn } from '@/lib/utils';
import React from 'react';

interface CtaChooser {
  label: string;
  isExternal: boolean;
  href: string;
}

interface DownloadListItem {
  title: string;
  content: string;
}

export interface FeatureC10Item {
  title: string;
  image?: string;
  downloadLists?: DownloadListItem[];
  ctaChooser?: CtaChooser;
}

interface FeatureC10ListProps {
  title: string;
  items: FeatureC10Item[];
  className?: string; // Added standard prop
  customClass?: string; // Added standard prop
}

const FeatureC10List: React.FC<FeatureC10ListProps> = ({
  title,
  items,
  className,
  customClass,
}) => {
  return (
    <section
      className={cn('py-12 lg:py-16 bg-background', className, customClass)}
    >
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <Typography variant='h2' weight='light' className='text-center'>
            {title}
          </Typography>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {items?.map((item, index) => {
            const imageUrl = item.image
              ? `${environment.damRawBase}/magnoliaAuthor/dam/${item.image}`
              : '';
            return (
              <Card
                key={index}
                className='border shadow-sm bg-card hover:shadow-md transition-shadow duration-200 flex flex-col h-full overflow-hidden'
              >
                <div className='relative aspect-[55/31] w-full bg-muted'>
                  {imageUrl && (
                    <SafeImage
                      src={imageUrl}
                      alt={item.title}
                      fill
                      className='object-cover'
                    />
                  )}
                </div>
                <CardHeader className='mb-5'>
                  <Typography
                    variant='h4'
                    className='text-primary'
                    weight={'medium'}
                  >
                    {item.title}
                  </Typography>
                </CardHeader>
                <CardContent className='p-0 flex-grow'>
                  {item.downloadLists && item.downloadLists.length > 0 && (
                    <div className='flex flex-col'>
                      {item.downloadLists.map((dl, idx) => (
                        <Accordion
                          type='single'
                          collapsible
                          className='w-full'
                          key={idx}
                        >
                          <AccordionItem value={`item-${idx}`}>
                            <AccordionTrigger className='py-3 px-6 hover:bg-muted/50 transition-colors'>
                              <Typography variant='h5'>{dl.title}</Typography>
                            </AccordionTrigger>
                            <AccordionContent className='py-3 px-6'>
                              {decodeIfEscaped(dl.content)}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureC10List;
