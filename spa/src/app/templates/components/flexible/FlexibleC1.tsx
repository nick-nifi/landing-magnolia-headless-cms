import { decodeIfEscaped } from '@/app/services/content-service';
import ImageHover from '@/components/image-hover';
import { Typography } from '@/components/typography';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';
import { environment } from '../../../../environments/environment';

interface ImageChooser {
  field?: 'image' | 'externalImage';
  image?: {
    '@link': string;
  };
  imageAlt?: string;
  externalImage?: string;
  externalImageAlt?: string;
}

interface IFlexibleC1Props {
  title: string;
  description: string;
  imageChooser?: ImageChooser;
  link?: string;
  marginTop?: number | string;
}

const FlexibleC1: React.FC<IFlexibleC1Props> = ({
  title,
  description,
  imageChooser,
  link,
  marginTop = 0,
}) => {
  const marginTopValue =
    typeof marginTop === 'string' ? parseInt(marginTop, 10) : marginTop;

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

  const renderContent = () => (
    <Card
      className='gap-0 h-full flex-1 shadow-md'
      style={{ marginTop: marginTopValue ? `${marginTopValue}px` : undefined }}
    >
      <CardContent className='p-5 flex flex-1 flex-col'>
        <Typography variant={'h4'} weight={'medium'} className='mb-4'>
          {title}
        </Typography>
        <Typography variant={'body-large'} weight={'light'}>
          <span
            dangerouslySetInnerHTML={{ __html: decodeIfEscaped(description) }}
          />
        </Typography>
      </CardContent>
      <ImageHover
        src={imageSrc}
        alt={imageAlt || ''}
        fill
        className='object-cover'
        imageContainerClass='aspect-53/32'
        unoptimized={isExternalImage}
        loading='lazy'
      />
    </Card>
  );

  if (link) {
    return <Link href={link}>{renderContent()}</Link>;
  }

  return <>{renderContent()}</>;
};

export default FlexibleC1;
