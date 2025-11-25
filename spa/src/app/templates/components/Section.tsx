import React from 'react';
import { EditableArea } from '@magnolia/react-editor';
import { MgnlContent } from '@magnolia/frontend-helpers-base';

interface ISectionProps {
  content?: MgnlContent;
}

const Section: React.FC<ISectionProps> = ({ content }) => {
  return (
    <section className='py-12 md:py-16 lg:py-28'>
      <div className='container mx-auto px-2 lg:px-0'>
        {content && <EditableArea content={content} />}
      </div>
    </section>
  );
};

export default Section;
