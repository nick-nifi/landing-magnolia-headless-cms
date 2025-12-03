
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/ui/safe-image";
import { ArrowLeft, ArrowDown, Mail, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

interface ContentB11Props {
  backHref?: string;
  heading?: string;
  title?: string;
  date?: string;
  location?: string;
  shareUrl?: string;
  analyst?: {
    name?: string;
    email?: string;
  };
  subhead?: string;
  highlights?: string[];
  downloadText?: string;
  downloadHref?: string;
  imageChooser?: ImageChooser;
  image?: string;
  imageAlt?: string;
  priceList?: {
    recommendation?: string;
    currentPrice?: string;
    targetPrice?: string;
    percentage?: string;
  };
  disclaimers?: {
    title?: string;
    content?: string;
  };
  className?: string;
  customClass?: string;
}

export default function ContentB11({
  backHref = "#",
  heading,
  title,
  date = "15/10/2025",
  location = "Location",
  shareUrl,
  analyst,
  subhead = "Subhead",
  highlights = [],
  downloadText = "Download the PDF to read the full report.",
  downloadHref = "#",
  imageChooser,
  image,
  imageAlt = "Content image",
  priceList,
  disclaimers,
  className,
  customClass,
}: ContentB11Props) {
  // Use title or heading
  const displayTitle = title || heading || "Heading here";

  // Get image from Magnolia or use image prop
  let imageSrc = image || '';
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

  const handleShare = (platform: string) => {
    if (!shareUrl) return;
    const url = encodeURIComponent(shareUrl);
    const titleText = encodeURIComponent(displayTitle);
    
    const shareUrls: Record<string, string> = {
      email: `mailto:?subject=${titleText}&body=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${titleText}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section
      data-name="content-b11"
      className={cn(
        "bg-white py-16 px-4 lg:px-40",
        className,
        customClass
      )}
    >
      <div className="container mx-auto max-w-[1120px]">
        <div className="flex flex-col gap-8">
          {/* Back Button */}
          <Link
            href={backHref}
            className="flex items-center gap-2.5 text-primary hover:opacity-80 transition-opacity w-fit"
          >
            <ArrowLeft className="size-4" />
            <Typography variant="body-large" weight="regular" className="text-primary">
              Back
            </Typography>
          </Link>

          {/* Main Content Row */}
          <div className="flex flex-col lg:flex-row gap-5 items-start">
            {/* Left Column - Main Content */}
            <div className="flex flex-col gap-8 w-full lg:w-[740px]">
              {/* Info Section */}
              <div className="flex flex-col gap-5">
                {/* Heading */}
                <Typography
                  variant="h3"
                  weight="regular"
                  className="text-primary tracking-[-0.36px]"
                >
                  {displayTitle}
                </Typography>

                {/* Date and Location */}
                <div className="flex items-center gap-[22px]">
                  <Typography variant="body-large" weight="medium" className="text-uobkh-dark-grey whitespace-pre">
                    {date}
                  </Typography>
                  <div className="h-0 w-px border-l border-uobkh-steel-grey" />
                  <Typography variant="body-large" weight="medium" className="text-uobkh-dark-grey whitespace-pre">
                    {location}
                  </Typography>
                </div>

                {/* Share Section */}
                {shareUrl && (
                  <div className="flex items-center gap-5">
                    <Typography variant="body-large" weight="regular" className="text-uobkh-dark-grey">
                      Share
                    </Typography>
                    <button
                      onClick={() => handleShare("email")}
                      className="p-[3px_5px] hover:opacity-80 transition-opacity"
                      aria-label="Share via Email"
                    >
                      <Mail className="size-[19px] text-uobkh-dark-grey" />
                    </button>
                    <button
                      onClick={() => handleShare("facebook")}
                      className="p-[3px_5px] hover:opacity-80 transition-opacity"
                      aria-label="Share on Facebook"
                    >
                      <svg className="size-[19px] text-uobkh-dark-grey" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22,12c0-5.52-4.48-10-10-10S2,6.48,2,12c0,4.84,3.44,8.87,8,9.8V15H8v-3h2V9.5C10,7.57,11.57,6,13.5,6H16v3h-2 c-0.55,0-1,0.45-1,1v2h3v3h-3v6.95C18.05,21.45,22,17.19,22,12z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleShare("twitter")}
                      className="p-[3px_5px] hover:opacity-80 transition-opacity"
                      aria-label="Share on Twitter/X"
                    >
                      <svg className="size-[19px] text-uobkh-dark-grey" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleShare("linkedin")}
                      className="p-[3px_5px] hover:opacity-80 transition-opacity"
                      aria-label="Share on LinkedIn"
                    >
                      <svg className="size-[19px] text-uobkh-dark-grey" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.47,2H3.53A1.45,1.45,0,0,0,2.06,3.43V20.57A1.45,1.45,0,0,0,3.53,22H20.47a1.45,1.45,0,0,0,1.47-1.43V3.43A1.45,1.45,0,0,0,20.47,2ZM8.09,18.74h-3v-9h3ZM6.59,8.48h0a1.56,1.56,0,1,1,0-3.12,1.57,1.57,0,1,1,0,3.12ZM18.91,18.74h-3V13.91c0-1.21-.43-2-1.52-2A1.65,1.65,0,0,0,12.85,13a2,2,0,0,0-.1.73v5h-3s0-8.18,0-9h3V11A3,3,0,0,1,15.46,9.5c2,0,3.45,1.29,3.45,4.06Z" />
                      </svg>
                    </button>
                  </div>
                )}

                {/* Divider */}
                <div className="h-px w-full border-t border-uobkh-steel-grey" />
              </div>

              {/* Analyst Section */}
              {analyst && (
                <div>
                  <Typography
                    variant="body-large"
                    weight="medium"
                    className="text-uobkh-dark-grey mb-2.5"
                  >
                    Analyst
                  </Typography>
                  <div>
                    <Typography variant="body-large" weight="regular" className="text-uobkh-dark-grey">
                      {analyst.name}
                    </Typography>
                    {analyst.email && (
                      <Link
                        href={`mailto:${analyst.email}`}
                        className="text-uobkh-dark-grey underline hover:text-primary transition-colors"
                      >
                        <Typography variant="body-large" weight="light" className="underline">
                          {analyst.email}
                        </Typography>
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* Subhead */}
              <Typography
                variant="h4"
                weight="medium"
                className="text-primary tracking-[-0.28px]"
              >
                {subhead}
              </Typography>

              {/* Highlights Section */}
              {highlights.length > 0 && (
                <div>
                  <Typography
                    variant="body-large"
                    weight="medium"
                    className="text-uobkh-dark-grey mb-2.5"
                  >
                    Highlights
                  </Typography>
                  <ul className="list-disc ml-[calc(1.5*1*20px)]">
                    {highlights.map((highlight, index) => (
                      <li key={index}>
                        <Typography variant="body-large" weight="regular" className="text-uobkh-dark-grey">
                          {highlight}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Download Section */}
              <div className="flex flex-col gap-5">
                <Typography variant="body-large" weight="medium" className="text-uobkh-dark-grey">
                  {downloadText}
                </Typography>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white w-fit h-[42px] px-[10px] py-[6px]"
                  asChild={!!downloadHref}
                >
                  {downloadHref ? (
                    <Link href={downloadHref} className="flex items-center gap-2.5">
                      <span>Download</span>
                      <ArrowDown className="size-4" />
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2.5">
                      <span>Download</span>
                      <ArrowDown className="size-4" />
                    </div>
                  )}
                </Button>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="flex flex-col gap-[29px] w-full lg:w-[360px] flex-shrink-0">
              {/* Image */}
              {imageSrc && (
                <div className="relative w-full aspect-[474/327.561]">
                  <SafeImage
                    src={imageSrc}
                    alt={displayAlt}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              )}

              {/* Price List Box */}
              {priceList && (
                <div style={{ background:'#DBE0E4' }} className="bg-uobkh-steel-grey flex flex-col gap-5 p-5 items-end">
                  <Typography
                    variant="body-large"
                    weight="light"
                    className="text-primary"
                  >
                    <span className="font-medium">BUY</span> (MAINTAINED)
                  </Typography>
                  
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col gap-2.5">
                      <Typography variant="body-large" weight="light" className="text-uobkh-dark-grey">
                        Current price:
                      </Typography>
                      <Typography variant="body-large" weight="light" className="text-uobkh-dark-grey">
                        Target price:
                      </Typography>
                    </div>
                    <div className="flex flex-col gap-2.5 text-right">
                      <Typography variant="body-large" weight="light" className="text-uobkh-dark-grey">
                        {priceList.currentPrice || "HK$126.40"}
                      </Typography>
                      <Typography variant="body-large" weight="light" className="text-uobkh-dark-grey">
                        {priceList.targetPrice || "HK$167.00"}
                      </Typography>
                    </div>
                  </div>

                  <div className="h-px w-full border-t border-white" />

                  <Typography variant="body-large" weight="light" className="text-uobkh-dark-grey">
                    {priceList.percentage || "32.1%"}
                  </Typography>
                </div>
              )}
            </div>
          </div>

          {/* Disclaimers Accordion - Full Width */}
          {disclaimers && (
            <Accordion type="single" collapsible className="w-full min-w-[335px]">
              <AccordionItem value="disclaimers" className="border-b border-uobkh-steel-grey">
                <AccordionTrigger className="px-[10px] py-[11px] hover:no-underline w-full bg-white">
                  <Typography
                    variant="h4"
                    weight="medium"
                    className="text-uobkh-dark-grey tracking-[-0.28px] text-left"
                  >
                    {disclaimers.title || "Disclaimers and Important Notices"}
                  </Typography>
                </AccordionTrigger>
                {disclaimers.content && (
                  <AccordionContent className="px-[10px]">
                    <Typography variant="body-large" weight="regular" className="text-uobkh-dark-grey">
                      {disclaimers.content}
                    </Typography>
                  </AccordionContent>
                )}
              </AccordionItem>
            </Accordion>
          )}
        </div>
      </div>
    </section>
  );
}
