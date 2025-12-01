import React from 'react';
import { EditableArea, EditableComponent } from '@magnolia/react-editor';
import { MgnlContent } from '@magnolia/frontend-helpers-base';
import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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

interface ILinkContainerProps {
  container: ContainerConfig;
  title?: string;
  item1?: MgnlContent;
  item2?: MgnlContent;
  item3?: MgnlContent;
  item4?: MgnlContent;
  item5?: MgnlContent;
  ctaChooser?: CtaChooser;
}

const LinkContainer: React.FC<ILinkContainerProps> = ({
  container,
  title = '',
  item1,
  item2,
  item3,
  item4,
  item5,
  ctaChooser,
}) => {
  const getComponents = (content: MgnlContent | undefined) => {
    return content?.['@nodes']?.map((nodeName) => content[nodeName]) || [];
  };

  const isColumns = container.field === 'columns';
  const { count } = container;
  const items = [item1, item2, item3, item4, item5];

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
        className='border-white text-white hover:bg-white hover:text-[#c33b32]'
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
    <section data-name='link-container' className='py-12 md:py-16 lg:py-28'>
      {title && (
        <Typography
          variant={'h2'}
          className='mb-12 md:mb-16 lg:mb-20 text-center'
          weight={'light'}
        >
          {title}
        </Typography>
      )}
      <div className='container mx-auto'>
        <div className={`flex ${isColumns ? 'flex-row' : 'flex-col'} gap-4`}>
          {Array.from({ length: count }).map((_, index) => {
            const currentItem = items[index];

            return (
              <div
                key={`${isColumns ? 'column' : 'row'}-${index}`}
                className={`${isColumns ? 'flex-1 ' : ''}items-center justify-center p-4`}
              >
                {currentItem && (
                  <EditableArea content={currentItem}>
                    {getComponents(currentItem).map((component) => (
                      <EditableComponent
                        key={(component as MgnlContent)['@name'] as string}
                        content={component as MgnlContent}
                      />
                    ))}
                  </EditableArea>
                )}
              </div>
            );
          })}
        </div>
        {renderButton() && (
          <div className='flex justify-center mt-8'>
            {renderButton()}
          </div>
        )}
      </div>
    </section>
  );
};

export default LinkContainer;

