'use client';
import { cn } from '@/lib/utils';
import Image, { ImageProps } from 'next/image';

interface ImageHoverProps extends ImageProps {
  imageContainerClass?: string;
}
export default function ImageHover({
  imageContainerClass,
  alt = '',
  className,
  src,
  ...restProps
}: ImageHoverProps) {
  return (
    <div
      className={cn(
        'group relative block overflow-hidden z-50',
        imageContainerClass
      )}
    >
      {/* Image */}
      <Image
        src={src}
        alt={alt}
        className={cn(
          'object-cover transition-transform duration-500 group-hover:scale-105 z-10',
          className
        )}
        {...restProps}
      />

      {/* Overlay */}
      <div className='absolute inset-0 flex items-center justify-center bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        {/* Animated Arrow */}
        {/* <ArrowRight className="text-white size-10 opacity-0 translate-x-[-40px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" /> */}
        <svg
          width='58'
          height='42'
          viewBox='0 0 58 42'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='text-white size-10 opacity-0 translate-x-[-40px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out'
        >
          <path
            d='M0.5 20.5581L56.8954 20.5581M37.4763 40.6162L57.5 20.5581L37.4763 0.499999'
            stroke='white'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
    </div>
  );
}
