'use client';

import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export interface SelectUobkhResearchItem {
  label: string;
  value: string;
  href: string;
}

interface SelectUobkhResearchProps {
  items: SelectUobkhResearchItem[];
}

const SelectUobkhResearch = ({ items }: SelectUobkhResearchProps) => {
  const [selectedUrl, setSelectedUrl] = useState<string>('');
  const router = useRouter();

  const handleGo = () => {
    if (selectedUrl) {
      if (selectedUrl.startsWith('http')) {
        window.open(selectedUrl, '_blank');
      } else {
        router.push(selectedUrl);
      }
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section className='bg-ring py-12 md:py-16'>
      <div className='container mx-auto text-center'>
        <Typography variant='h2' weight='light' className='mb-8'>
          View all UOBKH research
        </Typography>

        <div className='flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto'>
          <Select onValueChange={setSelectedUrl}>
            <SelectTrigger className='w-full bg-white h-[42px]'>
              <SelectValue placeholder='Select location' />
            </SelectTrigger>
            <SelectContent>
              {items.map((item, index) => (
                <SelectItem key={index} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={handleGo} variant='outline' disabled={!selectedUrl}>
            Go <ArrowUpRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SelectUobkhResearch;
