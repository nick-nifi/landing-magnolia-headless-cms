import { Typography } from '@/components/typography';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { SafeImage } from '@/components/ui/safe-image';
import Link from 'next/link';
import { environment } from '@/environments/environment';
import { decodeIfEscaped } from '../../../services/content-service';

interface ImageChooser {
  field?: 'image' | 'externalImage';
  image?: {
    '@link': string;
  };
  imageAlt?: string;
  externalImage?: string;
  externalImageAlt?: string;
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

interface IFlexibleC2Props {
  title: string;
  description: string;
  imageChooser?: ImageChooser;
  tag?: string;
  ctaChooser?: CtaChooser;
}

const FlexibleC2: React.FC<IFlexibleC2Props> = ({
  title,
  description,
  imageChooser,
  tag,
  ctaChooser,
}) => {
  let imageSrc = '';
  let imageAlt = 'Image';

  if (
    imageChooser &&
    imageChooser.field &&
    (imageChooser.image || imageChooser.externalImage)
  ) {
    if (imageChooser.field === 'image' && imageChooser.image) {
      imageSrc = `${environment.damRawBase}${imageChooser.image['@link']}`;
      imageAlt = imageChooser.imageAlt || 'Image';
    } else if (
      imageChooser.field === 'externalImage' &&
      imageChooser.externalImage
    ) {
      imageSrc = imageChooser.externalImage;
      imageAlt = imageChooser.externalImageAlt || 'Image';
    }
  }

  // Get CTA link - same logic as B2
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
        variant={'link'}
        className='text-[#c33b32] hover:text-[#c33b32]/80 h-auto px-0 pr-2.5 py-1.5 w-fit text-[20px] font-normal justify-start'
        asChild={!!ctaLink}
      >
        {ctaLink ? (
          <Link href={ctaLink} className='flex items-center gap-2.5'>
            {ctaText} <ArrowRight className='w-4 h-4 rotate-90' />
          </Link>
        ) : (
          <span className='flex items-center gap-2.5'>
            {ctaText} <ArrowRight className='w-4 h-4 rotate-90' />
          </span>
        )}
      </Button>
    );
  };

  return (
    <Card className='gap-0 h-full flex flex-col'>
      <div className='relative w-full' style={{ aspectRatio: '9/5' }}>
        <SafeImage
          src={imageSrc}
          alt={imageAlt}
          fill
          className='object-cover w-full h-full bg-gray-100'
        />
        {tag && (
          <Badge className='absolute left-0 bottom-0' variant={'secondary'}>
            {tag}
          </Badge>
        )}
      </div>
      <CardContent className='flex-1 flex flex-col justify-between'>
        <div className='mb-6'>
          {title && (
            <Typography variant={'h4'} weight={'medium'} className='mb-4'>
              {title}
            </Typography>
          )}

          {description && (
            <Typography
              variant={'body-large'}
              weight={'light'}
              dangerouslySetInnerHTML={{ __html: decodeIfEscaped(description) }}
            />
          )}
        </div>

        <div>
          {renderButton()}
        </div>
      </CardContent>
    </Card>
  );

  // return (
  //   <Card className='h-full shadow-lg'>
  //     <CardContent className='flex h-full flex-1 flex-col justify-between gap-0 p-0'>
  //       <div>
  //         <div className='relative'>
  //           {imageSrc ? (
  //             <ImageHover
  //               src={imageSrc}
  //               alt={imageAlt}
  //               className='aspect-[16/9] w-full object-cover object-center'
  //             />
  //           ) : (
  //             <div className='flex aspect-[16/9] w-full items-center justify-center bg-gray-200'>
  //               <p>No image available.</p>
  //             </div>
  //           )}
  //           {tag && (
  //             <div className='absolute bottom-0 left-0 bg-slate-700 px-4 py-2 text-white'>
  //               <Typography variant={'body-small'} weight={'medium'}>
  //                 {tag}
  //               </Typography>
  //             </div>
  //           )}
  //         </div>

  //         <div className='p-6 md:p-8 lg:p-10'>
  //           <Typography variant={'h4'} weight={'medium'} className='mb-4'>
  //             {title}
  //           </Typography>
  //           <Typography
  //             variant={'body-large'}
  //             weight={'light'}
  //             className='mb-4'
  //             dangerouslySetInnerHTML={{ __html: decodeIfEscaped(description) }}
  //           />
  //         </div>
  //       </div>

  //     </CardContent>
  //   </Card>
  // );
};

export default FlexibleC2;
