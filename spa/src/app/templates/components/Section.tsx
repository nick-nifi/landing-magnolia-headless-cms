import React from 'react';
import { EditableArea } from '@magnolia/react-editor';
import { MgnlContent } from '@magnolia/frontend-helpers-base';
import { cn } from '@/lib/utils';

interface ISectionProps {
  content?: MgnlContent;
  customClass?: string;
}

const Section: React.FC<ISectionProps> = ({ content, customClass }) => {
  return (
    <section className={cn('py-12 md:py-16 lg:py-28', customClass)}>
      <div className='container mx-auto px-2 lg:px-0'>
        {content && <EditableArea content={content} />}
      </div>
    </section>
  );
};

export default Section;
