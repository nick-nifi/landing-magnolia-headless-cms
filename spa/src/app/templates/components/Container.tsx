import React from 'react';
import { EditableArea, EditableComponent } from '@magnolia/react-editor';
import { MgnlContent } from '@magnolia/frontend-helpers-base';
import { Typography } from '@/components/typography';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ContainerConfig {
  field: 'rows' | 'columns';
  count: number;
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

interface IContainerProps {
  container: ContainerConfig;
  title?: string;
  gap?: number | string;
  childGap?: number | string;
  backgroundColor?: string;
  paddingTop?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
  paddingRight?: number | string;
  ctaChooser?: CtaChooser;
  item1?: MgnlContent;
  item2?: MgnlContent;
  item3?: MgnlContent;
  item4?: MgnlContent;
  item5?: MgnlContent;
}

const Container: React.FC<IContainerProps> = ({
  container,
  title = '',
  gap = 20,
  childGap = 16,
  backgroundColor,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  ctaChooser,
  item1,
  item2,
  item3,
  item4,
  item5,
}) => {
  const getComponents = (content: MgnlContent | undefined) => {
    return content?.['@nodes']?.map((nodeName) => content[nodeName]) || [];
  };

  const isColumns = container.field === 'columns';
  const { count } = container;
  const items = [item1, item2, item3, item4, item5];

  // Fixed column widths based on count
  const getColumnClass = (columnCount: number): string => {
    switch (columnCount) {
      case 1:
        return 'w-full';
      case 2:
        return 'w-1/2';
      case 3:
        return 'w-1/3';
      case 4:
        return 'w-1/4';
      case 5:
        return 'w-1/5';
      default:
        return 'flex-1';
    }
  };

  const gapValue = typeof gap === 'string' ? parseInt(gap, 10) : gap;
  const childGapValue = typeof childGap === 'string' ? parseInt(childGap, 10) : childGap;
  
  const parsePadding = (value: number | string | undefined): string | undefined => {
    if (value === undefined || value === '') return undefined;
    const num = typeof value === 'string' ? parseInt(value, 10) : value;
    return isNaN(num) ? undefined : `${num}px`;
  };

  const hasPadding = paddingTop || paddingBottom || paddingLeft || paddingRight;

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
  const isExternalLink = ctaChooser?.ctaLink?.field === 'externalPageLink';

  return (
    <section 
      data-name='flexible-c1' 
      className={hasPadding ? '' : 'py-12 md:py-16 lg:py-28'}
      style={{ 
        backgroundColor: backgroundColor || undefined,
        paddingTop: parsePadding(paddingTop),
        paddingBottom: parsePadding(paddingBottom),
        paddingLeft: parsePadding(paddingLeft),
        paddingRight: parsePadding(paddingRight),
      }}
    >
      <div className='container mx-auto px-5 md:px-10 lg:px-15'>
        {title && (
          <Typography
            variant={'h2'}
            className='mb-12 md:mb-16 lg:mb-20 text-center'
            weight={'light'}
          >
            {title}
          </Typography>
        )}
        <div
          className={`flex ${isColumns ? 'flex-row flex-wrap' : 'flex-col'}`}
          style={{ gap: `${gapValue}px` }}
        >
          {Array.from({ length: count }).map((_, index) => {
            const currentItem = items[index];
            return (
              <div
                key={`${isColumns ? 'column' : 'row'}-${index}`}
                className={`${isColumns ? getColumnClass(count) : 'w-full'}`}
                style={isColumns ? { flex: `0 0 calc(${100 / count}% - ${((count - 1) * gapValue) / count}px)` } : undefined}
              >
                {currentItem && (
                
                    <EditableArea content={currentItem}>
                        <div className='flex flex-col' style={{ gap: `${childGapValue}px` }}>
                      {getComponents(currentItem).map((component) => (
                        <EditableComponent
                          key={(component as MgnlContent)['@name'] as string}
                          content={component as MgnlContent}
                        />
                      ))}
                       </div>
                    </EditableArea>
                 
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        {ctaText && ctaLink && (
          <div className='flex justify-end mt-10'>
            <Link
              href={ctaLink}
              {...(isExternalLink ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className='inline-flex items-center gap-2 border border-[#c33b32] px-3 py-1.5 text-[#c33b32] text-[20px] font-normal hover:bg-[#c33b32] hover:text-white transition-colors'
            >
              {ctaText}
              <ArrowRight className='w-4 h-4' />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Container;
