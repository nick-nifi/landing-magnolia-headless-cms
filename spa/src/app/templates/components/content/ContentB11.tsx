import { decodeIfEscaped } from '@/app/services/content-service';
import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { environment } from '@/environments/environment';
import get from 'lodash/get';
import has from 'lodash/has';
import Link from 'next/link';
import { SafeImage } from '@/components/ui/safe-image';
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface ImageChooser {
  field?: 'image' | 'externalImage';
  image?: {
    '@link': string;
  };
  imageAlt?: string;
  externalImage?: string;
  externalImageAlt?: string;
}

interface BackButton {
  field?: 'noBackButton' | 'withBackButton';
  backButtonText?: string;
  backButtonLink?: {
    field?: 'internalPageLink' | 'externalPageLink';
    internalLink?: string;
    externalLink?: string;
  };
}

interface ShareSection {
  field?: 'noShare' | 'withShare';
  emailLink?: string;
  facebookLink?: string;
  xLink?: string;
  linkedinLink?: string;
}

interface AnalystSection {
  field?: 'noAnalyst' | 'withAnalyst';
  analystName?: string;
  analystEmail?: string;
}

interface DownloadButton {
  field?: 'noDownload' | 'withDownload';
  downloadButtonText?: string;
  downloadLink?: {
    field?: 'fileLink' | 'internalPageLink' | 'externalPageLink';
    file?: {
      '@link': string;
    };
    internalLink?: string;
    externalLink?: string;
  };
}

interface PriceList {
  field?: 'noPriceList' | 'withPriceList';
  buyStatus?: string;
  currentPrice?: string;
  targetPrice?: string;
  percentage?: string;
}

interface IContentB11Props {
  backButton?: BackButton;
  title: string;
  date: string;
  location: string;
  shareSection?: ShareSection;
  analystSection?: AnalystSection;
  subhead?: string;
  highlights?: string;
  downloadText?: string;
  downloadButton?: DownloadButton;
  rightSideImage?: ImageChooser;
  priceList?: PriceList;
}

const ContentB11: React.FC<IContentB11Props> = ({
  backButton,
  title,
  date,
  location,
  shareSection,
  analystSection,
  subhead,
  highlights,
  downloadText,
  downloadButton,
  rightSideImage,
  priceList,
}) => {
  // Get image source
  const getImageSrc = (imageChooser?: ImageChooser): string => {
    if (!imageChooser) return '';
    if (has(imageChooser, 'externalImage')) {
      return get(imageChooser, 'externalImage') || '';
    }
    if (has(imageChooser, "image['@link']")) {
      return `${environment.damRawBase}${get(imageChooser, "image['@link']")}`;
    }
    return '';
  };

  const getImageAlt = (imageChooser?: ImageChooser): string => {
    if (!imageChooser) return '';
    return (
      get(imageChooser, 'externalImageAlt') ||
      get(imageChooser, 'imageAlt') ||
      ''
    );
  };

  const rightImageSrc = getImageSrc(rightSideImage);
  const rightImageAlt = getImageAlt(rightSideImage);

  // Get back button link
  const getBackButtonLink = (): string => {
    if (!backButton || backButton.field !== 'withBackButton' || !backButton.backButtonLink) {
      return '';
    }
    if (backButton.backButtonLink.field === 'externalPageLink') {
      return backButton.backButtonLink.externalLink || '';
    }
    if (backButton.backButtonLink.field === 'internalPageLink') {
      return backButton.backButtonLink.internalLink || '';
    }
    return '';
  };

  // Get download link
  const getDownloadLink = (): string => {
    if (!downloadButton || downloadButton.field !== 'withDownload' || !downloadButton.downloadLink) {
      return '';
    }
    if (downloadButton.downloadLink.field === 'fileLink' && downloadButton.downloadLink.file) {
      return `${environment.damRawBase}${get(downloadButton.downloadLink, "file['@link']")}`;
    }
    if (downloadButton.downloadLink.field === 'internalPageLink') {
      return downloadButton.downloadLink.internalLink || '';
    }
    if (downloadButton.downloadLink.field === 'externalPageLink') {
      return downloadButton.downloadLink.externalLink || '';
    }
    return '';
  };

  const backButtonLink = getBackButtonLink();
  const backButtonText = backButton?.field === 'withBackButton' ? backButton.backButtonText : '';
  const downloadLink = getDownloadLink();
  const downloadButtonText = downloadButton?.field === 'withDownload' ? downloadButton.downloadButtonText : '';
  const isDownloadExternal = downloadButton?.downloadLink?.field === 'fileLink' || downloadButton?.downloadLink?.field === 'externalPageLink';

  const renderBackButton = () => {
    if (!backButtonText) return null;

    const buttonContent = (
      <div className='flex gap-[10px] items-center justify-center pl-0 pr-[10px] py-[6px]'>
        <div className='flex h-[10.307px] items-center justify-center w-[14.645px]'>
          <div className='flex-none rotate-[270deg]'>
            <ArrowLeft className='h-[14.645px] w-[10.307px] text-[#c33b32]' />
          </div>
        </div>
        <Typography
          variant='body-large'
          weight='regular'
          className='text-[#c33b32] text-[20px] leading-[1.5] whitespace-pre'
        >
          {backButtonText}
        </Typography>
      </div>
    );

    if (backButtonLink) {
      return (
        <Link href={backButtonLink} className='inline-block'>
          {buttonContent}
        </Link>
      );
    }

    return <div>{buttonContent}</div>;
  };

  const renderShareIcons = () => {
    if (!shareSection || shareSection.field !== 'withShare') return null;

    return (
      <div className='flex gap-[20px] items-center'>
        <Typography
          variant='body-large'
          weight='regular'
          className='text-[#3f4c54] text-[20px] leading-[1.5] whitespace-pre'
        >
          Share
        </Typography>
        {shareSection.emailLink && (
          <a
            href={shareSection.emailLink}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center justify-center px-[3px] py-[5px] size-[19px]'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='19'
              height='19'
              viewBox='0 0 17 13'
              fill='none'
              className='text-[#3f4c54]'
            >
              <path
                d='M1 1L8 7L15 1'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </a>
        )}
        {shareSection.facebookLink && (
          <a
            href={shareSection.facebookLink}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center justify-center px-[3px] py-[5px] size-[19px]'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='19'
              height='19'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='text-[#3f4c54]'
            >
              <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
            </svg>
          </a>
        )}
        {shareSection.xLink && (
          <a
            href={shareSection.xLink}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center justify-center px-[3px] py-[5px] size-[19px]'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='19'
              height='19'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='text-[#3f4c54]'
            >
              <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
            </svg>
          </a>
        )}
        {shareSection.linkedinLink && (
          <a
            href={shareSection.linkedinLink}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center justify-center px-[3px] py-[5px] size-[19px]'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='19'
              height='19'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='text-[#3f4c54]'
            >
              <path d='M20.47 2H3.53A1.45 1.45 0 0 0 2.06 3.43V20.57A1.45 1.45 0 0 0 3.53 22H20.47a1.45 1.45 0 0 0 1.47-1.43V3.43A1.45 1.45 0 0 0 20.47 2ZM8.09 18.74h-3v-9h3ZM6.59 8.48h0a1.56 1.56 0 1 1 0-3.12 1.57 1.57 0 1 1 0 3.12ZM18.91 18.74h-3V13.91c0-1.21-.43-2-1.52-2A1.65 1.65 0 0 0 12.85 13a2 2 0 0 0-.1.73v5h-3s0-8.18 0-9h3V11A3 3 0 0 1 15.46 9.5c2 0 3.45 1.29 3.45 4.06Z' />
            </svg>
          </a>
        )}
      </div>
    );
  };

  const renderDownloadButton = () => {
    if (!downloadButtonText) return null;

    const buttonContent = (
      <Button
        variant='outline'
        className='border border-[#c33b32] text-[#c33b32] hover:bg-[#c33b32] hover:text-white h-[42px] px-[10px] py-[6px]'
      >
        {downloadButtonText}
      </Button>
    );

    if (downloadLink) {
      return (
        <Link
          href={downloadLink}
          target={isDownloadExternal ? '_blank' : '_self'}
          rel={isDownloadExternal ? 'noopener noreferrer' : ''}
        >
          {buttonContent}
        </Link>
      );
    }

    return buttonContent;
  };

  return (
    <div
      data-name='B11 / Content'
      className='flex flex-col gap-8 items-start max-w-[1120px] w-full'
    >
      {/* Back Button */}
      {renderBackButton()}

      <div className='flex gap-5 items-start w-full'>
        {/* Left Column - Main Content */}
        <div className='flex flex-col gap-8 items-start w-[740px]'>
          {/* Info Section */}
          <div className='flex flex-col gap-5 items-start w-full'>
            {/* Title */}
            <Typography
              variant='h3'
              weight='regular'
              className='text-[#c33b32] text-[36px] tracking-[-0.36px] leading-[1.3]'
            >
              {title}
            </Typography>

            {/* Date and Location */}
            <div className='flex gap-[22px] items-center'>
              <Typography
                variant='body-large'
                weight='medium'
                className='text-[#3f4c54] text-[20px] leading-[1.5] whitespace-pre'
              >
                {date}
              </Typography>
              <div className='h-[23px] w-0 border-l border-[#dbe0e4]' />
              <Typography
                variant='body-large'
                weight='medium'
                className='text-[#3f4c54] text-[20px] leading-[1.5] whitespace-pre'
              >
                {location}
              </Typography>
            </div>

            {/* Share Section */}
            {renderShareIcons()}

            {/* Divider */}
            <div className='h-0 w-full border-t border-[#dbe0e4]' />
          </div>

          {/* Analyst Section */}
          {analystSection?.field === 'withAnalyst' && (
            <div className='flex flex-col gap-[10px] items-start'>
              <Typography
                variant='body-large'
                weight='medium'
                className='text-[#3f4c54] text-[20px] mb-[10px]'
              >
                Analyst
              </Typography>
              <Typography
                variant='body-large'
                weight='light'
                className='text-[#3f4c54] text-[20px] leading-[1.5]'
              >
                {analystSection.analystName}
                <br />
                <a
                  href={`mailto:${analystSection.analystEmail}`}
                  className='underline'
                >
                  {analystSection.analystEmail}
                </a>
              </Typography>
            </div>
          )}

          {/* Subhead */}
          {subhead && (
            <Typography
              variant='h4'
              weight='medium'
              className='text-[#c33b32] text-[28px] tracking-[-0.28px] leading-[1.2]'
            >
              {subhead}
            </Typography>
          )}

          {/* Highlights */}
          {highlights && (
            <div className='flex flex-col gap-[10px] items-start'>
              <Typography
                variant='body-large'
                weight='medium'
                className='text-[#3f4c54] text-[20px] mb-[10px]'
              >
                Highlights
              </Typography>
              <Typography
                variant='body-large'
                weight='light'
                className='text-[#3f4c54] text-[20px] leading-[1.5]'
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: decodeIfEscaped(highlights),
                  }}
                />
              </Typography>
            </div>
          )}

          {/* Download Text */}
          {downloadText && (
            <Typography
              variant='body-large'
              weight='medium'
              className='text-[#3f4c54] text-[20px] leading-[1.5]'
            >
              {downloadText}
            </Typography>
          )}

          {/* Download Button */}
          {renderDownloadButton()}
        </div>

        {/* Right Column - Image and Price List */}
        <div className='flex flex-col gap-[29px] items-start w-[360px]'>
          {/* Image */}
          {rightImageSrc && (
            <div className='aspect-[474/327.561] relative w-full'>
              <SafeImage
                src={rightImageSrc}
                alt={rightImageAlt}
                fill
                className='absolute max-w-none object-center object-cover pointer-events-none size-full'
              />
            </div>
          )}

          {/* Price List */}
          {priceList?.field === 'withPriceList' && (
            <div className='bg-[#dbe0e4] flex flex-col gap-5 items-end p-5 w-full'>
              <Typography
                variant='body-large'
                weight='light'
                className='text-[#c33b32] text-[20px] leading-[1.5]'
              >
                <span className='font-medium'>{priceList.buyStatus?.split(' ')[0]}</span>
                {priceList.buyStatus?.includes('(') && ` (${priceList.buyStatus?.match(/\(([^)]+)\)/)?.[1]})`}
              </Typography>
              <div className='flex items-center justify-between w-full'>
                <div className='flex flex-col gap-[10px]'>
                  <Typography
                    variant='body-large'
                    weight='light'
                    className='text-[#3f4c54] text-[20px] leading-[1.5]'
                  >
                    Current price:
                  </Typography>
                  <Typography
                    variant='body-large'
                    weight='light'
                    className='text-[#3f4c54] text-[20px] leading-[1.5]'
                  >
                    Target price:
                  </Typography>
                </div>
                <div className='flex flex-col gap-[10px] text-right'>
                  <Typography
                    variant='body-large'
                    weight='light'
                    className='text-[#3f4c54] text-[20px] leading-[1.5]'
                  >
                    {priceList.currentPrice}
                  </Typography>
                  <Typography
                    variant='body-large'
                    weight='light'
                    className='text-[#3f4c54] text-[20px] leading-[1.5]'
                  >
                    {priceList.targetPrice}
                  </Typography>
                </div>
              </div>
              <div className='h-0 w-full border-t border-white' />
              <Typography
                variant='body-large'
                weight='light'
                className='text-[#3f4c54] text-[20px] leading-[1.5] whitespace-pre'
              >
                {priceList.percentage}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentB11;

