import C1Card from "./c1-card";
import { environment } from "@/environments/environment";
import get from "lodash/get";
import has from "lodash/has";

interface ImageChooser {
  field?: 'image' | 'externalImage';
  image?: {
    '@link': string;
  };
  imageAlt?: string;
  externalImage?: string;
  externalImageAlt?: string;
}

interface FlexibleC1Props {
  title?: string;
  description?: string;
  imageChooser?: ImageChooser;
  link?: string;
  marginTop?: number | string;
}

export default function FlexibleC1({
  title = "",
  description = "",
  imageChooser,
  link = "#",
  marginTop = 0,
}: FlexibleC1Props) {
  const marginTopValue = typeof marginTop === 'string' ? parseInt(marginTop, 10) : marginTop;
  
  let thumb = '/assets/placeholder-img.png';
  if (imageChooser) {
    if (imageChooser.field === 'image' && imageChooser.image) {
      thumb = `${environment.damRawBase}${imageChooser.image['@link']}`;
    } else if (imageChooser.field === 'externalImage' && imageChooser.externalImage) {
      thumb = imageChooser.externalImage;
    }
  }

  return (
    <div className="h-full" style={{ marginTop: marginTopValue ? `${marginTopValue}px` : undefined }}>
      <C1Card
        title={title}
        description={description}
        thumb={thumb}
        href={link}
      />
    </div>
  );
}
