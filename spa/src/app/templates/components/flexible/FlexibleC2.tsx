import { Typography } from '@/components/typography';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { environment } from '@/environments/environment';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
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
  marginTop?: number | string;
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
  let isExternalImage = false;

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
      isExternalImage = true;
    }
  }

  let ctaText = '';
  let linkHref = '';
  let isExternal = false;

  if (ctaChooser && ctaChooser.field === 'withCta') {
    ctaText = ctaChooser.ctaText || '';

    const ctaLink = ctaChooser.ctaLink;

    if (ctaLink) {
      if (ctaLink.field === 'internalPageLink' && ctaLink.internalLink) {
        const origin =
          typeof window !== 'undefined' ? window.location.origin : '';
        let link = ctaLink.internalLink;
        if (link.startsWith(environment.appBase)) {
          link = link.slice(environment.appBase.length);
          if (!link.startsWith('/')) {
            link = '/' + link;
          }
        }
        linkHref = `${origin}${link}`;
      } else if (ctaLink.field === 'externalPageLink' && ctaLink.externalLink) {
        linkHref = ctaLink.externalLink;
        isExternal = true;
      }
    }
  }

  return (
    <Card
      className='gap-0 flex flex-col overflow-hidden border h-full shadow-md'
      // style={{ marginTop: marginTopValue ? `${marginTopValue}px` : undefined }}
    >
      <div className='relative h-[200px] shrink-0'>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className='object-cover w-full h-full bg-gray-100'
          unoptimized={isExternalImage}
        />
        {tag && (
          <Badge className='absolute left-0 bottom-0' variant={'secondary'}>
            {tag}
          </Badge>
        )}
      </div>
      <CardContent className='flex flex-col p-5 gap-6 grow'>
        <div className='overflow-hidden min-h-0'>
          {title && (
            <Typography
              variant={'h4'}
              weight={'medium'}
              className='mb-2 line-clamp-2'
            >
              {title}
            </Typography>
          )}

          {description && (
            <Typography
              variant={'body-large'}
              weight={'light'}
              className='line-clamp-2'
              dangerouslySetInnerHTML={{ __html: decodeIfEscaped(description) }}
            />
          )}
        </div>

        <div className='mt-auto shrink-0'>
          {ctaChooser &&
            ctaChooser.field === 'withCta' &&
            ctaText &&
            linkHref && (
              <Button asChild variant={'link'} style={{ paddingLeft: 0 }}>
                <Link
                  href={linkHref}
                  {...(isExternal
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {ctaText}
                  {isExternal ? <ExternalLink /> : <ArrowRight />}
                </Link>
              </Button>
            )}
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
