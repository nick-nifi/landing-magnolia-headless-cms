import { decodeIfEscaped } from '@/app/services/content-service';
import { Typography } from '@/components/typography';
import React from 'react';

interface ListD2Props {
  title?: string;
  bulletPoints?: string;
}

const ListD2: React.FC<ListD2Props> = ({
  title = '',
  bulletPoints = '',
}) => {
  // Render bullet points - if HTML contains <li> tags, render as-is, otherwise wrap in <ul>
  const renderBulletPoints = (html: string) => {
    if (!html) return '';
    const decoded = decodeIfEscaped(html);
    // Check if the HTML already contains <ul> or <li> tags
    if (decoded.includes('<li>') || decoded.includes('<ul>')) {
      return decoded;
    }
    // If it's plain text, wrap each line in <li> tags
    const lines = decoded.split('\n').filter(line => line.trim().length > 0);
    return `<ul>${lines.map(line => `<li>${line.trim()}</li>`).join('')}</ul>`;
  };

  const bulletPointsHtml = renderBulletPoints(bulletPoints);

  return (
    <div
      data-name='D2 / List Item'
      className='bg-white border border-[#e6e7e8] flex gap-16 items-center w-full'
    >
      {/* Left Panel - Title */}
      <div className='flex flex-row items-center self-stretch'>
        <div className='bg-[#dbe0e4] border-l-[10px] border-l-[#c33b32] flex gap-[10px] h-full items-center justify-center px-0 py-5 w-[434px]'>
          <div className='flex flex-col font-medium h-full justify-center leading-[0] text-[#3f4c54] text-[28px] text-center tracking-[-0.28px] w-[404px]'>
            <Typography
              variant='h4'
              weight='medium'
              className='leading-[1.2]'
            >
              {title}
            </Typography>
          </div>
        </div>
      </div>

      {/* Right Panel - Bullet Points */}
      <div className='flex flex-col gap-4 items-start px-5 py-5 flex-1'>
        <div
          className='block font-light text-[#3f4c54] text-[16px] w-full 
          [&_ul]:list-disc [&_ul]:m-0 [&_ul]:p-0 [&_ul]:pl-5
          [&_li]:mb-1.5 [&_li]:leading-[1.6] [&_li:last-child]:mb-0 
          [&_p]:leading-[1.6] [&_p]:m-0 [&_p]:text-[16px]
          [&_span]:leading-[1.6] [&_span]:text-[16px]
          [&_strong]:font-medium'
          dangerouslySetInnerHTML={{ __html: bulletPointsHtml }}
        />
      </div>
    </div>
  );
};

export default ListD2;
