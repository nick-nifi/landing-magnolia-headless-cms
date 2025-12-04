'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface LocationLink {
  field?: string;
  internalLink?: string;
  externalLink?: string;
}

interface Location {
  locationName?: string;
  locationLink?: LocationLink;
}

interface ButtonLink {
  field?: string;
  internalLink?: string;
  externalLink?: string;
}

interface IFilterIProps {
  heading?: string;
  placeholder?: string;
  locations?: Location[] | Record<string, Location>;
  buttonText?: string;
  buttonLink?: ButtonLink;
}

const FilterI: React.FC<IFilterIProps> = ({
  heading = '',
  placeholder = 'Select location',
  locations,
  buttonText = 'Go',
  buttonLink,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  // Convert locations to array (handle both array and object from Magnolia)
  const getLocationsArray = (): Location[] => {
    if (!locations) return [];
    if (Array.isArray(locations)) return locations;
    if (typeof locations === 'object') {
      return Object.values(locations).filter(
        (item): item is Location => item && typeof item === 'object'
      );
    }
    return [];
  };

  const locationsArray = getLocationsArray();

  // Get button link URL
  const getButtonLinkUrl = (): string => {
    if (!buttonLink?.field) return '';
    if (buttonLink.field === 'externalPageLink' && buttonLink.externalLink) {
      return buttonLink.externalLink;
    }
    if (buttonLink.field === 'internalPageLink' && buttonLink.internalLink) {
      return buttonLink.internalLink;
    }
    return '';
  };

  const buttonLinkUrl = getButtonLinkUrl();

  return (
    <div className='bg-[#dbe0e4] flex flex-col items-center py-[64px] px-[160px] w-full'>
      <div className='flex flex-col items-center gap-[32px] w-full max-w-[1280px]'>
        {/* Heading */}
        {heading && (
          <h2 className='font-light text-[40px] leading-[1.2] text-[#3f4c54] text-center tracking-[-0.4px] w-full max-w-[1024px]'>
            {heading}
          </h2>
        )}

        {/* Filter Row */}
        <div className='flex gap-[10px] items-end justify-center w-full'>
          {/* Dropdown */}
          <div className='min-w-[325px] flex-1 max-w-[450px]'>
            <div className='bg-white border border-[#3f4c54] h-[42px] flex items-center px-[9px]'>
              <Select value={selectedLocation} onValueChange={setSelectedLocation} className='w-full'>
                <SelectTrigger className='w-full bg-transparent border-none px-0 text-[20px] text-[#3f4c54] rounded-none focus:ring-0 focus:ring-offset-0'>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className='bg-white border border-[#3f4c54] rounded-none'>
                  {locationsArray.map((location, index) => (
                    <SelectItem
                      key={index}
                      value={location.locationName || `location-${index}`}
                      className='text-[20px] text-[#3f4c54]'
                    >
                      {location.locationName || ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Button */}
          {buttonLinkUrl ? (
            <Button
              className='border border-[#c33b32] text-[#c33b32] h-[42px] px-[10px] text-[20px] font-normal hover:bg-[#c33b32] hover:text-white rounded-none bg-transparent'
              asChild
            >
              <Link href={buttonLinkUrl} className='inline-flex items-center gap-2'>
                {buttonText}
                <ExternalLink className='w-4 h-4' />
              </Link>
            </Button>
          ) : (
            <Button className='border border-[#c33b32] text-[#c33b32] h-[42px] px-[10px] text-[20px] font-normal hover:bg-[#c33b32] hover:text-white rounded-none bg-transparent inline-flex items-center gap-2'>
              {buttonText}
              <ExternalLink className='w-4 h-4' />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterI;
