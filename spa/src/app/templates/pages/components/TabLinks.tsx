'use client';

import { Typography } from '@/components/typography';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface TabLinkItem {
  label: string;
  href: string;
}

export interface TabLinkGroup {
  title?: string;
  items?: TabLinkItem[];
}

interface TabLinksProps {
  groups: TabLinkGroup[];
}

const TabLinks = ({ groups }: TabLinksProps) => {
  const pathname = usePathname();

  // Flatten all links from all groups into a single list
  let allLinks = groups ? groups.flatMap((group) => group.items || []) : [];

  if (allLinks.length === 0) {
    allLinks = [
      {
        label: 'Private wealth management',
        href: '/research/private-wealth-management',
      },
      { label: 'Major markets', href: '/research/major-markets' },
      { label: 'Sectors', href: '/research/sectors' },
      { label: 'Companies', href: '/research/companies' },
    ];
  }

  return (
    <div className='container pt-12 md:pt-16'>
      <div className='flex border-b overflow-x-auto no-scrollbar gap-2'>
        {allLinks.map((item, index) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={index}
              href={item.href}
              className={cn(
                'min-w-[200px] md:min-w-0 md:w-1/4 text-center pb-4 px-1 border-b-2 transition-colors whitespace-nowrap cursor-pointer hover:border-b-primary transition-color duration-200',
                isActive ? 'border-primary text-primary' : ''
              )}
            >
              <Typography variant='h5' weight={isActive ? 'bold' : 'medium'}>
                {item.label}
              </Typography>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TabLinks;
