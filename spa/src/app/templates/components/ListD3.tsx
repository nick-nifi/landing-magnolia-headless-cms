import { Typography } from '@/components/typography';
import React from 'react';

interface IListD3Props {
  reportName: string;
  description: string;
  reportDate: string;
  length: string;
}

const ListD3: React.FC<IListD3Props> = ({
  reportName,
  description,
  reportDate,
  length,
}) => {
  return (
    <div
      data-name='D3 / List / Table'
      className='bg-white border-[1px_1px_1px_10px] border-[#e6e7e8] flex flex-col gap-20 items-start max-w-[1280px] px-8 py-0 relative w-[1120px]'
    >
      <div className='flex items-center justify-between w-full'>
        {/* Report Column */}
        <div className='flex flex-row items-center self-stretch'>
          <div className='flex flex-col gap-4 h-full items-start px-0 py-5 relative shrink-0 w-[219px]'>
            <Typography
              variant='h5'
              weight='medium'
              className='leading-[1.4] text-[#c33b32] text-[20px] tracking-[-0.2px]'
            >
              Report
            </Typography>
            <Typography
              variant='body-large'
              weight='bold'
              className='leading-[1.5] text-[#3f4c54] text-[20px]'
            >
              {reportName}
            </Typography>
          </div>
        </div>

        {/* Description Column */}
        <div className='flex flex-row items-center self-stretch'>
          <div className='flex flex-col gap-4 h-full items-start px-0 py-5 relative shrink-0 w-[463px]'>
            <Typography
              variant='h5'
              weight='medium'
              className='leading-[1.4] text-[#c33b32] text-[20px] tracking-[-0.2px]'
            >
              Description
            </Typography>
            <Typography
              variant='body-large'
              weight='light'
              className='leading-[1.5] text-[#3f4c54] text-[20px]'
            >
              {description}
            </Typography>
          </div>
        </div>

        {/* Report Date Column */}
        <div className='flex flex-row items-center self-stretch'>
          <div className='flex flex-col gap-4 h-full items-start px-0 py-5 relative shrink-0 w-[169px]'>
            <Typography
              variant='h5'
              weight='medium'
              className='leading-[1.4] text-[#c33b32] text-[20px] tracking-[-0.2px]'
            >
              Report Date
            </Typography>
            <Typography
              variant='body-large'
              weight='light'
              className='leading-[1.5] text-[#3f4c54] text-[20px]'
            >
              {reportDate}
            </Typography>
          </div>
        </div>

        {/* Length Column */}
        <div className='flex flex-row items-center self-stretch'>
          <div className='flex flex-col gap-4 h-full items-start px-0 py-5 relative shrink-0 w-[119px]'>
            <Typography
              variant='h5'
              weight='medium'
              className='leading-[1.4] text-[#c33b32] text-[20px] tracking-[-0.2px]'
            >
              Length
            </Typography>
            <Typography
              variant='body-large'
              weight='light'
              className='leading-[1.5] text-[#3f4c54] text-[20px]'
            >
              {length}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListD3;

