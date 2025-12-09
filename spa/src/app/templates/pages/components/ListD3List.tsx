import { decodeIfEscaped } from '@/app/services/content-service';
import { Typography } from '@/components/typography';
import React from 'react';

export interface ListD3Item {
  reportTitle: string;
  description: string;
  reportDate: string;
  length: string;
}

interface ListD3ListProps {
  title?: string;
  items: ListD3Item[];
}

const ListD3List: React.FC<ListD3ListProps> = ({ title, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <section className='py-12 bg-gray-50'>
      <div className='container'>
        {title && (
          <Typography variant='h2' weight='light' className='mb-8 text-center'>
            {title}
          </Typography>
        )}

        <div className='flex flex-col gap-4'>
          {items.map((item, index) => (
            <ListD3Item {...item} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ListD3List;

export const ListD3Item = ({
  description,
  length,
  reportDate,
  reportTitle,
}: ListD3Item) => {
  return (
    <div
      data-name='list-d3-item'
      className='border-l border-l-10 border shadow hover:shadow-md transition-shadow duration-200 px-8 py-5'
    >
      <div className='grid grid-cols-1 md:grid-cols-6 gap-5'>
        <div>
          <Typography variant='h5' weight='medium' className='text-primary'>
            Report
          </Typography>
          <Typography variant='body-large' weight='bold'>
            {reportTitle}
          </Typography>
        </div>
        <div className='lg:col-span-3'>
          <Typography variant='h5' weight='medium' className='text-primary'>
            Description
          </Typography>
          <Typography
            variant='body-large'
            weight='light'
            dangerouslySetInnerHTML={{ __html: decodeIfEscaped(description) }}
          />
        </div>
        <div>
          <Typography variant='h5' weight='medium' className='text-primary'>
            Report Date
          </Typography>
          <Typography variant='body-large' weight='light'>
            {reportDate}
          </Typography>
        </div>
        <div>
          <Typography variant='h5' weight='medium' className='text-primary'>
            Length
          </Typography>
          <Typography variant='body-large' weight='light'>
            {length}
          </Typography>
        </div>
      </div>
    </div>
  );
};
