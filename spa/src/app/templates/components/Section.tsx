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
    <section className={cn('container py-12 lg:py-28', customClass)}>
      {content && <EditableArea content={content} />}
    </section>
  );
};

export default Section;
