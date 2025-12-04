
import { SafeImage } from "@/components/ui/safe-image";
import { cn } from "@/lib/utils";
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

interface ContentB10Props {
  imageChooser?: ImageChooser;
  image?: string;
  imageAlt?: string;
  className?: string;
  customClass?: string;
}

export default function ContentB10({
  imageChooser,
  image,
  imageAlt = "Content image",
  className,
  customClass,
}: ContentB10Props) {
  // Get image from Magnolia or use image prop
  let imageSrc = image || "/assets/placeholder-img.png";
  let displayAlt = imageAlt;

  if (imageChooser) {
    if (imageChooser.field === 'image' && imageChooser.image) {
      imageSrc = `${environment.damRawBase}${imageChooser.image['@link']}`;
      displayAlt = imageChooser.imageAlt || imageAlt;
    } else if (imageChooser.field === 'externalImage' && imageChooser.externalImage) {
      imageSrc = imageChooser.externalImage;
      displayAlt = imageChooser.externalImageAlt || imageAlt;
    }
  }

  return (
    <section
      data-name="content-b10"
      style={{ backgroundColor: "#DBE0E4" }}
      className={cn("bg-uobkh-steel-grey py-16 px-4 lg:px-40", className, customClass)}
    >
      <div className="container mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-20 items-center justify-center w-full">
          <div className="relative w-full max-w-[738px] flex justify-center items-center">
            <div className="relative w-full aspect-[738/772]">
              <SafeImage
                src={imageSrc}
                alt={displayAlt}
                fill
                className="object-contain object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
