import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ReportJProps {
  imageSrc?: string;
  title?: string;
  cta?: {
    label?: string;
    href?: string;
    isExternal?: boolean;
  };
  isHighlighted?: boolean;
}
export default function ReportJ({
  imageSrc,
  title,
  cta,
  isHighlighted = false,
}: ReportJProps) {
  return (
    <div className='flex flex-col gap-5'>
      <div className='relative aspect-12/16 bg-transparent shadow-md bg-white'>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title || 'Image'}
            fill
            className='object-cover object-center'
          />
        ) : (
          <div className='w-full h-full bg-transparent flex items-center justify-center'>
            <p className='text-center'>No Image Available</p>
          </div>
        )}
      </div>
      {title && (
        <Typography variant='body-large' weight={'medium'}>
          {title}
        </Typography>
      )}
      {cta && cta.href && (
        <div>
          <Button asChild variant={'link'} style={{ paddingLeft: 0 }}>
            <Link
              href={cta.href}
              {...(cta.isExternal
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              {cta.label}
              {cta.isExternal ? <ExternalLink /> : <ArrowRight />}
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
