import { decodeIfEscaped } from '@/app/services/content-service';
import { Typography } from '@/components/typography';

interface ListD1Props {
  title: string;
  description?: string;
}

const ListD1 = ({
  title,
  description = '',
}: ListD1Props) => {
  return (
    <div className='bg-white border border-[#e6e7e8] flex items-stretch w-full'>
      {/* Title Section - Red background with left border */}
      <div className='bg-[#c33b32] border-l-[10px] border-l-[#dbe0e4] flex items-center justify-center py-5 px-4 w-[350px] lg:w-[434px] shrink-0'>
        <Typography 
          variant={'h4'} 
          weight={'medium'} 
          className='text-white text-center text-[28px] leading-[1.2] tracking-[-0.28px]'
        >
          {title}
        </Typography>
      </div>
      
      {/* Description Section - Bullet list */}
      <div className='flex-1 py-5 px-8 lg:px-16 flex items-center'>
        <div 
          className='text-[#3f4c54] text-[20px] font-light leading-[1.5] [&_ul]:list-disc [&_ul]:ml-6 [&_li]:mb-1 [&_li:last-child]:mb-0'
          dangerouslySetInnerHTML={{ __html: decodeIfEscaped(description) }}
        />
      </div>
    </div>
  );
};

export default ListD1;
