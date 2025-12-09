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
          <Typography variant='h2' className='mb-8 text-center'>
            {title}
          </Typography>
        )}

        <div className='bg-white shadow-sm rounded-md overflow-hidden'>
          {/* Header - Hidden on mobile, visible on desktop */}
          <div className='hidden md:grid grid-cols-12 gap-4 p-6 border-b border-gray-100 text-uobkh-red font-semibold'>
            <div className='col-span-3'>Report</div>
            <div className='col-span-5'>Description</div>
            <div className='col-span-2'>Report Date</div>
            <div className='col-span-2'>Length</div>
          </div>

          {/* Items */}
          <div className='divide-y divide-gray-100'>
            {items.map((item, index) => (
              <div
                key={index}
                className='grid grid-cols-1 md:grid-cols-12 gap-4 p-6 hover:bg-gray-50 transition-colors'
              >
                <div className='col-span-12 md:col-span-3'>
                  <span className='md:hidden text-uobkh-red font-semibold block mb-1'>
                    Report
                  </span>
                  <Typography
                    variant='body-large'
                    className='font-bold text-gray-800'
                  >
                    {item.reportTitle}
                  </Typography>
                </div>
                <div className='col-span-12 md:col-span-5'>
                  <span className='md:hidden text-uobkh-red font-semibold block mb-1'>
                    Description
                  </span>
                  <Typography variant='body-small' className='text-gray-600'>
                    {item.description}
                  </Typography>
                </div>
                <div className='col-span-6 md:col-span-2'>
                  <span className='md:hidden text-uobkh-red font-semibold block mb-1'>
                    Report Date
                  </span>
                  <Typography variant='body-small' className='text-gray-600'>
                    {item.reportDate}
                  </Typography>
                </div>
                <div className='col-span-6 md:col-span-2'>
                  <span className='md:hidden text-uobkh-red font-semibold block mb-1'>
                    Length
                  </span>
                  <Typography variant='body-small' className='text-gray-600'>
                    {item.length}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListD3List;
