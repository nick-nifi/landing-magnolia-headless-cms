import C3Card from "./c3-card";
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

interface FlexibleC3Props {
  title?: string;
  description?: string;
  imageChooser?: ImageChooser;
  ctaChooser?: CtaChooser;
  marginTop?: number | string;
}

export default function FlexibleC3({
  title = "",
  description = "",
  imageChooser,
  ctaChooser,
  marginTop = 0,
}: FlexibleC3Props) {
  const marginTopValue = typeof marginTop === 'string' ? parseInt(marginTop, 10) : marginTop;
  
  let thumb = '/assets/placeholder-img.png';
  if (imageChooser) {
    if (imageChooser.field === 'image' && imageChooser.image) {
      thumb = `${environment.damRawBase}${imageChooser.image['@link']}`;
    } else if (imageChooser.field === 'externalImage' && imageChooser.externalImage) {
      thumb = imageChooser.externalImage;
    }
  }

  let href = '#';
  if (ctaChooser && ctaChooser.field === 'withCta' && ctaChooser.ctaLink) {
    if (ctaChooser.ctaLink.field === 'externalPageLink') {
      href = ctaChooser.ctaLink.externalLink || '#';
    } else if (ctaChooser.ctaLink.field === 'internalPageLink') {
      href = ctaChooser.ctaLink.internalLink || '#';
    }
  }

  return (
    <div className="h-full" style={{ marginTop: marginTopValue ? `${marginTopValue}px` : undefined }}>
      <C3Card
        title={title}
        description={description}
        thumb={thumb}
        href={href}
      />
    </div>
  );
}

