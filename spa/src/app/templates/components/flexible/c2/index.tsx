import C2Card from "./c2-card";
import { environment } from "@/environments/environment";

interface ImageChooser {
  field?: 'image' | 'externalImage';
  image?: {
    '@link': string;
  };
  imageAlt?: string;
  externalImage?: string;
  externalImageAlt?: string;
}

interface CtaChooser {
  field?: 'noCta' | 'withCta';
  ctaText?: string;
  ctaLink?: {
    field?: 'internalPageLink' | 'externalPageLink';
    internalLink?: string;
    externalLink?: string;
  };
}

interface FlexibleC2Props {
  title?: string;
  description?: string;
  imageChooser?: ImageChooser;
  tag?: string;
  ctaChooser?: CtaChooser;
  marginTop?: number | string;
}

export default function FlexibleC2({
  title = "",
  description = "",
  imageChooser,
  tag = "",
  ctaChooser,
  marginTop = 0,
}: FlexibleC2Props) {
  const marginTopValue = typeof marginTop === 'string' ? parseInt(marginTop, 10) : marginTop;
  
  let thumb = '';
  if (imageChooser) {
    if (imageChooser.field === 'image' && imageChooser.image) {
      thumb = `${environment.damRawBase}${imageChooser.image['@link']}`;
    } else if (imageChooser.field === 'externalImage' && imageChooser.externalImage) {
      thumb = imageChooser.externalImage;
    }
  }

  let readmoreUrl = '';
  let ctaText = '';
  if (ctaChooser && ctaChooser.field === 'withCta') {
    ctaText = ctaChooser.ctaText || '';
    if (ctaChooser.ctaLink) {
      if (ctaChooser.ctaLink.field === 'externalPageLink') {
        readmoreUrl = ctaChooser.ctaLink.externalLink || '';
      } else if (ctaChooser.ctaLink.field === 'internalPageLink') {
        readmoreUrl = ctaChooser.ctaLink.internalLink || '';
      }
    }
  }

  return (
    <div 
      className="h-full flex flex-col" 
      style={{ 
        marginTop: marginTopValue ? `${marginTopValue}px` : undefined
      }}
    >
      <C2Card
        title={title}
        description={description}
        thumb={thumb}
        tag={tag}
        readmoreUrl={readmoreUrl}
        ctaText={ctaText}
      />
    </div>
  );
}
