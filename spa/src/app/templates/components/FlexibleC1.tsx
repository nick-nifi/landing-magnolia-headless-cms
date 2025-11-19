import React from 'react';
import { environment } from '../../../environments/environment';
import { decodeIfEscaped } from '../../services/content-service';

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
    <div className='w-full p-4'>
      <div className='rounded overflow-hidden shadow-lg bg-white'>
        {imageSrc ? (
          <div className='w-full h-48 overflow-hidden'>
            <img
              src={imageSrc}
              alt={imageAlt}
              className='w-full h-full object-cover object-center'
            />
          </div>
        ) : (
          <div className='w-full h-48 flex items-center justify-center bg-gray-200'>
            <p>No image available.</p>
          </div>
        )}
        <div className='p-6'>
          {title && <h2 className='font-bold text-xl mb-2'>{title}</h2>}
          {description && (
            <div
              dangerouslySetInnerHTML={{ __html: decodeIfEscaped(description) }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FlexibleC1;
