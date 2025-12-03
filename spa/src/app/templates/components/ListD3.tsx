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
      className='bg-white border border-[#e6e7e8] border-l-[10px] box-border flex flex-col items-start px-8 py-0 relative w-full'
    >
      <div className='flex items-center justify-between w-full gap-4'>
        {/* Report Column */}
        <div className='flex flex-row items-center self-stretch w-[20%] min-w-[150px]'>
          <div className='flex flex-col gap-4 h-full items-start px-0 py-5 relative w-full'>
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
        <div className='flex flex-row items-center self-stretch flex-1 min-w-[200px]'>
          <div className='flex flex-col gap-4 h-full items-start px-0 py-5 relative w-full'>
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
        <div className='flex flex-row items-center self-stretch w-[15%] min-w-[120px]'>
          <div className='flex flex-col gap-4 h-full items-start px-0 py-5 relative w-full'>
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
        <div className='flex flex-row items-center self-stretch w-[10%] min-w-[100px]'>
          <div className='flex flex-col gap-4 h-full items-start px-0 py-5 relative w-full'>
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

