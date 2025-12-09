import Image from 'next/image';
import { Typography } from '@/components/typography';

export interface HeaderA2Item {
  Title: string;
  Description: string;
  image?: {
    '@link': string;
  };
}

interface HeaderA2Props {
  content: HeaderA2Item;
}

export default function HeaderA2({ content }: HeaderA2Props) {
  if (!content) return null;

  return (
    <div className='relative w-full h-[300px] mb-8'>
      {content.image && (
        <Image
          src={content.image['@link']}
          alt={content.Title || 'Header Image'}
          fill
          className='object-cover z-0'
        />
      )}
      <div className='absolute inset-0 bg-black/40 z-10' />
      <div className='relative z-20 container mx-auto h-full flex flex-col justify-center text-white px-4'>
        <Typography variant='h2' className='mb-4 font-bold'>
          {content.Title}
        </Typography>
        <div
          className='prose prose-invert max-w-none'
          dangerouslySetInnerHTML={{ __html: content.Description }}
        />
      </div>
    </div>
  );
}
