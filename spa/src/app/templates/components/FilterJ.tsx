'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Typography } from '@/components/typography';
import React, { useState } from 'react';

interface Item {
  value: string;
}

interface IFilterJProps {
  label: string;
  placeholder: string;
  items?: Item[];
}

const FilterJ: React.FC<IFilterJProps> = ({
  label,
  placeholder,
  items = [],
}) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  return (
    <div
      data-name='I / Filter'
      className='flex flex-col gap-3 items-start min-w-[325px]'
    >
      <Typography
        variant='body-large'
        weight='medium'
        className='text-[#3f4c54] text-[20px] leading-[1.5] w-full'
      >
        {label}
      </Typography>
      <Select value={selectedValue} onValueChange={setSelectedValue}>
        <SelectTrigger className='bg-white border border-[#3f4c54] h-[42px] px-[9px] py-1 w-full text-[20px] text-[#3f4c54]'>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item, index) => (
            <SelectItem key={index} value={item.value}>
              {item.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterJ;

