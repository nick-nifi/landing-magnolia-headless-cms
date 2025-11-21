"use client"
import React, { useState, useEffect, useRef } from 'react';
import { environment } from '../../../environments/environment';

interface ImageChooser {
  field?: 'image' | 'externalImage';
  image?: {
    '@link': string;
  };
  imageAlt?: string;
  externalImage?: string;
  externalImageAlt?: string;
}

interface CarouselItem {
  '@id'?: string;
  title?: string;
  description?: string;
  imageChooser?: ImageChooser;
}

interface CarouselList {
  '@nodes'?: string[];
  [key: string]: CarouselItem | string[] | undefined;
}

interface AutoplayConfig {
  field?: 'enableAutoPlay' | 'disableAutoPlay';
  time?: number;
  pauseButton?: boolean;
}

interface CarouselImage {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}

interface IHomeCarouselProps {
  autoplay: AutoplayConfig;
  carouselList: CarouselList;
}

const HomeCarousel: React.FC<IHomeCarouselProps> = ({ autoplay, carouselList }) => {
  const imageKeys =
    carouselList['@nodes'] || Object.keys(carouselList).filter(key => !key.startsWith('@'));

  const images: CarouselImage[] = imageKeys
    .map(key => {
      const node = carouselList[key] as CarouselItem;
      if (node && node.imageChooser) {
        const chooser = node.imageChooser;
        let imageSrc = '';
        let imageAlt = node.title || '';
        
        if (chooser.field === 'image' && chooser.image) {
          imageSrc = `${environment.damRawBase}${chooser.image['@link']}`;
          imageAlt = chooser.imageAlt || node.title || '';
        } else if (chooser.field === 'externalImage' && chooser.externalImage) {
          imageSrc = chooser.externalImage;
          imageAlt = chooser.externalImageAlt || node.title || '';
        }
        const title = node.title || '';
        const description = node.description || '';
        return { imageSrc, imageAlt, title, description };
      }
      return null;
    })
    .filter((item): item is CarouselImage => item !== null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const isAutoplayEnabled = autoplay.field === 'enableAutoPlay';
    const autoplayTime = isAutoplayEnabled ? autoplay.time || 3000 : 3000;
    
    if (isAutoplayEnabled && images.length > 1 && !isPaused) {
      timerRef.current = setTimeout(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
      }, autoplayTime);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [autoplay, images.length, isPaused, currentIndex]);

  const handlePauseToggle = () => {
    setIsPaused(prev => !prev);
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full mx-auto">
      {images.length > 0 ? (
        <>
          <div className="relative w-full h-64 overflow-hidden rounded-md bg-gray-100">
            <img
              key={images[currentIndex].imageSrc}
              src={images[currentIndex].imageSrc}
              alt={images[currentIndex].imageAlt}
              className="w-full h-full object-cover object-center transition-opacity duration-500 ease-in-out"
            />
            {(images[currentIndex].title || images[currentIndex].description) && (
              <div className="absolute bottom-0 left-0 p-2">
                <div className="inline-block bg-black bg-opacity-50 text-white text-sm p-1">
                  {images[currentIndex].title && (
                    <div className="font-bold">{images[currentIndex].title}</div>
                  )}
                  {images[currentIndex].description && (
                    <div>{images[currentIndex].description}</div>
                  )}
                </div>
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex justify-center items-center space-x-3 mt-3 mb-3">
              <button 
                onClick={handlePrev} 
                aria-label="Previous image" 
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                &lt;
              </button>
              {autoplay.field === 'enableAutoPlay' && autoplay.pauseButton && (
                <button
                  onClick={handlePauseToggle}
                  aria-label="Toggle autoplay"
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                >
                  {isPaused ? 'Play' : 'Pause'}
                </button>
              )}
              <button 
                onClick={handleNext} 
                aria-label="Next image" 
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                &gt;
              </button>
            </div>
          )}
        </>
      ) : (
        <p>No images available.</p>
      )}
    </div>
  );
};

export default HomeCarousel;
