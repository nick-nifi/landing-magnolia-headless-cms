'use client';

import { Typography } from '@/components/typography';
import React from 'react';
import { ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight } from 'lucide-react';

interface Page {
  pageNumber: string;
  isActive?: boolean;
}

interface IPaginationJProps {
  showFirstPage?: boolean;
  showPreviousPage?: boolean;
  pages?: Page[];
  showNextPage?: boolean;
  showLastPage?: boolean;
}

const PaginationJ: React.FC<IPaginationJProps> = ({
  showFirstPage = true,
  showPreviousPage = true,
  pages = [],
  showNextPage = true,
  showLastPage = true,
}) => {
  const renderPageButton = (page: Page, index: number) => {
    const isActive = page.isActive || false;
    
    return (
      <div
        key={index}
        className={`flex items-center justify-center relative size-[35px] ${
          isActive
            ? 'bg-[#c33b32] rounded-full'
            : 'bg-transparent'
        }`}
      >
        <Typography
          variant='body-small'
          weight='light'
          className={`text-center text-[16px] leading-[24px] ${
            isActive ? 'text-white' : 'text-[#3f4c54]'
          }`}
        >
          {page.pageNumber}
        </Typography>
      </div>
    );
  };

  const renderNavButton = (
    icon: React.ReactNode,
    label: string,
    show: boolean
  ) => {
    if (!show) return null;

    return (
      <div className='flex items-center justify-center relative size-[35px]'>
        {icon}
      </div>
    );
  };

  return (
    <div
      data-name='J / Pagination'
      className='flex gap-[7px] h-[35px] items-start justify-center w-full'
    >
      {/* First Page Button */}
      {renderNavButton(
        <div className='flex-none rotate-180'>
          <ChevronsRight className='size-[15.937px] text-[#3f4c54]' />
        </div>,
        'First page',
        showFirstPage
      )}

      {/* Previous Page Button */}
      {renderNavButton(
        <div className='flex-none rotate-180'>
          <ChevronRight className='size-[15.937px] text-[#3f4c54]' />
        </div>,
        'Previous page',
        showPreviousPage
      )}

      {/* Page Numbers */}
      {pages.map((page, index) => renderPageButton(page, index))}

      {/* Next Page Button */}
      {renderNavButton(
        <div className='flex-none rotate-90'>
          <ChevronRight className='size-[15.937px] text-[#3f4c54]' />
        </div>,
        'Next page',
        showNextPage
      )}

      {/* Last Page Button */}
      {renderNavButton(
        <div className='flex-none rotate-90'>
          <ChevronsRight className='size-[15.937px] text-[#3f4c54]' />
        </div>,
        'Last page',
        showLastPage
      )}
    </div>
  );
};

export default PaginationJ;

