
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ListItem {
  itemText: string;
  '@name'?: string;
  '@path'?: string;
  '@id'?: string;
  '@nodeType'?: string;
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

interface ContentB3Props {
  title?: string;
  description?: string;
  listItems?: ListItem[] | Record<string, ListItem>;
  items?: string[];
  ctaChooser?: CtaChooser;
  button?: {
    label?: string;
    href?: string;
  };
  customClass?: string;
}

// Helper function to convert Magnolia object to array
const getListItemsArray = (items: ListItem[] | Record<string, ListItem> | undefined): string[] => {
  if (!items) return [];
  if (Array.isArray(items)) {
    return items.filter(item => item && item.itemText).map(item => item.itemText);
  }
  
  // Convert object to array, filtering out metadata keys
  return Object.entries(items)
    .filter(([key, value]) => {
      if (key.startsWith('@')) return false;
      if (!value || typeof value !== 'object') return false;
      if (!value.itemText) return false;
      return true;
    })
    .map(([, value]) => (value as ListItem).itemText);
};

export default function ContentB3({
  button,
  description,
  listItems,
  items = [],
  ctaChooser,
  title = "",
  customClass,
}: ContentB3Props) {
  // Use listItems from Magnolia or fallback to items prop
  const itemsList = listItems ? getListItemsArray(listItems) : items;

  // Get button from Magnolia CTA or fallback to button prop
  let buttonLabel = button?.label;
  let buttonHref = button?.href || '#';

  if (ctaChooser && ctaChooser.field === 'withCta') {
    buttonLabel = ctaChooser.ctaText || buttonLabel;
    if (ctaChooser.ctaLink) {
      if (ctaChooser.ctaLink.field === 'externalPageLink') {
        buttonHref = ctaChooser.ctaLink.externalLink || buttonHref;
      } else if (ctaChooser.ctaLink.field === 'internalPageLink') {
        buttonHref = ctaChooser.ctaLink.internalLink || buttonHref;
      }
    }
  }

  return (
    <section data-name="content-b3" className={cn("relative py-8 lg:py-20", customClass)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-(--page-padding--padding-global,160px)">
        <Card className="border-0 shadow-none bg-transparent">
          <CardContent className="p-0">
            <div className="flex flex-col gap-8 max-w-7xl mx-auto">
              {/* Main Content Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16">
                {/* Left Column - Title & Description */}
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-6">
                    {title && (
                      <Typography
                        variant="h2"
                        weight="light"
                        className="text-center md:text-left"
                      >
                        {title}
                      </Typography>
                    )}

                    {description && (
                      <Typography
                        variant="body-large"
                        weight="light"
                        dangerouslySetInnerHTML={{ __html: description }}
                      />
                    )}
                  </div>
                </div>

                {/* Right Column - List Items */}
                {itemsList.length > 0 && (
                  <div className="flex flex-col gap-4">
                    {itemsList.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="text-primary text-lg md:text-xl font-medium leading-tight pt-0.5">
                          •
                        </span>
                        <Typography
                          variant="body-large"
                          weight="medium"
                          className="leading-normal"
                        >
                          {item}
                        </Typography>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Button - Aligned to right */}
              {buttonLabel && (
                <div className="flex justify-center md:justify-end">
                  <Button variant="outline" asChild className="w-fit">
                    <Link
                      href={buttonHref}
                      className="flex items-center gap-2"
                    >
                      {buttonLabel} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
