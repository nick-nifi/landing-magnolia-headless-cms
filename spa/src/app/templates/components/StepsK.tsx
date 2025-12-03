import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Step {
  stepNumber: string;
  title: string;
  description: string;
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

interface StepsKProps {
  steps?: Step[];
  ctaChooser?: CtaChooser;
}

const StepsK: React.FC<StepsKProps> = ({
  steps = [],
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
        className='border-white text-white hover:bg-white hover:text-[#c33b32]'
        asChild={!!ctaLink}
      >
        {ctaLink ? (
          <Link href={ctaLink}>
            {ctaText} <ArrowRight className='w-4 h-4' />
          </Link>
        ) : (
          <>
            {ctaText} <ArrowRight className='w-4 h-4' />
          </>
        )}
      </Button>
    );
  };

  return (
    <section
      data-name='K / Steps'
      className='bg-[#c33b32] flex flex-col gap-20 items-center px-[160px] py-16 w-full relative'
    >
      <div className='flex flex-col gap-20 items-center max-w-[1280px] w-full relative'>
        {/* Steps */}
        <div className='flex items-start w-[1120px]'>
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className='basis-0 flex flex-col gap-5 grow items-start min-h-px min-w-px self-stretch'>
                {/* Step Number Circle and Arrow */}
                <div className='relative w-full'>
                  <div className='relative inline-flex items-start'>
                    {/* Numbered Circle */}
                    <div className='relative size-[61.6px]'>
                      <svg
                        width='62'
                        height='62'
                        viewBox='0 0 62 62'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='size-full'
                      >
                        <circle
                          cx='31'
                          cy='31'
                          r='30'
                          stroke='white'
                          strokeWidth='2'
                        />
                      </svg>
                      {/* Step Number */}
                      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center'>
                        <Typography
                          variant='h1'
                          weight='light'
                          className='text-white text-[48px] leading-[normal]'
                        >
                          {step.stepNumber}
                        </Typography>
                      </div>
                    </div>
                    {/* Arrow (only show if not last step) */}
                    {index < steps.length - 1 && (
                      <div className='h-[22.4px] ml-[61.6px] mt-5 relative w-[162.4px] flex items-center'>
                        <ArrowRight className='w-full h-full text-white' />
                      </div>
                    )}
                  </div>
                </div>

                {/* Step Content */}
                <div className='flex flex-col gap-5 items-start text-white w-full'>
                  <Typography
                    variant='h4'
                    weight='medium'
                    className='text-[28px] tracking-[-0.28px] leading-[1.2] text-white'
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    variant='body-large'
                    weight='light'
                    className='text-[20px] leading-[1.5] text-white'
                  >
                    {step.description}
                  </Typography>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      {renderButton() && (
        <div className='relative shrink-0'>{renderButton()}</div>
      )}
    </section>
  );
};

export default StepsK;

