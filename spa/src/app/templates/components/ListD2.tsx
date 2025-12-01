import { decodeIfEscaped } from '@/app/services/content-service';
import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ListItem {
  title: string;
  bulletPoints: string;
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

interface ListD2Props {
  listItems?: ListItem[];
  ctaChooser?: CtaChooser;
}

const ListD2: React.FC<ListD2Props> = ({
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

  // Render bullet points - if HTML contains <li> tags, render as-is, otherwise wrap in <ul>
  const renderBulletPoints = (html: string) => {
    const decoded = decodeIfEscaped(html);
    // Check if the HTML already contains <ul> or <li> tags
    if (decoded.includes('<li>') || decoded.includes('<ul>')) {
      return decoded;
    }
    // If it's plain text, wrap each line in <li> tags
    const lines = decoded.split('\n').filter(line => line.trim().length > 0);
    return `<ul>${lines.map(line => `<li>${line.trim()}</li>`).join('')}</ul>`;
  };

  return (
    <section
      data-name='D2 / List / Grey'
      className='bg-white flex flex-col gap-20 items-center px-[160px] py-16 w-full'
    >
      <div className='flex flex-col gap-16 items-center max-w-[1280px] w-[1120px]'>
        {/* List Items */}
        <div className='flex flex-col gap-5 items-start w-full'>
          {listItems.map((item, index) => {
            const bulletPointsHtml = renderBulletPoints(item.bulletPoints);

            return (
              <div
                key={index}
                className='bg-white border border-[#e6e7e8] flex flex-col gap-20 items-start max-w-[1280px] w-[1120px]'
              >
                <div className='flex gap-16 items-center w-full'>
                  {/* Left Panel - Title */}
                  <div className='flex flex-row items-center self-stretch'>
                    <div className='bg-[#dbe0e4] border-l-[10px] border-l-[#c33b32] flex gap-[10px] h-full items-center justify-center px-0 py-5 w-[434px]'>
                      <div className='flex flex-col font-medium h-full justify-center leading-[0] text-[#3f4c54] text-[28px] text-center tracking-[-0.28px] w-[404px]'>
                        <Typography
                          variant='h4'
                          weight='medium'
                          className='leading-[1.2]'
                        >
                          {item.title}
                        </Typography>
                      </div>
                    </div>
                  </div>

                  {/* Right Panel - Bullet Points */}
                  <div className='flex flex-col gap-4 items-start px-0 py-5'>
                    <div
                      className='block font-light leading-[0] text-[#3f4c54] text-[20px] w-[595px] [&_ul]:list-none [&_li]:ms-[30px] [&_li]:mb-0 [&_li:last-child]:mb-0 [&_li_span]:leading-[1.5]'
                      dangerouslySetInnerHTML={{ __html: bulletPointsHtml }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className='flex flex-col gap-4 items-center w-full'>
          <div className='flex flex-col gap-6 items-end w-[1120px]'>
            {renderButton()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListD2;

