import { Typography } from '@/components/typography';
import Link from 'next/link';

export interface TabLinkItem {
  label: string;
  href: string;
}

export interface TabLinkGroup {
  title?: string;
  tabLinks?: TabLinkItem[];
}

interface TabLinksProps {
  groups: TabLinkGroup[];
}

const TabLinks = ({ groups }: TabLinksProps) => {
  if (!groups || groups.length === 0) return null;

  // Flatten all links from all groups into a single list
  const allLinks = groups.flatMap((group) => group.tabLinks || []);

  if (allLinks.length === 0) return null;

  return (
    <div className='bg-white border-b border-gray-200'>
      <div className='container mx-auto'>
        <div className='flex space-x-8 overflow-x-auto'>
          {allLinks.map((item, index) => (
            <Link
              key={index}
              href={item.href || '#'}
              className='py-4 px-1 border-b-2 border-transparent hover:border-uobkh-red text-uobkh-dark-grey hover:text-uobkh-red transition-colors whitespace-nowrap'
            >
              <Typography variant='body-small' weight='medium'>
                {item.label}
              </Typography>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabLinks;
