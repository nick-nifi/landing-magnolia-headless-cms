import { Typography } from '@/components/typography';
import React from 'react';

interface IContentB7Props {
  text: string;
}

const ContentB7: React.FC<IContentB7Props> = ({ text }) => {
  return (
    <section className='py-16 md:py-18 lg:py-28 border-l border-l-10 border-l-primary bg-muted-foreground'>
      <div className='container mx-auto px-2 lg:px-0'>
        <Typography variant={'hero-small-heading'}>{text}</Typography>
      </div>
    </section>
  );
};

export default ContentB7;
