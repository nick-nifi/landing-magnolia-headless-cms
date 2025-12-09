import { Typography } from '@/components/typography';
import Link from 'next/link';

export interface TabLinkItem {
  label: string;
  href: string;
}

interface TabLinksProps {
  items: TabLinkItem[];
}

const TabLinks = ({ items }: TabLinksProps) => {
  if (!items || items.length === 0) return null;

  return (
    <div className='bg-white border-b border-gray-200'>
      <div className='container mx-auto'>
        <div className='flex space-x-8 overflow-x-auto'>
          {items.map((item, index) => (
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
