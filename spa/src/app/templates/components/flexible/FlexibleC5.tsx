import React from 'react';

import { decodeIfEscaped } from '../../../services/content-service';
import { Card, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { environment } from '@/environments/environment';

interface CtaLink {
  field?: 'internalPageLink' | 'externalPageLink';
  internalLink?: string;
  externalLink?: string;
}

interface CtaChooser {
  field?: 'noCta' | 'withCta';
  ctaText?: string;
  ctaLink?: CtaLink;
}

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
  ctaChooser?: CtaChooser;
  marginTop?: number | string;
}

const FlexibleC5: React.FC<IFlexibleC5Props> = ({
  title,
  description,
  schedule,
  ctaChooser,
  marginTop = 0,
}) => {
  const marginTopValue = typeof marginTop === 'string' ? parseInt(marginTop, 10) : marginTop;
  let ctaText = '';
  let linkHref = '';
  let isExternal = false;

  if (ctaChooser && ctaChooser.field === 'withCta') {
    ctaText = ctaChooser.ctaText || '';

    const ctaLink = ctaChooser.ctaLink;

    if (ctaLink) {
      if (ctaLink.field === 'internalPageLink' && ctaLink.internalLink) {
        const origin =
          typeof window !== 'undefined' ? window.location.origin : '';
        let link = ctaLink.internalLink;
        if (link.startsWith(environment.appBase)) {
          link = link.slice(environment.appBase.length);
          if (!link.startsWith('/')) {
            link = '/' + link;
          }
        }
        linkHref = `${origin}${link}`;
      } else if (ctaLink.field === 'externalPageLink' && ctaLink.externalLink) {
        linkHref = ctaLink.externalLink;
        isExternal = true;
      }
    }
  }

  return (
    <Card 
      className='shadow-md h-[220px] flex flex-col overflow-hidden border border-[#e6e7e8]' 
      style={{ marginTop: marginTopValue ? `${marginTopValue}px` : undefined }}
    >
      <CardContent className='flex flex-col p-5 overflow-hidden min-h-0 grow'>
        <div className='overflow-hidden min-h-0'>
          <Typography variant={'h4'} weight={'medium'} className='mb-2 line-clamp-3'>
            {title}
          </Typography>
          {description && (
            <Typography
              variant={'body-large'}
              weight={'light'}
              className='line-clamp-2'
              dangerouslySetInnerHTML={{ __html: decodeIfEscaped(description) }}
            />
          )}
          {schedule && (
            <Typography
              variant={'body-small'}
              weight={'semibold'}
              className='mt-2'
              dangerouslySetInnerHTML={{ __html: decodeIfEscaped(schedule) }}
            />
          )}
        </div>

        <div className='mt-auto pt-3 shrink-0'>
          {ctaChooser &&
            ctaChooser.field === 'withCta' &&
            ctaText &&
            linkHref && (
              <Button 
                asChild 
                variant={'link'} 
                className='text-[#c33b32] hover:text-[#c33b32]/80 h-auto px-0 text-[20px] font-normal'
              >
                <Link href={linkHref} target={isExternal ? '_blank' : undefined}>
                  {ctaText} <ArrowRight className='w-4 h-4' />
                </Link>
              </Button>
            )}
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
