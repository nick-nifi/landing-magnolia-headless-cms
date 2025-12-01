import { Grid } from '@/components/grid';
import { Typography } from '@/components/typography';
import Image from 'next/image';
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

interface IFastfactTileProps {
  title: string;
  description: string;
  imageChooser?: ImageChooser;
}

const FastfactTile: React.FC<IFastfactTileProps> = ({
  title,
  imageChooser,
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

  return (
    <Grid
      cols={1}
      mdCols={3}
      lgCols={2}
      className='gap-5 lg:gap-16 border shadow-lg'
    >
      <Grid className='flex item-center justify-center md:justify-start pt-8 md:pt-0 md:pl-10'>
        {imageSrc && (
          <div className='w-[200px] overflow-hidden relative py-4'>
            <Image
              src={imageSrc}
              alt={imageAlt}
              className='w-full h-full object-contain object-center'
              fill
              unoptimized
            />
          </div>
        )}
      </Grid>
      <Grid className='flex items-center justify-center md:justify-start py-10 md:col-span-2 lg:col-span-1'>
        {title && (
          <Typography variant='h4' weight='medium'>
            {title}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default FastfactTile;
