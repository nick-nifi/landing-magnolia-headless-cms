import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ListItem {
  itemText: string;
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
  listItems?: ListItem[];
  ctaChooser?: CtaChooser;
}

const ContentB3: React.FC<IContentB3Props> = ({
  title,
  description,
  listItems = [],
  ctaChooser,
}) => {
  // Get CTA link
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
        className='border-[#c33b32] text-[#c33b32] hover:bg-[#c33b32] hover:text-white'
        asChild={!!ctaLink}
      >
        {ctaLink ? (
          <Link href={ctaLink}>
            {ctaText} <ArrowRight className='rotate-90' />
          </Link>
        ) : (
          <>
            {ctaText} <ArrowRight className='rotate-90' />
          </>
        )}
      </Button>
    );
  };

  return (
    <div
      data-name='B3 / Content'
      className='flex flex-col gap-8 items-end max-w-[1280px] w-full'
    >
      <div className='flex gap-16 items-start w-full'>
        {/* Left Content */}
        <div className='flex flex-col gap-8 items-start w-[551px]'>
          <div className='flex flex-col gap-8 items-start w-full'>
            <div className='flex flex-col gap-4 items-start w-full'>
              <div className='flex flex-col gap-6 items-start text-[#3f4c54] w-full'>
                <Typography
                  variant='h2'
                  weight='light'
                  className='text-[40px] leading-[1.2] tracking-[-0.4px]'
                >
                  {title}
                </Typography>
                {description && (
                  <Typography
                    variant='body-large'
                    weight='light'
                    className='text-[20px] leading-[1.5]'
                  >
                    {description}
                  </Typography>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right List */}
        <div className='flex flex-col gap-[10px] items-start self-stretch shrink-0 text-[#3f4c54] text-[20px] tracking-[-0.2px] w-[506px]'>
          {listItems.map((item, index) => (
            <ul key={index} className='block relative shrink-0 w-full'>
              <li className='ms-[30px]'>
                <Typography
                  variant='h5'
                  weight='medium'
                  className='leading-[1.4]'
                >
                  {item.itemText}
                </Typography>
              </li>
            </ul>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      {renderButton() && (
        <div className='relative shrink-0'>{renderButton()}</div>
      )}
    </div>
  );
};

export default ContentB3;

