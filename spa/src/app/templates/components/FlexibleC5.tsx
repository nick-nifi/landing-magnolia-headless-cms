import React from 'react';

import { decodeIfEscaped } from '../../services/content-service';
import { Card, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Link {
  link: {
    '@link': string;
    '@path': string;
    '@uuid': string;
    '@name': string;
  };
  label: string;
}

interface IFlexibleC5Props {
  title: string;
  description: string;
  schedule?: string;
  link?: Link;
}

const FlexibleC5: React.FC<IFlexibleC5Props> = ({
  title,
  description,
  schedule,
  link,
}) => {
  return (
    <Card className='shadow-lg h-full'>
      <CardContent className='gap-0 flex flex-col flex-1 justify-between'>
        <div className='mb-6'>
          <Typography variant={'h4'} weight={'medium'} className='mb-4'>
            {title}
          </Typography>
          <Typography
            variant={'body-large'}
            weight={'light'}
            className='mb-4'
            dangerouslySetInnerHTML={{ __html: decodeIfEscaped(description) }}
          />
          {schedule && (
            <Typography
              variant={'body-small'}
              weight={'semibold'}
              dangerouslySetInnerHTML={{ __html: decodeIfEscaped(schedule) }}
            />
          )}
        </div>

        <div>
          <Button asChild variant={'link'} style={{ paddingLeft: 0 }}>
            <Link href={(link?.link['@path'] as string) || '#'} target='_blank'>
              {link?.label} <ArrowRight />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
  // return (
  //   <div className='h-full w-full bg-white p-6 shadow-lg md:p-8 lg:p-10'>
  //     <div className='flex h-full flex-col justify-between'>
  //       <div>
  //         {title && (
  //           <h3 className='mb-6 text-2xl font-bold text-slate-700 md:text-3xl lg:mb-8 lg:text-4xl'>
  //             {title}
  //           </h3>
  //         )}
  //         {description && (
  //           <div
  //             className='mb-6 text-base font-light text-slate-600 md:text-lg lg:mb-8'
  //             dangerouslySetInnerHTML={{
  //               __html: decodeIfEscaped(description),
  //             }}
  //           />
  //         )}
  //         {schedule && (
  //           <div
  //             className='mb-8 text-sm font-bold text-slate-700 md:text-base'
  //             dangerouslySetInnerHTML={{
  //               __html: decodeIfEscaped(schedule),
  //             }}
  //           />
  //         )}
  //       </div>

  //       {link && link.link && (
  //         <a
  //           href={link.link['@link']}
  //           className='group flex items-center text-lg font-medium text-red-500 hover:text-red-600'
  //         >
  //           {link.label}
  //           <svg
  //             xmlns='http://www.w3.org/2000/svg'
  //             fill='none'
  //             viewBox='0 0 24 24'
  //             strokeWidth={1.5}
  //             stroke='currentColor'
  //             className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1'
  //           >
  //             <path
  //               strokeLinecap='round'
  //               strokeLinejoin='round'
  //               d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
  //             />
  //           </svg>
  //         </a>
  //       )}
  //     </div>
  //   </div>
  // );
};

export default FlexibleC5;
