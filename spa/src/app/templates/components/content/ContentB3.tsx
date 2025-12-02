import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ListItem {
  itemText: string;
  '@name'?: string;
  '@path'?: string;
  '@id'?: string;
  '@nodeType'?: string;
}

interface CtaChooser {
  field?: 'noCta' | 'withCta';
  ctaText?: string;
  ctaLink?: {
    field?: 'internalPageLink' | 'externalPageLink';
    internalLink?: string;
    externalLink?: string;
  };
}

interface IContentB3Props {
  title: string;
  description?: string;
  listItems?: ListItem[] | Record<string, ListItem>;
  ctaChooser?: CtaChooser;
  customClass?: string;
}

// Helper function to convert Magnolia object to array
const getListItemsArray = (items: ListItem[] | Record<string, ListItem> | undefined): ListItem[] => {
  if (!items) return [];
  if (Array.isArray(items)) return items.filter(item => item && item.itemText);
  
  // Convert object to array, filtering out metadata keys and invalid items
  return Object.entries(items)
    .filter(([key, value]) => {
      // Skip metadata keys
      if (key.startsWith('@')) return false;
      // Skip if value is not an object or doesn't have itemText
      if (!value || typeof value !== 'object') return false;
      if (!value.itemText) return false;
      return true;
    })
    .map(([, value]) => value);
};

const ContentB3: React.FC<IContentB3Props> = ({
  title,
  description,
  listItems,
  ctaChooser,
  customClass = '',
}) => {
  const items = getListItemsArray(listItems);

  // Get CTA link - same logic as B1/B2
  const getCtaLink = (): string => {
    if (!ctaChooser || ctaChooser.field !== 'withCta' || !ctaChooser.ctaLink) {
      return '';
    }
    if (ctaChooser.ctaLink.field === 'externalPageLink') {
      return ctaChooser.ctaLink.externalLink || '';
    }
    if (ctaChooser.ctaLink.field === 'internalPageLink') {
      return ctaChooser.ctaLink.internalLink || '';
    }
    return '';
  };

  const ctaLink = getCtaLink();
  const ctaText = ctaChooser?.field === 'withCta' ? ctaChooser.ctaText : '';

  const renderButton = () => {
    if (!ctaText) return null;

    return (
      <Button
        variant={'outline'}
        className='border-[#c33b32] text-[#c33b32] hover:bg-[#c33b32] hover:text-white h-[42px] px-2.5 py-1.5 w-fit text-[20px]'
        asChild={!!ctaLink}
      >
        {ctaLink ? (
          <Link href={ctaLink} className='flex items-center gap-2.5'>
            {ctaText} <ArrowRight className='w-4 h-4' />
          </Link>
        ) : (
          <span className='flex items-center gap-2.5'>
            {ctaText} <ArrowRight className='w-4 h-4' />
          </span>
        )}
      </Button>
    );
  };

  return (
    <section
      data-name='B3 / Content'
      className={cn('bg-white py-16 px-4 md:px-20 lg:px-[160px]', customClass)}
    >
      <div className='flex flex-col gap-8 items-end max-w-[1280px] mx-auto w-full'>
        <div className='flex flex-col lg:flex-row gap-8 lg:gap-16 items-start w-full'>
          {/* Left Content - Title & Description */}
          <div className='flex flex-col gap-8 w-full lg:w-[551px] lg:shrink-0'>
            <div className='flex flex-col gap-8 w-full'>
              <div className='flex flex-col gap-4 w-full'>
                <div className='flex flex-col gap-6 text-[#3f4c54] w-full'>
                  <h2 className='font-light text-3xl lg:text-[40px] leading-[1.2] tracking-[-0.4px]'>
                    {title}
                  </h2>
                  {description && (
                    <p className='font-light text-lg lg:text-[20px] leading-[1.5]'>
                      {description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right List - Bullet Points */}
          <div className='flex flex-col gap-2.5 w-full lg:w-[506px] lg:shrink-0 text-[#3f4c54] text-lg lg:text-[20px] tracking-[-0.2px]'>
            {items.map((item, index) => (
              <ul key={index} className='block w-full list-disc'>
                <li className='ms-[30px]'>
                  <span className='font-medium leading-[1.4]'>
                    {item.itemText}
                  </span>
                </li>
              </ul>
            ))}
          </div>
        </div>

        {/* CTA Button - Optional, aligned right */}
        {renderButton() && (
          <div className='shrink-0'>
            {renderButton()}
          </div>
        )}
      </div>
    </section>
  );
};

export default ContentB3;
