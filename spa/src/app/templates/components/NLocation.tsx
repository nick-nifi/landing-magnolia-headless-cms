import { Grid } from '@/components/grid';
import { Typography } from '@/components/typography';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import React from 'react';

interface INLocationProps {
  company: string;
  address: string;
  tel?: string;
  email?: string;
  externalImage?: string;
  externalImageAlt?: string;
}

interface INLocationProps {
  company: string;
  address: string;
  tel?: string;
  email?: string;
  // imageChooser?: ImageChooser;
}

const NLocation: React.FC<INLocationProps> = ({
  address,
  company,
  email,
  tel,
  // imageChooser,
}) => {
  return (
    <section className='container mx-auto px-2 lg:px-0 py-16'>
      <Grid cols={1} lgCols={3} gap={8}>
        <Grid>
          <Grid cols={1} mdCols={2} lgCols={1} gap={8}>
            <Grid gap={8}>
              <Typography variant='h2' weight={'light'}>
                Global branches
              </Typography>
              <Select defaultValue='2' value='2'>
                <SelectTrigger className='w-full'>
                  <SelectValue>Lorem</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='2'>Singapore head office</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Grid>
            <Grid>
              <div>
                <Typography
                  variant={'body-large'}
                  weight={'semibold'}
                  className='text-primary'
                >
                  {company}
                </Typography>
                <Typography variant={'body-large'} weight={'light'}>
                  {address}
                </Typography>
                {tel && (
                  <Typography variant={'body-large'} weight={'light'}>
                    Tel: {tel}
                  </Typography>
                )}
                {email && (
                  <Typography variant={'body-large'} weight={'light'}>
                    <Link href={`mailto:${email}`}>Email: {email}</Link>
                  </Typography>
                )}
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid className='lg:col-span-2'>
          <div className='embed-map-responsive w-full h-full min-h-[500px] lg:min-h-[200px]'>
            <div className='embed-map-container w-full h-full'>
              <iframe
                className='embed-map-frame w-full h-full'
                title='Google Map'
                src='https://maps.google.com/maps?width=600&height=400&hl=en&q=83%20Clemenceau%20Avenue%2C%20%2310-01%20UE%20Square%2C%20Singapore%20239920&t=p&z=14&ie=UTF8&iwloc=B&output=embed'
                frameBorder='0'
                scrolling='no'
              ></iframe>
            </div>
          </div>
        </Grid>
      </Grid>
    </section>
  );
};

export default NLocation;
