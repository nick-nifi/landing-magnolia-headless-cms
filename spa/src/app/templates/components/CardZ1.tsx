import { IconName } from '@/components/icon-wrapper/register';
import React from 'react';
import { decodeIfEscaped } from '../../services/content-service';
import IconWrapper from '@/components/icon-wrapper';
import { Typography } from '@/components/typography';

interface ICardZ1Props {
  title: string;
  description: string;
  selectField: IconName;
}

const CardZ1: React.FC<ICardZ1Props> = ({
  title,
  description,
  selectField: iconName,
}) => {
  return (
    <div className='p-5 border shadow-md flex flex-col lg:flex-row h-full'>
      {iconName && (
        <div className='w-[70px] h-[70px] lg:w-[98px] lg:h-[98px] flex items-center justify-center shrink-0'>
          <IconWrapper name={iconName} width={50} height={50} />
        </div>
      )}
      <div className='lg:px-5 lg:pb-6'>
        <Typography variant={'h4'} className='mb-2'>
          {title}
        </Typography>
        <Typography
          variant={'body-large'}
          weight={'light'}
          dangerouslySetInnerHTML={{ __html: decodeIfEscaped(description) }}
        />
      </div>
    </div>
  );
};

export default CardZ1;
