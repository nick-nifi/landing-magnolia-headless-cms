import { Typography } from '@/components/typography';
import Link from 'next/link';
import React from 'react';
import { Download } from 'lucide-react';

import get from 'lodash/get';
import has from 'lodash/has';
import { environment } from '@/environments/environment';

interface DownloadLink {
  field?: 'noLink' | 'internalPageLink' | 'externalPageLink' | 'fileLink';
  internalLink?: string;
  externalLink?: string;
  file?: {
    '@link': string;
  };
}

interface IDownloadFProps {
  date: string;
  description: string;
  downloadLink?: DownloadLink;
}

const DownloadF: React.FC<IDownloadFProps> = ({
  date,
  description,
  downloadLink,
}) => {
  // Get download link URL
  const getDownloadUrl = (): string => {
    if (!downloadLink) return '';
    
    if (downloadLink.field === 'fileLink' && downloadLink.file) {
      return `${environment.damRawBase}${downloadLink.file['@link']}`;
    }
    if (downloadLink.field === 'externalPageLink') {
      return downloadLink.externalLink || '';
    }
    if (downloadLink.field === 'internalPageLink') {
      return downloadLink.internalLink || '';
    }
    return '';
  };

  const downloadUrl = getDownloadUrl();
  const hasLink = downloadUrl !== '';

  const content = (
    <div
      data-name='F / Download'
      className='bg-[#dbe0e4] border-b border-[#3f4c54] flex grow items-center justify-between min-w-[335px] px-[10px] py-[11px] relative w-full'
    >
      <div className='flex items-start justify-between w-[527px]'>
        <div className='flex flex-col gap-[5px] items-start justify-center text-[#3f4c54]'>
          <Typography
            variant='h5'
            weight='medium'
            className='text-[20px] tracking-[-0.2px] leading-[1.4]'
          >
            {date}
          </Typography>
          <Typography
            variant='body-small'
            weight='light'
            className='text-[16px] leading-[1.5] w-[477px]'
          >
            {description}
          </Typography>
        </div>
        <div className='h-[16px] relative shrink-0 w-4'>
          <Download className='size-full text-[#3f4c54]' />
        </div>
      </div>
    </div>
  );

  if (hasLink) {
    return (
      <Link href={downloadUrl} target='_blank' rel='noopener noreferrer'>
        {content}
      </Link>
    );
  }

  return content;
};

export default DownloadF;

