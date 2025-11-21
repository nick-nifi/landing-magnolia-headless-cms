import { Typography } from '@/components/typography';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
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

interface LinkItem {
  link: {
    '@link': string;
    '@path': string;
    '@uuid': string;
    '@name': string;
  };
  label: string;
}

interface IFlexibleC2Props {
  title: string;
  description: string;
  imageChooser?: ImageChooser;
  tag?: string;
  link?: LinkItem;
}

const FlexibleC2: React.FC<IFlexibleC2Props> = ({
  title,
  description,
  imageChooser,
  tag,
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
    <Card className='gap-0 h-full'>
      <div className='relative w-full' style={{ aspectRatio: '9/5' }}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className='object-cover w-full h-full bg-gray-100'
          unoptimized
        />
        {tag && (
          <Badge className='absolute left-0 bottom-0' variant={'secondary'}>
            {tag}
          </Badge>
        )}
      </div>
      <CardContent className='justify-between h-full flex flex-col'>
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

        {link && link.link && (
          <div>
            <Button asChild variant={'link'} style={{ paddingLeft: 0 }}>
              <Link href={link?.link['@path'] || '#'} target='_blank'>
                {link?.label} <ArrowRight />
              </Link>
            </Button>
          </div>
        )}
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
