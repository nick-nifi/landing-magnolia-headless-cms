import React from 'react';
import { EditableArea } from '@magnolia/react-editor';
import { MgnlContent } from '@magnolia/frontend-helpers-base';
import { Typography } from '@/components/typography';
import { cn } from '@/lib/utils';

interface ISectionProps {
  title?: string;
  subtitle?: string;
  content?: MgnlContent;
}

const Section: React.FC<ISectionProps> = ({ title, subtitle, content }) => {
  return (
    <section className='py-12 md:py-16 lg:py-28'>
      <div className='container mx-auto px-4'>
        {(title || subtitle) && (
          <div className='mb-12 md:mb-16 lg:mb-20 text-center'>
            {title && (
              <Typography
                variant={'h2'}
                className={cn('text-center', { 'mb-2': !!subtitle })}
                weight={'light'}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography
                variant={'body-small'}
                className='text-center'
                weight={'light'}
              >
                {subtitle}
              </Typography>
            )}
          </div>
        )}

        {content && <EditableArea content={content} />}
      </div>
    </section>
  );
};

export default Section;
