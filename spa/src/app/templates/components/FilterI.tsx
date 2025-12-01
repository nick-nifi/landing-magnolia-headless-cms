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

interface LocationLink {
  field?: 'noLink' | 'internalPageLink' | 'externalPageLink';
  internalLink?: string;
  externalLink?: string;
}

interface Location {
  locationName: string;
  locationLink?: LocationLink;
}

interface ButtonLink {
  field?: 'internalPageLink' | 'externalPageLink';
  internalLink?: string;
  externalLink?: string;
}

interface IFilterIProps {
  placeholder: string;
  locations?: Location[];
  buttonText: string;
  buttonLink?: ButtonLink;
}

const FilterI: React.FC<IFilterIProps> = ({
  placeholder,
  locations = [],
  buttonText,
  buttonLink,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  // Get location link
  const getLocationLink = (location: Location): string => {
    if (!location.locationLink || location.locationLink.field === 'noLink') {
      return '';
    }
    if (location.locationLink.field === 'externalPageLink') {
      return location.locationLink.externalLink || '';
    }
    if (location.locationLink.field === 'internalPageLink') {
      return location.locationLink.internalLink || '';
    }
    return '';
  };

  // Get button link
  const getButtonLink = (): string => {
    if (!buttonLink) return '';
    if (buttonLink.field === 'externalPageLink') {
      return buttonLink.externalLink || '';
    }
    if (buttonLink.field === 'internalPageLink') {
      return buttonLink.internalLink || '';
    }
    return '';
  };

  const buttonLinkUrl = getButtonLink();
  const selectedLocationObj = locations.find(
    (loc) => loc.locationName === selectedLocation
  );
  const locationLinkUrl = selectedLocationObj
    ? getLocationLink(selectedLocationObj)
    : '';

  // Use location link if available, otherwise use button link
  const finalLinkUrl = locationLinkUrl || buttonLinkUrl;

  const handleButtonClick = () => {
    if (locationLinkUrl) {
      window.location.href = locationLinkUrl;
    }
  };

  const renderButton = () => {
    if (locationLinkUrl) {
      return (
        <Button
          variant={'outline'}
          className='border-[#c33b32] text-[#c33b32] hover:bg-[#c33b32] hover:text-white'
          onClick={handleButtonClick}
        >
          {buttonText}
        </Button>
      );
    }

    return (
      <Button
        variant={'outline'}
        className='border-[#c33b32] text-[#c33b32] hover:bg-[#c33b32] hover:text-white'
        asChild={!!buttonLinkUrl}
      >
        {buttonLinkUrl ? (
          <Link href={buttonLinkUrl}>{buttonText}</Link>
        ) : (
          <>{buttonText}</>
        )}
      </Button>
    );
  };

  return (
    <div
      data-name='I / Filter'
      className='flex gap-[10px] items-end justify-center w-full'
    >
      {/* Select Dropdown */}
      <div className='flex flex-col gap-3 items-start min-w-[325px]'>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className='bg-white border border-[#3f4c54] h-[42px] px-[9px] py-1 w-full text-[20px] text-[#3f4c54]'>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location, index) => (
              <SelectItem key={index} value={location.locationName}>
                {location.locationName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Go Button */}
      {renderButton()}
    </div>
  );
};

export default FilterI;

