import { decodeIfEscaped } from '@/app/services/content-service';
import { Typography } from '@/components/typography';
import { environment } from '@/environments/environment';
import Image from 'next/image';

export interface HeaderA2Item {
  Title: string;
  Description: string;
  image?: string;
}

interface HeaderA2Props {
  content: HeaderA2Item;
}

export default function HeaderA2({ content }: HeaderA2Props) {
  const imageUrl = content.image
    ? `${environment.damRawBase}/magnoliaAuthor/dam/${content.image}`
    : '';

  if (!content) return null;

  return <section data-name='header a2'></section>;

  // return (
  //   <div className='relative w-full h-[300px] mb-8'>
  //     {imageUrl && (
  //       <Image
  //         src={imageUrl}
  //         alt={content.Title || 'Header Image'}
  //         fill
  //         className='object-cover z-0'
  //         unoptimized
  //       />
  //     )}
  //     <div className='absolute inset-0 bg-black/40 z-10' />
  //     <div className='relative z-20 container mx-auto h-full flex flex-col justify-center text-white px-4'>
  //       <Typography variant='h2' className='mb-4 font-bold'>
  //         {content.Title}
  //       </Typography>
  //       <div
  //         className='prose prose-invert max-w-none'
  //         dangerouslySetInnerHTML={{
  //           __html: decodeIfEscaped(content.Description),
  //         }}
  //       />
  //     </div>
  //   </div>
  // );
}
