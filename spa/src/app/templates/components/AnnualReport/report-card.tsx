import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ReportItem {
  image: string;
  imageAlt?: string;
  year: string;
  title: string;
  href?: string;
}

export function ReportCard({
  report,
  isFeatured = false,
}: {
  report: ReportItem;
  isFeatured?: boolean;
}) {
  // Featured report: Horizontal on mobile/tablet, vertical on desktop
  if (isFeatured) {
    return (
      <>
        {/* Desktop Layout - Vertical Card */}
        <div className='hidden lg:flex flex-col gap-5 items-start justify-center w-full'>
          <Card
            className={cn(
              'flex flex-col gap-6 items-start shadow-lg p-0 overflow-hidden w-full',
              'max-w-[360px]'
            )}
          >
            <div className='relative w-full bg-muted h-[510px]'>
              <Image
                src={report.image}
                alt={report.imageAlt || report.title}
                fill
                className='object-cover object-center'
                sizes='360px'
                unoptimized
              />
            </div>
          </Card>
          <Typography
            variant='body-large'
            weight='medium'
            className='text-uobkh-dark-grey'
          >
            {report.year} {report.title}
          </Typography>
          <Button
            variant='ghost'
            className='p-0 h-auto text-primary hover:text-primary'
            asChild={!!report.href}
            // onClick={report.onClick}
          >
            {report.href ? (
              <a href={report.href} className='flex items-center gap-2'>
                <span>View</span>
                <ArrowRight />
              </a>
            ) : (
              <div className='flex items-center gap-2'>
                <span>View</span>
                <ArrowRight />
              </div>
            )}
          </Button>
        </div>

        {/* Mobile/Tablet Layout - Horizontal Card */}
        <div className='lg:hidden flex gap-5 items-center w-full'>
          <Card className='flex flex-col gap-6 items-start shadow-lg p-0 overflow-hidden flex-shrink-0 w-[187px]'>
            <div className='relative w-full bg-muted h-[285px]'>
              <Image
                src={report.image}
                alt={report.imageAlt || report.title}
                fill
                className='object-cover object-center'
                sizes='187px'
                unoptimized
              />
            </div>
          </Card>
          <div className='flex flex-col gap-8 items-start justify-center flex-1'>
            <Typography
              variant='body-large'
              weight='medium'
              className='text-uobkh-dark-grey text-base'
            >
              {report.year} {report.title}
            </Typography>
            <Button
              variant='ghost'
              className='p-0 h-auto text-primary hover:text-primary'
              asChild={!!report.href}
              //   onClick={report.onClick}
            >
              {report.href ? (
                <a href={report.href} className='flex items-center gap-2'>
                  <span>View</span>
                  <ArrowRight />
                </a>
              ) : (
                <div className='flex items-center gap-2'>
                  <span>View</span>
                  <ArrowRight />
                </div>
              )}
            </Button>
          </div>
        </div>
      </>
    );
  }

  // Grid reports: Horizontal on mobile/tablet, vertical on desktop
  return (
    <>
      {/* Desktop Layout - Vertical Card */}
      <div className='hidden lg:flex flex-col gap-5 items-start justify-center w-full'>
        <Card className='flex flex-col gap-6 items-start shadow-lg p-0 overflow-hidden w-full max-w-[212px]'>
          <div className='relative w-full bg-muted h-[301px]'>
            <Image
              src={report.image}
              alt={report.imageAlt || report.title}
              fill
              className='object-cover object-center'
              sizes='(max-width: 768px) 100vw, 212px'
              unoptimized
            />
          </div>
        </Card>
        <Typography
          variant='body-small'
          weight='medium'
          className='text-uobkh-dark-grey'
        >
          {report.year} {report.title}
        </Typography>
        <Button
          variant='ghost'
          className='p-0 h-auto text-primary hover:text-primary'
          asChild={!!report.href}
          //   onClick={report.onClick}
        >
          {report.href ? (
            <a href={report.href} className='flex items-center gap-2'>
              <span>View</span>
              <ArrowRight />
            </a>
          ) : (
            <div className='flex items-center gap-2'>
              <span>View</span>
              <ArrowRight />
            </div>
          )}
        </Button>
      </div>

      {/* Mobile Layout - Horizontal Card */}
      <div className='md:hidden flex gap-[18px] items-center w-full bg-white border border-uobkh-light-grey h-[184px]'>
        <div className='relative h-[184px] w-[130px] flex-shrink-0'>
          <Image
            src={report.image}
            alt={report.imageAlt || report.title}
            fill
            className='object-cover object-center'
            sizes='130px'
            unoptimized
          />
        </div>
        <div className='flex flex-col gap-6 items-start justify-center flex-1 h-full'>
          <Typography
            variant='body-small'
            weight='medium'
            className='text-uobkh-dark-grey text-sm'
          >
            {report.year} {report.title}
          </Typography>
          <Button
            variant='ghost'
            className='p-0 h-auto text-primary hover:text-primary'
            asChild={!!report.href}
            // onClick={report.onClick}
          >
            {report.href ? (
              <a href={report.href} className='flex items-center gap-2'>
                <span>View</span>
                <ArrowRight className='rotate-90' />
              </a>
            ) : (
              <div className='flex items-center gap-2'>
                <span>View</span>
                <ArrowRight className='rotate-90' />
              </div>
            )}
          </Button>
        </div>
      </div>

      {/* Tablet Layout - Horizontal Card (335px width) */}
      <div className='hidden md:flex lg:hidden gap-[18px] items-center w-[335px] bg-white border border-uobkh-light-grey h-[184px]'>
        <div className='relative h-[184px] w-[130px] flex-shrink-0'>
          <Image
            src={report.image}
            alt={report.imageAlt || report.title}
            fill
            className='object-cover object-center'
            sizes='130px'
            unoptimized
          />
        </div>
        <div className='flex flex-col gap-6 items-start justify-center flex-1 h-full'>
          <Typography
            variant='body-small'
            weight='medium'
            className='text-uobkh-dark-grey text-sm'
          >
            {report.year} {report.title}
          </Typography>
          <Button
            variant='link'
            // className='p-0 h-auto text-primary hover:text-primary'
            asChild={!!report.href}

            // onClick={report.onClick}
          >
            {report.href ? (
              <Link href={report.href} style={{ paddingLeft: 0 }}>
                <span>View</span>
                <ArrowRight className='rotate-90' />
              </Link>
            ) : (
              <div className='flex items-center gap-2'>
                <span>View</span>
                <ArrowRight className='rotate-90' />
              </div>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
