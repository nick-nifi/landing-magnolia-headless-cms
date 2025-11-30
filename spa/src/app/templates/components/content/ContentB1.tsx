import { Grid } from '@/components/grid';
import { Typography } from '@/components/typography';
import Image from 'next/image';
import React from 'react';
import { environment } from '../../../../environments/environment';
import { decodeIfEscaped } from '@/app/services/content-service';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageChooser {
  field?: 'image' | 'externalImage';
  image?: {
    '@link': string;
  };
  imageAlt?: string;
  externalImage?: string;
  externalImageAlt?: string;
}

interface IContentB1Props {
  title: string;
  description: string;
  imageChooser?: ImageChooser;
  buttonLabel?: string;
  buttonUrl?: string;
  customClass?: string;
}

const ContentB1: React.FC<IContentB1Props> = ({
  title,
  description,
  imageChooser,
  buttonLabel,
  buttonUrl,
  customClass = '',
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

  const renderButton = () => {
    if (buttonLabel) {
      return (
        <Button variant={'outline'} asChild={!!buttonUrl}>
          {buttonUrl ? (
            <Link href={buttonUrl}>
              {buttonLabel} <ArrowRight />
            </Link>
          ) : (
            buttonLabel
          )}
        </Button>
      );
    }
    return null;
  };

  return (
    <section
      data-name='content-b1'
      className={cn('py-12 lg:py-16 bg-muted-foreground', customClass)}
    >
      <div className='container mx-auto px-2 lg:px-0'>
        <Grid cols={1} mdCols={2} className='gap-12 lg:gap-16'>
          <Grid>
            <div className='lg:mb-8'>
              <Typography
                variant={'h2'}
                weight={'light'}
                className='mb-5 lg:mb-6'
              >
                {title}
              </Typography>
              <Typography
                variant={'body-large'}
                weight={'light'}
                dangerouslySetInnerHTML={{
                  __html: decodeIfEscaped(description),
                }}
              />
            </div>

            <div>{renderButton()}</div>
          </Grid>
          <Grid>
            <div className='relative w-full h-full' style={{ minHeight: 200 }}>
              <Image
                src={imageSrc || ''}
                alt={imageAlt || ''}
                fill
                unoptimized
                className='object-cover object-center'
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </section>
  );
  // return (

  //   <div className='w-full p-4'>
  //     <div className='rounded overflow-hidden shadow-lg bg-white'>
  //       {imageSrc ? (
  //         <div className='w-full h-48 overflow-hidden'>
  //           <img
  //             src={imageSrc}
  //             alt={imageAlt}
  //             className='w-full h-full object-cover object-center'
  //           />
  //         </div>
  //       ) : (
  //         <div className='w-full h-48 flex items-center justify-center bg-gray-200'>
  //           <p>No image available.</p>
  //         </div>
  //       )}
  //       <div className='p-6'>
  //         {title && <h2 className='font-bold text-xl mb-2'>{title}</h2>}
  //         {description && (
  //           <div
  //             dangerouslySetInnerHTML={{ __html: decodeIfEscaped(description) }}
  //           />
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default ContentB1;
