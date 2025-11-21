import { decodeIfEscaped } from '@/app/services/content-service';
import ImageHover from '@/components/image-hover';
import { Typography } from '@/components/typography';
import { Card, CardContent } from '@/components/ui/card';
import get from 'lodash/get';
import has from 'lodash/has';
import Link from 'next/link';
import React from 'react';
import { environment } from '../../../environments/environment';

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
}

const FlexibleC1: React.FC<IFlexibleC1Props> = ({
  title,
  description,
  imageChooser,
  link,
}) => {
  const imgSrc = has(imageChooser, 'externalImage')
    ? get(imageChooser, 'externalImage')
    : `${environment.damRawBase}${get(imageChooser, "image['@link']")}`;

  const imageAlt =
    get(imageChooser, 'externalImageAlt') ||
    get(imageChooser, 'image.metadata.caption');

  const renderContent = () => (
    <Card className='gap-0 h-full flex-1'>
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
        src={imgSrc}
        alt={imageAlt || ''}
        fill
        unoptimized
        className='object-cover'
        imageContainerClass='aspect-53/32'
      />
    </Card>
  );

  if (link) {
    return <Link href={link}>{renderContent()}</Link>;
  }

  return <>{renderContent()}</>;
};

export default FlexibleC1;
