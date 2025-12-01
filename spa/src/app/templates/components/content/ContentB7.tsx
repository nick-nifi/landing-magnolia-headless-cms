import React from 'react';
import { cn } from '@/lib/utils';

interface IContentB7Props {
  text: string;
  customClass?: string;
}

const ContentB7: React.FC<IContentB7Props> = ({ text, customClass = '' }) => {
  return (
    <section
      data-name='B7 / Content / Divider'
      className={cn(
        'bg-[#dbe0e4] border-l-[10px] border-l-[#c33b32]',
        customClass
      )}
    >
      <div className='px-4 md:px-20 lg:px-[160px] py-16 lg:py-[112px]'>
        <div className='flex flex-col gap-20 items-start justify-center max-w-[1280px] mx-auto w-full'>
          <div className='flex gap-16 items-center w-full lg:w-[930px]'>
            <div className='flex flex-col gap-8 w-full'>
              <p 
                className='font-serif italic text-2xl lg:text-[40px] leading-[1.5] tracking-[-0.4px] text-black'
                style={{ fontFamily: "'Libre Baskerville', serif" }}
              >
                {text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentB7;
