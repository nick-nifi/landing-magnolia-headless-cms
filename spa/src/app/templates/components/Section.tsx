import React from 'react';
import { EditableArea } from '@magnolia/react-editor';
import { MgnlContent } from '@magnolia/frontend-helpers-base';

interface ISectionProps {
  content?: MgnlContent;
}

const Section: React.FC<ISectionProps> = ({ content }) => {
  return (
    <section className='py-12 md:py-16 lg:py-28'>
      {content && <EditableArea content={content} />}
    </section>
  );
};

export default Section;
